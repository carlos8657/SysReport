import { useContext, useEffect, useState } from "react"
import { ArchivoContext } from "../context"

export const useFiltroSelectOrdenarPor = (datos) => {
    
    const [ordenFinal, setOrdenFinal] = useState([])

    const { ordenamiento, filtrado, setOrdenarPor} = useContext(ArchivoContext)

    const cambiarOrdenamiento = (event)=>{
         const valor = event.value;
         setOrdenarPor(valor);
    }
        
    useEffect(() => {
        setOrdenFinal(ordenamiento.filter(val => !datos[val]))
    }, [filtrado])
  return {
    ordenFinal, cambiarOrdenamiento
  }
}
