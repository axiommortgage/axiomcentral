const Table = props => {
    const {headers} = props;
    const {rows} = props;

    const generateRows = () => {
      
      return rows.map((row, index) => {

        const generateColumns = () => {  
            let columns = [];       
            for (let col in row){
              columns.push(row[col]);              
            }
            return columns;  
        }

        const theColumns = generateColumns();
        console.log(theColumns)

        return (
          <tr key={index}>
            {theColumns.map((item, index)=>{
              for(let col in item){
                return <td key={index}>{item[col]}</td>
              }
            })}
          </tr>
        )
      })
    }

    let theRows = generateRows();

    return(
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            {headers.map((item, index)=>{              
              return(
                <th key={index}>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
            {theRows}
        </tbody>
      </table>
    )
}

export default Table;