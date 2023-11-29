import { useState } from "react"
import { ArchivoContext } from "./ArchivoContext"

export const ArchivoProvider = ({children})=>{
    const [categoria, setCategoria] = useState([{categoria:'categoria'}])
    const [empresa, setEmpresa] = useState([{empresa:'empresa'}])
    const [departamento, setDepartamento] = useState([{departamento:'departamento'}])
    const [prioridad, setPrioridad] = useState([{prioridad:'prioridad'}])
    const [ubicacion, setUbicacion] = useState([{ubicacion:'ubicacion'}])
    const [subcategoria, setSubcategoria] = useState([{subcategoria:'subcategoria'}])
    const [ordenamiento, setOrdenamiento] = useState(['categoria','empresa','departamento','prioridad','ubicacion', 'subcategoria'])
    const [filtrado, setFiltrado] = useState({})
    const [ordenarPor, setOrdenarPor] = useState([])
    const [tabla, setTabla] = useState([])
    const [datosPost, setdatosPost] = useState([])
    
    const [titulo, setTitulo] = useState()
    const [actualizador, setActualizador] = useState(true)

    return(
        <ArchivoContext.Provider value={ 
            {categoria,empresa, departamento, prioridad, ubicacion, subcategoria, ordenamiento,filtrado, ordenarPor, datosPost, actualizador, tabla, titulo,
            setEmpresa, setCategoria, setDepartamento, setPrioridad, setUbicacion, setSubcategoria, setFiltrado, setOrdenarPor, setdatosPost, setActualizador, setTabla, setTitulo} 
            }>
            { children }
        </ArchivoContext.Provider>
    )
}