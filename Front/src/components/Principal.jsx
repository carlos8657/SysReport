import { useEffect, useState } from "react"
import { Seleccionador, Filtros} from "./"



export const Principal = () => {

  const [mostradorFiltro, setMostradorFiltro] = useState(false)

  return (
    <>
      <div className="bg-secondary">


        <nav className="bg-dark text-center">
          <p className="fs-1 text-success d-inline-block">Sys</p><p className=" fs-1 d-inline-block text-white">Report</p>
        </nav>
        {mostradorFiltro ? (<Filtros cambiarEstado={mostradorFiltro} />) : (<Seleccionador cambiarEstado={setMostradorFiltro} />)}
      </div>
    </>
  )
}
