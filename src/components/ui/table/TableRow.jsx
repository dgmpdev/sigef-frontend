import TableCell from './TableCell'

const TableRow = ({ children, className = '', onClick }) => {
  return (
    <tr className={className} onClick={onClick}>
      {children}
    </tr>
  )
}

export default TableRow

