import CardHeader from './CardHeader'
import CardContent from './CardContent'
import CardFooter from './CardFooter'

const Card = ({ id, badge, badgeColor, title, description, ctaText, ctaHref, ctaColor, children }) => {
  return (
    <article className="card" aria-labelledby={id}>
      <CardHeader badge={badge} badgeColor={badgeColor} title={title} description={description} titleId={id} />
      {children && <CardContent>{children}</CardContent>}
      {ctaText && <CardFooter ctaText={ctaText} ctaHref={ctaHref} ctaColor={ctaColor} />}
    </article>
  )
}

export default Card

