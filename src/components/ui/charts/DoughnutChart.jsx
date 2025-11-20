import { useEffect, useRef } from 'react'

const DoughnutChart = ({ femmes = 733, hommes = 1674 }) => {
  const canvasRef = useRef(null)
  const tooltipRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const total = femmes + hommes
    const getCSSVar = (varName, fallback) => {
      if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(varName)?.trim() || fallback
      }
      return fallback
    }

    const segments = [
      { v: femmes, label: 'Femmes', color: getCSSVar('--dgmp-orange', '#ff8c00') },
      { v: hommes, label: 'Hommes', color: '#e5e7eb' },
    ]

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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineCap = 'round'
      let start = -Math.PI / 2
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const r = 80

      segments.forEach((s) => {
        const fullAngle = (s.v / total) * 2 * Math.PI
        const angle = fullAngle * progress
        ctx.beginPath()
        ctx.strokeStyle = s.color
        ctx.lineWidth = 32
        ctx.shadowColor = 'rgba(0,0,0,0.06)'
        ctx.shadowBlur = 8
        ctx.arc(cx, cy, r, start, start + angle)
        ctx.stroke()
        s.start = start
        s.end = start + fullAngle
        start += fullAngle
      })

      // Animate text opacity
      ctx.shadowBlur = 0
      ctx.fillStyle = getCSSVar('--dgmp-gray-900', '#0b1320')
      ctx.globalAlpha = progress
      ctx.font = 'bold 16px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(total + ' formés', cx, cy + 6)
      ctx.globalAlpha = 1
    }

    // Animation loop
    const animate = () => {
      animationProgress += 0.05
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
      const x = e.clientX - r.left - canvas.width / 2
      const y = e.clientY - r.top - canvas.height / 2
      const ang = Math.atan2(y, x)
      let a = ang < -Math.PI / 2 ? ang + 2 * Math.PI : ang
      let found = null

      segments.forEach((s) => {
        if (a >= s.start && a <= s.end) found = s
      })

      const tip = makeTooltip()
      if (found) {
        tip.innerHTML = `<strong>${found.label}</strong><div style="font-size:13px;margin-top:4px">${found.v} (${Math.round((found.v / total) * 100)}%)</div>`
        tip.style.left = e.offsetX + 12 + 'px'
        tip.style.top = e.offsetY + 12 + 'px'
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
  }, [femmes, hommes])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeIn 0.6s ease-out',
      }}
    >
      <canvas ref={canvasRef} id="donutFH" height={220} width={300} style={{ display: 'block' }} />
      <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--dgmp-gray-400)', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: 'var(--dgmp-orange)', borderRadius: '3px' }}></span> Femmes
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', background: '#e5e7eb', borderRadius: '3px' }}></span> Hommes
        </span>
      </div>
    </div>
  )
}

export default DoughnutChart
