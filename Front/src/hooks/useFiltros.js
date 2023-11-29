import { useContext, useEffect } from "react"
import { URLs } from '../common/URLs'
import axios from "axios"
import { ArchivoContext, GraficasContext} from "../context"

export const useFiltros = () => {

    // Contexto
    const { categoria, empresa, departamento, prioridad, ubicacion, subcategoria, filtrado, ordenarPor, datosPost,
        setCategoria, setEmpresa, setDepartamento, setPrioridad, setUbicacion, setSubcategoria, setFiltrado, setOrdenarPor, setTabla, setdatosPost, setTitulo } = useContext(ArchivoContext);
    
    const {ChartData, setChartData}= useContext(GraficasContext)

    const handleSubmit = async (event) => {
        const nombreTabla = localStorage.getItem('nombre')
        // Cancelar el evento de recarga de la pagina
        event.preventDefault()

        if (ordenarPor === undefined || ordenarPor.length === 0 || ordenarPor === 'Todos') {
            alert('Selecciona un filtrado');
            console.log(ordenarPor)
        }else{
        // Peticion post a la api 
       const res =  await axios.post('http://localhost:3000/api/filtrado', [filtrado, {name: nombreTabla, ordenamiento: ordenarPor}] ,{headers: {"Content-Type": "application/json"}})
       alert(`Se encontraron ${res.data.respuesta2.length} registros`)
       console.log(res.data)
       setdatosPost(res.data.respuesta)     
       setTabla(res.data.respuesta2)
    setTitulo(res.data.respuesta3)
        }

    }

    const fetchData = () => {
        setChartData({
            labels: datosPost.map(element => element.labels),
            datasets: [{
                fill: true,
                label: 'Numero de tickets',
                data: datosPost.map(element => element.numero),
                borderColor: ['rgba(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(0, 85, 247)'],
                backgroundColor: ['rgba(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(0, 85, 247)']
            }]
        })
    }

    const handleInput = (event) => {

        const valor = event.target.value;
        const nombre = event.target.name;
        const nombreOrdenamiento = ordenarPor;

        if (nombreOrdenamiento === nombre) {
            setOrdenarPor('')
        }

        setFiltrado((c) => {
            if (valor === 'Todos') {
                const a = { ...c };
                delete a[nombre];
                return a;
            }
            return { ...c, [nombre]: valor }
        })
    }

    const peticionesGet = async () => {
        const nombreTabla = localStorage.getItem('nombre')

        console.log('Entró al peticiones get')
        Promise.all(URLs.map((url) => axios.post(url, { name: nombreTabla }))).then(
            axios.spread(({ data: categorias }, { data: empresas }, { data: ubicacion }, { data: departamento }, { data: prioridad }, { data: subcategoria }) => {
                setCategoria(categorias);
                setEmpresa(empresas);
                setUbicacion(ubicacion);
                setDepartamento(departamento);
                setPrioridad(prioridad);
                setSubcategoria(subcategoria);

            })
        );
           
    }

    useEffect(() => {
        if (datosPost.length != 0) {
            fetchData()
        }
    }, [datosPost])

    return {
        ChartData,
        handleInput,
        handleSubmit,
        peticionesGet,
        fetchData,
        filtrado,
        categoria, empresa, departamento, prioridad, subcategoria, ubicacion
    }

}
