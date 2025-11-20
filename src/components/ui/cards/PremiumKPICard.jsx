const PremiumKPICard = ({ title, value, subtitle, valueColor }) => {
  return (
    <div className="card" style={{ padding: '22px', borderRadius: '16px', boxShadow: 'var(--shadow-1)' }}>
      <div style={{ fontSize: '14px', color: 'var(--dgmp-gray-400)' }}>{title}</div>
      <div
        style={{
          fontSize: '36px',
          fontWeight: '800',
          color: valueColor || 'var(--dgmp-gray-900)',
          margin: '6px 0',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--dgmp-gray-400)' }}>{subtitle}</div>
    </div>
  )
}

export default PremiumKPICard

