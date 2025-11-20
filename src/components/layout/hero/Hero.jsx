const Hero = ({ title = 'Bienvenue sur SIGEF', subtitle = 'Système Informatique de Gestion des Formations — DGMP' }) => {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <div className="hero-left">
        <div id="heroTitle" className="hero-title">
          {title}
        </div>
        <div className="hero-sub">{subtitle}</div>
      </div>
    </section>
  )
}

export default Hero

