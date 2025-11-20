const CardHeader = ({ badge, badgeColor, title, description, titleId }) => {
  return (
    <div className="meta">
      {badge && <div className={`badge ${badgeColor || ''}`}>{badge}</div>}
      <div>
        {title && <h3 id={titleId}>{title}</h3>}
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

export default CardHeader

