import { useFiltroSelectOrdenarPor } from "../hooks"

export const FiltroSelectOrdernarPor = ({ datos }) => {

    const {ordenFinal, cambiarOrdenamiento} = useFiltroSelectOrdenarPor(datos)
    
    return ordenFinal && Array.isArray(ordenFinal) && ordenFinal.length != 0 &&(
        
        <div className="row">
            <div className="col mt-2">
                <label className='form-label'>Ordenar por</label>
                <select onChange={(e)=>cambiarOrdenamiento(e.target)} className="form-select form-select" aria-label="Small select example" id='ordenar' name='ordenar' required>
                    <option key={0} value="Todos">Seleccione una opcion...</option>
                    
                    {    
                        ordenFinal.map((valor) => {
                             return <option key={valor} value={valor}>{valor.toUpperCase()}</option>
                        })
                    }

                </select>
            </div>
        </div>
        
    )
}
