const Table = (props) => {
  const { headers } = props
  const { rows } = props

  const generateRows = () => {
    let i = 0
    const c = 0

    rows.map((row) => {
      // eslint-disable-next-line no-plusplus
      const rowIndex = i++

      const generateColumns = () => {
        const columns = []

        Object.keys(row).forEach((col) => {
          columns.push(row[col])
        })

        return columns
      }

      const theColumns = generateColumns()

      return (
        <tr key={rowIndex}>
          {theColumns.map((item) => {
            for (const col in item) {
              return <td key={index}>{item[col]}</td>
            }
          })}
        </tr>
      )
    })
  }

  const theRows = generateRows()

  return (
    <table cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{theRows}</tbody>
    </table>
  )
}

export default Table
