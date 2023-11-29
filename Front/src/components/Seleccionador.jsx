import { useEffect, useState } from "react"
import { helperInsertarArchivo, helperInsertarDato } from "../helpers";

export const Seleccionador = ({cambiarEstado}) => {
  
  const [fileContent, setFileContent] = useState('');


useEffect(() => {
  const subidaArchivo = async()=>{
  await helperInsertarDato(fileContent,cambiarEstado)
  }
  if(fileContent != '') {
    subidaArchivo()
  }
}, [fileContent])

  return (
    <>
        <div className="container bg-secondary">
          <h2 className="text-center mt-3">Selecciona el archivo .csv obtenido del SysAid</h2>
        <input type="file" onChange={(event) => helperInsertarArchivo(event, setFileContent)} className="form-control mt-3" id="doc" name="doc" accept=".xlsx, .csv"/>
        </div>
        
    </>
  )
}
