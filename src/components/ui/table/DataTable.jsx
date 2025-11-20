import TableHeader from './TableHeader'
import TableRow from './TableRow'
import TableCell from './TableCell'
import TableSectionTitle from './TableSectionTitle'

const DataTable = ({ columns, data, sectionTitle, className = '' }) => {
  return (
    <table className={`data-table ${className}`}>
      {sectionTitle && (
        <TableHeader>
          <TableSectionTitle title={sectionTitle} />
        </TableHeader>
      )}
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableCell key={index} className="table-header-cell">
              {col.label || col}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <tbody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col, colIndex) => {
              const cellData = typeof col === 'string' ? row[col] : row[col.key]
              return (
                <TableCell key={colIndex}>
                  {cellData}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable

