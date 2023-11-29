
const excelInput = document.getElementById('doc')

excelInput.addEventListener('change', async function () {
    
    const file = excelInput.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        // El contenido del archivo se encuentra en e.target.result
        let contenido = e.target.result;

        // Aquí puedes procesar el contenido del archivo CSV, por ejemplo, imprimirlo en la consola
        console.log(contenido);
    };

    // Leer el archivo como texto
    reader.readAsText(file);
})