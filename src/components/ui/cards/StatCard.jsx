const StatCard = ({ title, value, small, id }) => {
  return (
    <div className="stat" key={id} role="region" aria-label={title}>
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      <div className="small">{small}</div>
    </div>
  )
}

export default StatCard

