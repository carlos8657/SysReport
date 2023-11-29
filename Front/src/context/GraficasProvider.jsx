import { useContext, useEffect, useState } from "react"
import { GraficasContext, ArchivoContext } from "./"

export const GraficasProvider = ({children}) => {
        //const [graficas, dispatch] = useReducer( graficasReducer, estadoInicial, init )
        const [graficas, setGraficas] = useState([])
        const {actualizador, setActualizador} = useContext(ArchivoContext)
        const [ChartData, setChartData] = useState({})
        const [contador, setContador] = useState(0)

        useEffect(() => {
            localStorage.setItem('graficas', JSON.stringify( graficas ))
            setActualizador(!actualizador)
          }, [graficas])
    
        const handleNewGrafica = ( grafica )=>{
            setGraficas([ ...graficas, grafica ])
        }
    
        const handleDeleteGrafica = ( id ) => {
            const newGraficas = graficas.filter(grafica=> grafica.id !== id)
            setGraficas(newGraficas)
        }

  return (
    <GraficasContext.Provider value={{graficas, ChartData, contador,
    setGraficas, setChartData, setContador,
    handleDeleteGrafica, handleNewGrafica}}>

        {children}
    </GraficasContext.Provider>
  )
}
