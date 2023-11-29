import { useContext, useEffect, useState } from "react"
import { ArchivoContext, GraficasContext } from "../context"
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2"
import html2canvas from "html2canvas";
import pdfConverter from 'jspdf'

const obtenerTablas = () => {
    return JSON.parse(localStorage.getItem('graficas'))
}

export const GraficasReporte = () => {

    const { handleDeleteGrafica } = useContext(GraficasContext)

    const [cambio, setCambio] = useState()

    const { actualizador } = useContext(ArchivoContext);


    useEffect(() => {
        setCambio(obtenerTablas());
    }, [actualizador])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            }
        },
    };

    const generatePDF = async () => {
        const pdf = new pdfConverter();
        let captureCount = 0;
        const captureWidth = 150; // Ancho de cada captura
        const captureHeight = 90; // Alto de cada captura
        const startX = 30; // Coordenada X inicial
        const startY = 10; // Coordenada Y inicial
        const spacingY = 140; // Espacio vertical entre capturas

        for (let i = 0; i < cambio.length; i++) {
            const elementId = i;
            const canvas = await html2canvas(document.getElementById(elementId));
            const imageData = canvas.toDataURL('image/png');

            // Calcular coordenadas para la posición de la captura en la página
            const x = startX;
            const y = startY + captureCount * spacingY;

            // Agregar la captura al PDF con las coordenadas calculadas
            pdf.addImage(imageData, 'PNG', x, y, captureWidth, captureHeight, '', 'MEDIUM');

            captureCount++;

            // Cambiar de página después de cada tres capturas
            if (captureCount === 2 && i !== cambio.length - 1) {
                pdf.addPage();
                captureCount = 0; // Reiniciar el contador
            } else if (i !== cambio.length - 1) {
                // Si no es el último elemento, pero no se han capturado tres imágenes, seguir en la misma página
            }
        }

        // Guardar el PDF
        pdf.save('reporte.pdf');
    }

    return cambio && cambio.length != 0 && (
        <>
            <h4 className="text-center my-3">Reporte final</h4>
            <div className="container mb-3">
                <div className="text-end">
                    <button className="btn btn-dark mb-2" onClick={generatePDF}><i className="bi bi-file-earmark-pdf-fill"></i> Descargar PDF</button>
                </div>

                <div className="row bg-white" id="example">

                    {
                        cambio.map((tabla, index) => {
                            if (tabla.tipo === 'pie') {
                                return (
                                    <>
                                        <hr />
                                        <div className="row text-center" id={index}>
                                            <h4>{tabla.titulo}</h4>
                                            <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center my-4" >
                                                <Pie data={tabla.payload} options={options} />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col align-self-end text-end">
                                                <button className="btn btn-outline-danger" onClick={() => handleDeleteGrafica(tabla.id)}><i className="bi bi-trash3-fill"></i>Eliminar</button>
                                            </div>
                                        </div>


                                    </>
                                )
                            } else if (tabla.tipo === 'line') {
                                return (
                                    <>
                                        <hr />
                                        <div className="row text-center" id={index}>
                                            <h4>{tabla.titulo}</h4>
                                            <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center my-4" >
                                                <Line data={tabla.payload} options={options} />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col align-self-end text-end">
                                                <button className="btn btn-outline-danger" onClick={() => handleDeleteGrafica(tabla.id)}><i className="bi bi-trash3-fill"></i>Eliminar</button>
                                            </div>
                                        </div>

                                    </>
                                )
                            } else if (tabla.tipo === 'barra') {
                                return (
                                    <>
                                        <hr />
                                        <div className="row text-center" id={index}>
                                            <h4>{tabla.titulo}</h4>
                                            <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center my-4" >
                                                <Bar data={tabla.payload} options={options} />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col align-self-end text-end">
                                                <button className="btn btn-outline-danger" onClick={() => handleDeleteGrafica(tabla.id)}><i className="bi bi-trash3-fill"></i>Eliminar</button>
                                            </div>
                                        </div>

                                    </>
                                )
                            } else if (tabla.tipo === 'dona') {
                                return (
                                    <>
                                        <hr />
                                        <div className="row text-center" id={index}>
                                            <h4>{tabla.titulo}</h4>
                                            <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center my-4" >
                                                <Doughnut data={tabla.payload} options={options} />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col align-self-end text-end">
                                                <button className="btn btn-outline-danger" onClick={() => handleDeleteGrafica(tabla.id)}><i className="bi bi-trash3-fill"></i>Eliminar</button>
                                            </div>
                                        </div>

                                    </>
                                )
                            }


                        })
                    }

                </div>
            </div>
        </>
    )
}
