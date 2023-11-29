import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ArchivoContext } from "../context/ArchivoContext"

export const useTabla = () => {
    // Agarrar el contexto
    const { tabla, setTabla } = useContext(ArchivoContext);
    const [campos, setCampos] = useState()
    const [buscar, setBuscar] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        peticionTabla()
    }, [])

    useEffect(() => {

        const result = tabla?.filter((item) => {
            return (
                item.id?.toString().toLowerCase().includes(buscar?.toString().toLocaleLowerCase()) ||
                item.ubicacion?.toLowerCase().includes(buscar?.toLocaleLowerCase()) ||
                item.empresa?.toLowerCase().includes(buscar?.toLocaleLowerCase()) ||
                item.departamento?.toLowerCase().includes(buscar?.toLocaleLowerCase()) ||
                item.usuarioSolicitud?.toLowerCase().includes(buscar?.toLocaleLowerCase()) ||
                item.horaSolicitud?.toLowerCase().includes(buscar?.toLocaleLowerCase()) ||
                item.prioridad?.toLowerCase().includes(buscar?.toLocaleLowerCase()) ||
                item.horaCierre?.toLowerCase().includes(buscar?.toLocaleLowerCase()) ||
                item.fechaVencimiento?.toLowerCase().includes(buscar?.toLocaleLowerCase())
            )
        });
        setFilter(result);
    }, [buscar])

    useEffect(() => {

        if (tabla && Array.isArray(tabla) && tabla.length != 0) {
            setCampos(Object.keys(tabla[0]))
        }
    }, [tabla])

    useEffect(() => {
        if (tabla.length !== 0) {
            setFilter(tabla)
        }

    }, [tabla])



    const peticionTabla = async () => {
        const nombreTabla = localStorage.getItem('nombre')
        // Peticion post a la api 
        const respuesta = await axios.post('http://localhost:3000/api/tabla', { name: nombreTabla }, { headers: { "Content-Type": "application/json" } })
        setTabla(respuesta.data)
        setFilter(respuesta.data)
    }

    return {
        tabla, peticionTabla, campos, buscar, setBuscar, filter, setFilter
    }
}