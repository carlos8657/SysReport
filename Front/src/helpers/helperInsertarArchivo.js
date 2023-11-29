import * as XLSX from 'xlsx';

export const helperInsertarArchivo = (event, setFileContent) => {
    const parseXLSX = (file) => {
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const content = XLSX.utils.sheet_to_json(sheet);
          setFileContent(JSON.stringify(content));
          
          
        };
        reader.readAsArrayBuffer(file);
      };

    const file = event.target.files[0];
        if (file) {
          const fileExtension = file.name.split('.').pop().toLowerCase();
    
          if (fileExtension === 'csv' || fileExtension === 'xlsx') {
            parseXLSX(file);
          }else {
            alert('Tipo de archivo no admitido. Por favor, seleccione un archivo CSV o XLSX.');
          }
        }
}