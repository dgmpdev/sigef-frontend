import { useState, useEffect, useRef } from 'react'

const PremiumTable = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState(1)
  const [rows, setRows] = useState([
    { activity: 'SIGOMAP', actors: 'Publics externes Abidjan', femmes: 206, hommes: 337, total: 543, objectif: 500, taux: 108.6, isSubtotal: false, isHeader: false },
    { activity: '', actors: 'Publics externes région', femmes: 95, hommes: 600, total: 695, objectif: 400, taux: 173.7, isSubtotal: false, isHeader: false },
    { activity: '', actors: 'Internes', femmes: 27, hommes: 53, total: 80, objectif: 50, taux: 160, isSubtotal: false, isHeader: false },
    { activity: '', actors: 'Privés', femmes: 6, hommes: 17, total: 23, objectif: 50, taux: 44, isSubtotal: false, isHeader: false },
    { activity: '', actors: 'Sous-total SIGOMAP', femmes: 331, hommes: 1005, total: 1336, objectif: 1000, taux: 133.6, isSubtotal: true, isHeader: false },
    { activity: 'Procédures', actors: 'Publics Abidjan & région', femmes: 361, hommes: 517, total: 878, objectif: 900, taux: 97.55, isSubtotal: false, isHeader: false },
    { activity: '', actors: 'Privés Abidjan & région', femmes: 41, hommes: 152, total: 193, objectif: 100, taux: 193, isSubtotal: false, isHeader: false },
    { activity: '', actors: 'Sous-total Procédures', femmes: 402, hommes: 669, total: 1071, objectif: 1000, taux: 107.1, isSubtotal: true, isHeader: false },
  ])

  const originalRows = useRef(rows)

  useEffect(() => {
    originalRows.current = rows
  }, [])

  useEffect(() => {
    if (!searchQuery) {
      setRows(originalRows.current)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = originalRows.current.filter((row) => {
      return (
        row.activity.toLowerCase().includes(query) ||
        row.actors.toLowerCase().includes(query) ||
        row.femmes.toString().includes(query) ||
        row.hommes.toString().includes(query) ||
        row.total.toString().includes(query) ||
        row.objectif.toString().includes(query) ||
        row.taux.toString().includes(query)
      )
    })
    setRows(filtered)
  }, [searchQuery])

  const handleSort = (colIndex) => {
    if (sortColumn === colIndex) {
      setSortDirection(sortDirection * -1)
    } else {
      setSortColumn(colIndex)
      setSortDirection(1)
    }

    const sorted = [...rows].sort((a, b) => {
      let aVal, bVal
      switch (colIndex) {
        case 0:
          aVal = a.activity
          bVal = b.activity
          break
        case 1:
          aVal = a.actors
          bVal = b.actors
          break
        case 2:
          aVal = a.femmes
          bVal = b.femmes
          break
        case 3:
          aVal = a.hommes
          bVal = b.hommes
          break
        case 4:
          aVal = a.total
          bVal = b.total
          break
        case 5:
          aVal = a.objectif
          bVal = b.objectif
          break
        case 6:
          aVal = a.taux
          bVal = b.taux
          break
        default:
          return 0
      }

      if (typeof aVal === 'string') {
        return aVal.localeCompare(bVal) * sortDirection
      }
      return (aVal - bVal) * sortDirection
    })

    setRows(sorted)
  }

  const formatTaux = (taux) => {
    return taux.toFixed(1).replace('.', ',') + '%'
  }

  return (
    <section id="tablePremium" style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--dgmp-gray-900)' }}>
        Synthèse des acteurs formés (Tableau Premium)
      </h2>

      <input
        id="tableSearch"
        placeholder="Rechercher..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '10px',
          border: '1px solid #ddd',
          width: '260px',
          marginBottom: '10px',
          fontSize: '14px',
        }}
      />

      <div style={{ overflow: 'hidden', borderRadius: '14px', boxShadow: 'var(--shadow-1)', background: 'var(--surface)' }}>
        <table
          id="premiumTable"
          style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}
        >
          <thead
            style={{
              background: 'linear-gradient(90deg, var(--dgmp-orange), var(--dgmp-orange-600))',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <tr>
              <th
                data-col="0"
                onClick={() => handleSort(0)}
                style={{ padding: '14px', textAlign: 'left' }}
              >
                Activité ⬍
              </th>
              <th
                data-col="1"
                onClick={() => handleSort(1)}
                style={{ padding: '14px', textAlign: 'left' }}
              >
                Acteurs ⬍
              </th>
              <th
                data-col="2"
                onClick={() => handleSort(2)}
                style={{ padding: '14px', textAlign: 'center' }}
              >
                Femmes ⬍
              </th>
              <th
                data-col="3"
                onClick={() => handleSort(3)}
                style={{ padding: '14px', textAlign: 'center' }}
              >
                Hommes ⬍
              </th>
              <th
                data-col="4"
                onClick={() => handleSort(4)}
                style={{ padding: '14px', textAlign: 'center' }}
              >
                Total ⬍
              </th>
              <th
                data-col="5"
                onClick={() => handleSort(5)}
                style={{ padding: '14px', textAlign: 'center' }}
              >
                Objectif ⬍
              </th>
              <th
                data-col="6"
                onClick={() => handleSort(6)}
                style={{ padding: '14px', textAlign: 'center' }}
              >
                Taux ⬍
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                style={{
                  background: index % 2 === 0 && !row.isSubtotal ? '#f9fafb' : row.isSubtotal ? '#f3f4f6' : 'transparent',
                }}
              >
                <td
                  style={{
                    padding: row.isSubtotal ? '14px 14px' : '12px 14px',
                    fontWeight: row.isSubtotal ? '700' : row.activity ? '600' : 'normal',
                    background: row.isSubtotal ? '#f3f4f6' : 'transparent',
                    textAlign: row.isSubtotal ? 'right' : 'left',
                  }}
                  colSpan={row.isSubtotal ? 2 : 1}
                >
                  {row.activity || (row.isSubtotal ? row.actors : '')}
                </td>
                {!row.isSubtotal && (
                  <td style={{ padding: '12px 14px', fontWeight: row.activity ? '600' : 'normal' }}>
                    {row.actors}
                  </td>
                )}
                <td
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: row.isSubtotal ? '700' : 'normal',
                  }}
                >
                  {row.femmes}
                </td>
                <td
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: row.isSubtotal ? '700' : 'normal',
                  }}
                >
                  {row.hommes}
                </td>
                <td
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: row.isSubtotal ? '800' : '600',
                  }}
                >
                  {row.total}
                </td>
                <td
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: row.isSubtotal ? '700' : 'normal',
                  }}
                >
                  {row.objectif}
                </td>
                <td
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    color: row.taux >= 100 ? 'var(--dgmp-orange)' : '#dc2626',
                    fontWeight: row.isSubtotal ? '800' : '700',
                  }}
                >
                  {formatTaux(row.taux)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PremiumTable

