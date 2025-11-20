import { useEffect, useRef } from 'react'

const LineChart = ({ months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct'], values = [120, 180, 260, 310, 470, 520, 650, 720, 880, 1000] }) => {
  const canvasRef = useRef(null)
  const tooltipRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const pad = { left: 48, right: 16, top: 20, bottom: 30 }
    const plotW = W - pad.left - pad.right
    const plotH = H - pad.top - pad.bottom
    const maxV = Math.ceil(Math.max(...values) / 100) * 100

    const getCSSVar = (varName, fallback) => {
      if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(varName)?.trim() || fallback
      }
      return fallback
    }

    const makeTooltip = () => {
      if (!tooltipRef.current) {
        const tip = document.createElement('div')
        tip.style.position = 'absolute'
        tip.style.padding = '8px 10px'
        tip.style.borderRadius = '10px'
        tip.style.background = '#fff'
        tip.style.boxShadow = '0 8px 30px rgba(11,19,32,0.12)'
        tip.style.fontSize = '13px'
        tip.style.pointerEvents = 'none'
        tip.style.opacity = '0'
        tip.style.transform = 'scale(0.96)'
        tip.style.transition = 'opacity 180ms cubic-bezier(.2,.9,.2,1), transform 180ms cubic-bezier(.2,.9,.2,1)'
        tip.style.color = getCSSVar('--dgmp-gray-900', '#0b1320')
        tip.style.zIndex = '1000'
        containerRef.current.style.position = 'relative'
        containerRef.current.appendChild(tip)
        tooltipRef.current = tip
      }
      return tooltipRef.current
    }

    let animationProgress = 0
    let animationId = null

    const draw = (progress = 1) => {
      ctx.clearRect(0, 0, W, H)

      // Grid
      ctx.strokeStyle = '#e6edf3'
      ctx.lineWidth = 1
      const gridLines = 4
      for (let i = 0; i <= gridLines; i++) {
        const y = pad.top + i * (plotH / gridLines)
        ctx.beginPath()
        ctx.moveTo(pad.left, y)
        ctx.lineTo(pad.left + plotW, y)
        ctx.stroke()
      }

      // Y axis ticks
      ctx.fillStyle = '#6b7280'
      ctx.font = '12px Inter'
      ctx.textAlign = 'right'
      for (let i = 0; i <= gridLines; i++) {
        const val = Math.round(maxV - i * (maxV / gridLines))
        const y = pad.top + i * (plotH / gridLines)
        ctx.fillText(val, pad.left - 12, y + 4)
      }

      // X labels
      ctx.textAlign = 'center'
      ctx.fillStyle = '#6b7280'
      ctx.font = '12px Inter'
      values.forEach((v, i) => {
        const x = pad.left + (i * (plotW / (values.length - 1)))
        ctx.fillText(months[i], x, H - 12)
      })

      // Line
      const getXY = (i) => {
        const x = pad.left + (i * (plotW / (values.length - 1)))
        const y = pad.top + (1 - values[i] / maxV) * plotH
        return { x, y }
      }

      // Animated line drawing
      const visiblePoints = Math.ceil(values.length * progress)
      if (visiblePoints > 0) {
        ctx.beginPath()
        for (let i = 0; i < visiblePoints; i++) {
          const p = getXY(i)
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        // If partial point, draw to interpolated position
        if (visiblePoints < values.length) {
          const currentIdx = visiblePoints - 1
          const nextIdx = visiblePoints
          const currentP = getXY(currentIdx)
          const nextP = getXY(nextIdx)
          const partialProgress = (progress * values.length) % 1
          const interpX = currentP.x + (nextP.x - currentP.x) * partialProgress
          const interpY = currentP.y + (nextP.y - currentP.y) * partialProgress
          ctx.lineTo(interpX, interpY)
        }
        ctx.strokeStyle = '#111827'
        ctx.lineWidth = 2.5
        ctx.stroke()
      }

      // Points + labels (appear progressively)
      values.forEach((v, i) => {
        if (i < visiblePoints) {
          const p = getXY(i)
          const pointProgress = i < visiblePoints - 1 ? 1 : (progress * values.length) % 1
          ctx.globalAlpha = pointProgress
          ctx.beginPath()
          ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI)
          ctx.fillStyle = getCSSVar('--dgmp-orange', '#ff8c00')
          ctx.fill()
          ctx.fillStyle = getCSSVar('--dgmp-gray-900', '#0b1320')
          ctx.font = '11px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(v, p.x, p.y - 10)
          ctx.globalAlpha = 1
        }
      })
    }

    // Animation loop
    const animate = () => {
      animationProgress += 0.03
      if (animationProgress >= 1) {
        animationProgress = 1
        draw(1)
        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
      } else {
        draw(animationProgress)
        animationId = requestAnimationFrame(animate)
      }
    }

    // Start animation
    animationProgress = 0
    animate()

    const handleMouseMove = (e) => {
      const r = canvas.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top

      const getXY = (i) => {
        const x = pad.left + (i * (plotW / (values.length - 1)))
        const y = pad.top + (1 - values[i] / maxV) * plotH
        return { x, y }
      }

      let nearest = null
      let dist = Infinity
      values.forEach((v, i) => {
        const p = getXY(i)
        const d = Math.hypot(p.x - mx, p.y - my)
        if (d < dist) {
          dist = d
          nearest = { i, p, v }
        }
      })

      const tip = makeTooltip()
      if (dist < 18 && nearest) {
        tip.innerHTML = `<strong>${months[nearest.i]}</strong><div style="font-size:13px;margin-top:4px">${nearest.v} formés</div>`
        tip.style.left = nearest.p.x + 12 + 'px'
        tip.style.top = nearest.p.y - 12 + 'px'
        requestAnimationFrame(() => {
          tip.style.opacity = '1'
          tip.style.transform = 'scale(1)'
        })
      } else {
        tip.style.opacity = '0'
        tip.style.transform = 'scale(0.96)'
      }
    }

    const handleMouseLeave = () => {
      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = '0'
        tooltipRef.current.style.transform = 'scale(0.96)'
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (tooltipRef.current && tooltipRef.current.parentNode) {
        tooltipRef.current.parentNode.removeChild(tooltipRef.current)
      }
    }
  }, [months, values])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        animation: 'fadeIn 0.6s ease-out 0.1s both',
      }}
    >
      <canvas ref={canvasRef} id="lineProgress" height={220} width={360} style={{ display: 'block' }} />
      <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--dgmp-gray-400)' }}>
        Évolution des formations par mois (Jan → Oct)
      </div>
    </div>
  )
}

export default LineChart
