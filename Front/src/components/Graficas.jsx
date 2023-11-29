import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, BarElement } from 'chart.js';
import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';
import { useGraficas } from '../hooks';
import { useContext } from 'react';
import { ArchivoContext } from '../context';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, BarElement);

export const Graficas = ({ ChartData }) => {

    const { togglePieChart, toggleLineChart, toggleBarChart,toggleDoughnutChart, mostrarPieChart, mostrarLineChart, mostrarBarChart, mostrarDoughnutChart, onNewGrafica, options, optionsLine } = useGraficas()

    const{ titulo } = useContext(ArchivoContext)

    return (
        <>
            
            <div className="container">
                <div className="row bg-white justify-content-center">
                    {ChartData && ChartData.datasets && (
                        <>
                            <div className="col-11 text-center">
                                <button onClick={togglePieChart} className='btn mx-2 fs-2'><i className="bi bi-pie-chart-fill"></i></button>
                                <button onClick={toggleLineChart} className='btn mx-2 fs-2'><i className="bi bi-graph-up"></i></button>
                                <button onClick={toggleBarChart} className='btn mx-2 fs-2'><i className="bi bi-bar-chart-fill"></i></button>
                                <button onClick={toggleDoughnutChart} className='btn mx-2 fs-2'><i className="bi bi-record-circle-fill"></i></button>
                            </div>
                            <div className="col-1" >
                                <button className='btn btn-outline-success my-2' onClick={onNewGrafica}><i className="bi bi-file-earmark-plus-fill"></i></button>
                            </div>
                            <div className="row text-center my-3">
                                <h4>{titulo}</h4>
                            </div>
                            {mostrarPieChart ?
                                <div style={{ width: '500px', height: '600px' }} className="col d-flex align-items-center">
                                    <Pie data={ChartData} options={options} />
                                </div>
                                : null}
                            {mostrarLineChart ?
                                <div style={{ width: '500px', height: '600px' }} className="col d-flex align-items-center">
                                    <Line data={ChartData} options={optionsLine} />
                                </div>
                                : null}
                            {mostrarBarChart ?
                                <div style={{ width: '500px', height: '600px' }} className="col d-flex align-items-center">
                                    <Bar data={ChartData} options={options} />
                                </div>
                                : null}
                            {mostrarDoughnutChart ?
                                <div style={{ width: '500px', height: '600px' }} className="col d-flex align-items-center">
                                    <Doughnut data={ChartData} options={options} />
                                </div>
                                : null}

                        </>

                    )}
                </div>
            </div>
        </>
    )
}
