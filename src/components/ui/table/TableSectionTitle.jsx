const TableSectionTitle = ({ title, className = '' }) => {
  return (
    <tr className={`table-section-title ${className}`}>
      <th colSpan="100%">{title}</th>
    </tr>
  )
}

export default TableSectionTitle

