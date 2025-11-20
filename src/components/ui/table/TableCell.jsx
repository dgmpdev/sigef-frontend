const TableCell = ({ children, className = '', colSpan, align }) => {
  return (
    <td className={className} colSpan={colSpan} style={{ textAlign: align }}>
      {children}
    </td>
  )
}

export default TableCell

