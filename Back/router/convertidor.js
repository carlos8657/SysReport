import { Router } from "express";
import {
    crearTabla,
    insertarExcelReact,
    categorias,
    departamento,
    empresas,
    prioridad,
    subcategoria,
    ubicacion,
    filtrado,
    tabla,
    eliminarTabla
} from "../controllers/convertidor.js";

const router = Router();
// import Multer from "multer";

// export const nombre = "excel.xlsx"

// const storage = Multer.diskStorage({
//     destination: 'uploads/',
//     filename: (req,file,cb)=>{
//         cb("",nombre)
//     }
// })

// const upload = Multer({
//   dest: 'uploads/',
//   storage
// })

// router.get('/',upload.single('doc'),mostrarExcel)
// router.post('/',upload.single('doc'),mostrarExcel)
// router.post('/insertarExcel',upload.single('doc'),mostrarExcel)
router.post('/insertarExcelReact', insertarExcelReact)
router.post('/insertarExcelReactTabla', crearTabla)

router.post('/categorias', categorias)
router.post('/empresas', empresas)
router.post('/ubicacion', ubicacion)
router.post('/departamento', departamento)
router.post('/prioridad', prioridad)
router.post('/subcategoria', subcategoria)
router.post('/filtrado', filtrado)
router.post('/tabla', tabla)
router.post('/eliminarTabla', eliminarTabla)

export default router;
