const CardFooter = ({ children, ctaText, ctaHref, ctaColor }) => {
  if (ctaText) {
    return (
      <a className={`cta ${ctaColor || ''}`} href={ctaHref || '#'}>
        {ctaText}
      </a>
    )
  }
  return <div className="card-footer">{children}</div>
}

export default CardFooter

