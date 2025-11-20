const ChartCard = ({ title, children, className = '', style }) => {
  return (
    <div className={`chart-card ${className}`} style={{ ...style, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {title && <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: '700' }}>{title}</h3>}
      <div className="chart-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  )
}

export default ChartCard

