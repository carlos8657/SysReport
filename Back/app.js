import http from "http"
import express from "express";
import ejs from "ejs";
import path from "path";
import cors from "cors";
import morgan from "morgan";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine","ejs");
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
app.use(express.json({ limit: '20mb' }));
app.use(cors());
app.use(morgan('short'));
//Settings
app.set('port', 3000);


// Rutas
import convertidor from "./router/convertidor.js"

app.use('/api',convertidor)

app.listen(app.get('port'), ()=>{
    console.log(`Aplicación en el puerto 3000`);
})