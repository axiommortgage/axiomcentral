const Table = (props) => {
  const { headers } = props
  const { rows } = props

  const generateRows = () => {
    let i = 0

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
            Object.keys(item).forEach((col) => <td key={item.title}>{item[col]}</td>)
            return item
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
          {headers.map((item) => (
            <th key={item.title}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{theRows}</tbody>
    </table>
  )
}

export default Table
