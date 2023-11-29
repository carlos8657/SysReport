
export const FiltrosSelects = ({valores, nombre, cambio}) => {

  const name = Object.keys(valores[0])

  return (
    <>
        <div className="col">
          <label className="form-label">{nombre}</label>
          <select className="form-select" key={name} name={name} onChange={cambio}>
          <option key={0} value={'Todos'}>Todos</option>
            {
                valores.map((valor, index) => {
                    const nombre = Object.keys(valor);
                    return <option key={index} value={valor[nombre]}>{valor[nombre]}</option>
                })

            }
          </select>
        </div>

    </>
        
  )
}
