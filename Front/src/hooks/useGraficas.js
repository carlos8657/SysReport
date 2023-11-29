import { useContext, useState } from "react";
import { ArchivoContext, GraficasContext } from "../context";

export const useGraficas = () => {
    const [mostrarPieChart, setMostrarPieChart] = useState(true);
    const [mostrarLineChart, setMostrarLineChart] = useState(false);
    const [mostrarBarChart, setMostrarBarChart] = useState(false);
    const [mostrarDoughnutChart, setDoughnutChart] = useState(false);

    const {handleNewGrafica, contador, setContador, ChartData} = useContext(GraficasContext);

    const { titulo } = useContext(ArchivoContext)
    
    const togglePieChart = () => {
        setMostrarLineChart(false)
        setMostrarBarChart(false)
        setDoughnutChart(false)
        setMostrarPieChart(!mostrarPieChart)
    };

    const toggleLineChart = () => {
        setMostrarPieChart(false)
        setMostrarBarChart(false)
        setDoughnutChart(false)
        setMostrarLineChart(!mostrarLineChart)
    };

    const toggleBarChart = () => {
        setMostrarPieChart(false)
        setMostrarLineChart(false)
        setDoughnutChart(false)
        setMostrarBarChart(!mostrarBarChart)
    };

    const toggleDoughnutChart = () => {
        setMostrarPieChart(false)
        setMostrarLineChart(false)
        setMostrarBarChart(false)
        setDoughnutChart(!mostrarDoughnutChart)
    };

    

    const onNewGrafica = ()=>{
        let tipo= ''
        if(mostrarBarChart){
            tipo='barra'
        }else if(mostrarLineChart){
            tipo='line'
        }else if(mostrarPieChart){
            tipo='pie'
        }else{
            tipo='dona'
        }

        const newGrafica = {
            id: contador,
            tipo,
            titulo,
            payload: ChartData
        }
        setContador(contador+1)
        handleNewGrafica(newGrafica)
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const optionsLine = {
        maintainAspectRatio: false,
        responsive: true,
        fill: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

  return {
    mostrarBarChart, mostrarLineChart, mostrarPieChart, mostrarDoughnutChart,
    toggleBarChart, toggleLineChart, togglePieChart, toggleDoughnutChart,
    options, optionsLine,
    onNewGrafica
  }
}
