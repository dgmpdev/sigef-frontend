import { useEffect, useRef } from 'react'

const ComboChart = ({ labels = ['SIGOMAP', 'Procédures'], objectifs = [1000, 1000], realises = [1336, 1071] }) => {
  const canvasRef = useRef(null)
  const tooltipRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const pad = { left: 56, right: 20, top: 20, bottom: 30 }
    const plotW = W - pad.left - pad.right
    const plotH = H - pad.top - pad.bottom
    const maxV = 1500

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
      const gridLines = 5
      for (let i = 0; i <= gridLines; i++) {
        const y = pad.top + i * (plotH / gridLines)
        ctx.beginPath()
        ctx.moveTo(pad.left, y)
        ctx.lineTo(pad.left + plotW, y)
        ctx.stroke()
        const val = Math.round(maxV - i * (maxV / gridLines))
        ctx.fillStyle = '#6b7280'
        ctx.font = '12px Inter'
        ctx.textAlign = 'right'
        ctx.fillText(val, pad.left - 12, y + 4)
      }

      // Bars
      const groupW = plotW / labels.length
      const barW = 28

      // Animate bars growing from bottom
      const barProgress = Math.min(progress * 1.5, 1) // Bars finish at 66% of animation

      labels.forEach((lab, i) => {
        const gx = pad.left + i * groupW + groupW / 4
        const hObj = (objectifs[i] / maxV) * plotH * barProgress
        const hReal = (realises[i] / maxV) * plotH * barProgress

        // Objectif bar
        ctx.fillStyle = '#e5e7eb'
        ctx.fillRect(gx, pad.top + (plotH - hObj), barW, hObj)

        // Réalisé bar
        ctx.fillStyle = getCSSVar('--dgmp-orange', '#ff8c00')
        ctx.fillRect(gx + barW + 8, pad.top + (plotH - hReal), barW, hReal)

        // Values above bars (appear when bars are done)
        if (barProgress >= 1) {
          ctx.fillStyle = getCSSVar('--dgmp-gray-900', '#0b1320')
          ctx.font = '12px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(objectifs[i], gx + barW / 2, pad.top + (plotH - (objectifs[i] / maxV) * plotH) - 8)
          ctx.fillText(realises[i], gx + barW + 8 + barW / 2, pad.top + (plotH - (realises[i] / maxV) * plotH) - 8)
        }

        // Label
        ctx.fillStyle = '#6b7280'
        ctx.font = '12px Inter'
        ctx.textAlign = 'center'
        ctx.fillText(lab, gx + groupW / 4 + barW, H - 14)
      })

      // Curve for realises (appears after bars, from 66% to 100%)
      const curveProgress = Math.max(0, (progress - 0.66) / 0.34)
      if (curveProgress > 0) {
        ctx.beginPath()
        const visiblePoints = Math.ceil(realises.length * curveProgress)
        realises.forEach((v, i) => {
          const gx = pad.left + i * groupW + groupW / 2 + 8
          const gy = pad.top + (1 - v / maxV) * plotH
          if (i === 0) {
            ctx.moveTo(gx, gy)
          } else if (i < visiblePoints) {
            ctx.lineTo(gx, gy)
          } else if (i === visiblePoints) {
            // Interpolate to current position
            const prevGx = pad.left + (i - 1) * groupW + groupW / 2 + 8
            const prevGy = pad.top + (1 - realises[i - 1] / maxV) * plotH
            const partialProgress = (curveProgress * realises.length) % 1
            const interpX = prevGx + (gx - prevGx) * partialProgress
            const interpY = prevGy + (gy - prevGy) * partialProgress
            ctx.lineTo(interpX, interpY)
          }
        })
        ctx.strokeStyle = '#111827'
        ctx.lineWidth = 2
        ctx.stroke()

        // Points appear progressively
        realises.forEach((v, i) => {
          if (i < visiblePoints) {
            const gx = pad.left + i * groupW + groupW / 2 + 8
            const gy = pad.top + (1 - v / maxV) * plotH
            ctx.beginPath()
            ctx.arc(gx, gy, 4, 0, 2 * Math.PI)
            ctx.fillStyle = '#111827'
            ctx.fill()
            ctx.fillStyle = '#fff'
            ctx.font = '11px Inter'
            ctx.textAlign = 'center'
            ctx.fillText(v, gx, gy - 10)
          } else if (i === visiblePoints) {
            // Show partial point
            const partialProgress = (curveProgress * realises.length) % 1
            const gx = pad.left + i * groupW + groupW / 2 + 8
            const gy = pad.top + (1 - v / maxV) * plotH
            ctx.globalAlpha = partialProgress
            ctx.beginPath()
            ctx.arc(gx, gy, 4, 0, 2 * Math.PI)
            ctx.fillStyle = '#111827'
            ctx.fill()
            ctx.fillStyle = '#fff'
            ctx.font = '11px Inter'
            ctx.textAlign = 'center'
            ctx.fillText(v, gx, gy - 10)
            ctx.globalAlpha = 1
          }
        })
      }
    }

    // Animation loop
    const animate = () => {
      animationProgress += 0.025
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

      let found = null
      labels.forEach((lab, i) => {
        const gx = pad.left + i * groupW + groupW / 4
        const bx = gx
        const bx2 = gx + barW * 2 + 8
        if (mx >= bx && mx <= bx2 && my >= pad.top && my <= pad.top + plotH) {
          found = { type: 'group', i }
        }
        const px = pad.left + i * groupW + groupW / 2 + 8
        const py = pad.top + (1 - realises[i] / maxV) * plotH
        if (Math.hypot(mx - px, my - py) < 8) found = { type: 'point', i }
      })

      const tip = makeTooltip()
      if (found) {
        if (found.type === 'group') {
          const i = found.i
          tip.innerHTML = `<strong>${labels[i]}</strong><div style="font-size:13px;margin-top:4px">Objectif: ${objectifs[i]}<br/>Réalisé: ${realises[i]}</div>`
        } else {
          const i = found.i
          tip.innerHTML = `<strong>${labels[i]}</strong><div style="font-size:13px;margin-top:4px">Réalisé: ${realises[i]}</div>`
        }
        tip.style.left = mx + 12 + 'px'
        tip.style.top = my + 12 + 'px'
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
  }, [labels, objectifs, realises])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        animation: 'fadeIn 0.6s ease-out 0.2s both',
      }}
    >
      <canvas ref={canvasRef} id="chartPerformance" height={220} width={420} style={{ display: 'block' }} />
      <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--dgmp-gray-400)', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: '#e5e7eb', borderRadius: '3px' }}></span> Objectifs
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'var(--dgmp-orange)', borderRadius: '3px' }}></span> Réalisations
        </span>
      </div>
    </div>
  )
}

export default ComboChart

