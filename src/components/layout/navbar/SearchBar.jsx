const SearchBar = ({ placeholder = 'Rechercher une formation, demande...' }) => {
  return (
    <div className="search" role="search">
      <span aria-hidden="true">🔍</span>
      <input placeholder={placeholder} aria-label="Recherche" />
    </div>
  )
}

export default SearchBar

