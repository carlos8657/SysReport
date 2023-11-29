import { pool } from "../db/config.js";

export const insertarExcelReact = async (req, res) => {
	const { content: contents, name } = req.body;
	console.log('Entró a la función')

	contents.map((content2) => {

		const CadenaSolicitud = content2['Hora de solicitud']?.toString();
		const CadenaCierre = content2['Hora de cierre']?.toString();
		const CadenaVencimiento = content2['Fecha de vencimiento']?.toString();
		if (CadenaSolicitud?.charAt(0) == 4) {
			content2['Hora de solicitud'] = convertirFecha(new Date((content2['Hora de solicitud'] - (25567 + 2)) * 86400 * 1000))
		} if (CadenaCierre?.charAt(0) == 4) {
			content2['Hora de cierre'] = convertirFecha(new Date((content2['Hora de cierre'] - (25567 + 2)) * 86400 * 1000))
		} if (CadenaVencimiento?.charAt(0) == 4) {
			content2['Fecha de vencimiento'] = convertirFecha(new Date((content2['Fecha de vencimiento'] - (25567 + 2)) * 86400 * 1000))
		}
		if (CadenaSolicitud == undefined) {
			content2['Hora de solicitud'] = "null"
		} if (CadenaCierre == undefined) {
			content2['Hora de cierre'] = "null"
		} if (CadenaVencimiento == undefined) {
			content2['Fecha de vencimiento'] = "null"
		}
	})


	await pool.query("INSERT INTO tabla" + name + " (id, ubicacion, empresa, departamento, usuarioSolicitud, horaSolicitud, horaCierre, fechaVencimiento, prioridad, estado, categoria, subcategoria, categoriaTercerNivel, asignadoA, peso, informacionCierre, clasificacion, usuarioEnvio,  tiempoResolver, tiempoEsperaUsuario, listaPerso) VALUES " + contents.map(content => "("
		+ content['#'] + ", "
		+ "'" + content['Ubicación'] + "'" + ", "
		+ "'" + content['Empresa'] + "'" + ", "
		+ "'" + content['Departamento'] + "'" + ", "
		+ "'" + content['Usuario de solicitud'] + "'" + ", "
		+ "STR_TO_DATE('" + content['Hora de solicitud'] + "','%d-%m-%Y %H:%i:%s')" + ", "
		+ "STR_TO_DATE('" + content['Hora de cierre'] + "','%d-%m-%Y %H:%i:%s')" + ", "
		+ "STR_TO_DATE('" + content['Fecha de vencimiento'] + "','%d-%m-%Y %H:%i:%s')" + ", "
		+ "'" + content['Prioridad'] + "'" + ", "
		+ "'" + content['Estado'] + "'" + ", "
		+ "'" + content['Categoría'] + "'" + ", "
		+ "'" + content['Subcategoría'] + "'" + ", "
		+ "'" + content['Categoría de tercer nivel'] + "'" + ", "
		+ "'" + content['Asignado a'] + "'" + ", "
		+ "'" + content['Peso'] + "'" + ", "
		+ "'" + content['Información de cierre'] + "'" + ", "
		+ "'" + content['Clasificación'] + "'" + ", "
		+ "'" + content['Usuario de envío'] + "'" + ", "
		+ "'" + content['Tiempo para resolver'] + "'" + ", "
		+ "'" + content['Tiempo en espera por usuario'] + "'" + ", "
		+ "'" + content['Lista personalizada de solicitud de servicio 1']
		+ "'" + ")").join(',')), (err) => {
			if (err) {
				console.log(err)
				return res.send(500, 'Ocurrió un error en la inserción de los campos')

			}
		};
	return res.json(true)
}

function convertirFecha(fechaOriginal) {
	var fecha = new Date(fechaOriginal);
	// console.log(fecha)
	var año = fecha.getFullYear();
	// console.log(año)
	var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
	// console.log(mes)
	var dia = fecha.getDate().toString().padStart(2, '0');
	var hora = fecha.getHours().toString().padStart(2, '0');
	var minutos = fecha.getMinutes().toString().padStart(2, '0');
	var segundos = fecha.getSeconds().toString().padStart(2, '0');
	return dia+ '-' + mes + '-' + año + ' ' + hora + ':' + minutos + ':' + segundos;
}

function convertirFechaSinSegundos(fechaOriginal) {
	const fecha = new Date(fechaOriginal);
	const año = fecha.getFullYear();
	const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
	const dia = fecha.getDate().toString().padStart(2, '0');
	return año+ '-' + mes + '-' + dia;
}

export const crearTabla = async (req, res) => {
	const { name } = req.body;

	const queryTabla = `create table if not exists tabla${name}(
    id int primary key,
    ubicacion text,
    empresa text,
    departamento text,
    usuarioSolicitud text,
    horaSolicitud datetime,
    horaCierre datetime,
    fechaVencimiento datetime,
    prioridad text,
    estado text,
    categoria text,
    subcategoria text,
    categoriaTercerNivel text,
    asignadoA text,
    peso text,
    informacionCierre text,
    clasificacion text,
    usuarioEnvio text, 
    tiempoResolver text,
    tiempoEsperaUsuario text,
    listaPerso text
  )`
	try {
		await pool.query(queryTabla);
		return res.json(true)
	} catch (error) {
		console.log(error)
		res.json(error)
	}
}


export const categorias = async (req, res) => {
	const nombre = req.body.name;
	const [respuesta] = await pool.query(`SELECT categoria FROM tabla${nombre} WHERE categoria NOT IN ("undefined") group by categoria;`);

	if (respuesta == undefined) {
		return res.status(404).send('No existen las categorías');
	}

	return res.json(respuesta);

}


export const empresas = async (req, res) => {
	const nombre = req.body.name;
	const [respuesta] = await pool.query(`SELECT empresa FROM tabla${nombre} WHERE empresa NOT IN ("undefined") group by empresa;`);

	if (respuesta == undefined) {
		return res.status(404).send('No existen las empresas');
	}

	return res.json(respuesta);

}

export const ubicacion = async (req, res) => {
	const nombre = req.body.name;
	const [respuesta] = await pool.query(`SELECT ubicacion FROM tabla${nombre} WHERE ubicacion NOT IN ("undefined") group by ubicacion;`)

	if (respuesta == undefined) {
		return res.status(404).send('No existen las ubicaciones');
	}

	return res.json(respuesta);

}


export const departamento = async (req, res) => {
	const nombre = req.body.name;
	const [respuesta] = await pool.query(`SELECT departamento FROM tabla${nombre} WHERE departamento NOT IN ("undefined") group by departamento;`)

	if (respuesta == undefined) {
		return res.status(404).send('No existen las ubicaciones');
	}

	return res.json(respuesta);

}

export const prioridad = async (req, res) => {
	const nombre = req.body.name;
	const [respuesta] = await pool.query(`SELECT prioridad FROM tabla${nombre} WHERE prioridad NOT IN ("undefined") group by prioridad;`)

	if (respuesta == undefined) {
		return res.status(404).send('No existen las prioridades');
	}

	return res.json(respuesta);

}

export const subcategoria = async (req, res) => {
	const nombre = req.body.name;
	const [respuesta] = await pool.query(`SELECT subcategoria FROM tabla${nombre} WHERE subcategoria NOT IN ("undefined") group by subcategoria;`)

	if (respuesta == undefined) {
		return res.status(404).send('No existen las subcategorías');
	}

	return res.json(respuesta);

}

export const filtrado = async (req, res) => {

	const objeto = req.body[0]
	const name = req.body[1]['name'];
	const orden = req.body[1]['ordenamiento'];
	const primeraFechaTabla = await pool.query('SELECT horaSolicitud FROM tabla' + name + ' order by horaSolicitud asc limit 1')
	let consulta = "SELECT ";
	let consultaTabla = "SELECT id, ubicacion, empresa, departamento, usuarioSolicitud, DATE_FORMAT(horaSolicitud, '%Y-%m-%d %H:%i:%s') as horaSolicitud, DATE_FORMAT(horaCierre, '%Y-%m-%d %H:%i:%s') as horaCierre, DATE_FORMAT(fechaVencimiento, '%Y-%m-%d %H:%i:%s') as fechaVencimiento, prioridad, estado, categoria, subcategoria, categoriaTercerNivel, asignadoA, peso, informacionCierre, clasificacion, usuarioEnvio, tiempoResolver, tiempoEsperaUsuario, listaPerso ";
	let titulo = 'Gráfica'
	

	consulta += orden + " as labels," + "COUNT(" + orden + ") as numero FROM tabla" + name
	consultaTabla += "FROM tabla" + name
	let primero = true;

	const paresClaveValor = Object.entries(objeto);

	paresClaveValor.map(([atributo, valor]) => {
		// Ignora los campos
		console.log(atributo,valor)
		if (`${valor}` == undefined || `${valor}` == "Todos" || `${atributo}` == "ordenar" || `${atributo}` == "fecha1" || `${atributo}` == "fecha2" ||`${atributo}` == "Rellenado" ) {

		} else {
			if (primero === true) {
				consulta += ` WHERE ${atributo} = "${valor}"`
				consultaTabla += ` WHERE ${atributo} = "${valor}"`
				titulo += ` de ${atributo} "${valor}"`
				primero = false;

			}
			else {
				consulta += ` AND ${atributo} = "${valor}"`
				consultaTabla += ` AND ${atributo} = "${valor}"`
				titulo += `,  ${atributo} "${valor}"`
			}

		}

	});
	const tiempoTranscurrido = Date.now();
	const hoy = convertirFecha(tiempoTranscurrido)

	if ((objeto.fecha1 === undefined || objeto.fecha1 === '') && (objeto.fecha2 === undefined || objeto.fecha2 === '')) {
		consulta += " group by " + orden
		titulo += ` ordenado por ${orden}`

	} else if (objeto.fecha2 && objeto.fecha1 && primero) {
		consulta += " WHERE horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND '"+ objeto.fecha2 +"' group by " + orden
		titulo += ` del ${objeto.fecha1} a ${objeto.fecha2} ordenado por ${orden}`
		consultaTabla += " WHERE horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND '"+ objeto.fecha2 +"'"

	}else if(objeto.fecha2 && objeto.fecha1 && primero == false) {
		consulta += " AND horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND '"+ objeto.fecha2 +"' group by " + orden
		titulo += ` del ${objeto.fecha1} a ${objeto.fecha2} ordenado por ${orden}`
		consultaTabla +=  " AND horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND '"+ objeto.fecha2 + "'"
		
	} else if ((objeto.fecha2 === undefined  || objeto.fecha2 === '') && primero) {
		consulta += " WHERE horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND DATE(NOW()) group by " + orden
		titulo += ` del ${objeto.fecha1} a ${hoy} ordenado por ${orden}`
		consultaTabla += " WHERE horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND DATE(NOW())"

	}else if((objeto.fecha2 === undefined || objeto.fecha2 === '') && primero==false) {
		consulta += " AND horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND DATE(NOW()) group by " + orden
		titulo += ` del ${objeto.fecha1} a ${hoy} ordenado por ${orden}`
		consultaTabla += " AND horaSolicitud BETWEEN '" + objeto.fecha1 + "' AND DATE(NOW())"
	} 

	else if ((objeto.fecha1 === undefined || objeto.fecha1 == '') && primero) {
		consulta += " WHERE horaSolicitud BETWEEN '" + primeraFechaTabla[0][0].horaSolicitud + "' AND '" + objeto.fecha2 + "' group by " + orden
		titulo += ` del ${convertirFechaSinSegundos(primeraFechaTabla[0][0].horaSolicitud)} a ${objeto.fecha2} ordenado por ${orden}`
		consultaTabla += " WHERE horaSolicitud BETWEEN '" + primeraFechaTabla[0][0].horaSolicitud + "' AND '" + objeto.fecha2 + "'"

	} else if ((objeto.fecha1 === undefined  || objeto.fecha1 == '') && primero == false) {
		consulta += " AND horaSolicitud BETWEEN '" + primeraFechaTabla[0][0].horaSolicitud + "' AND '" + objeto.fecha2 + "' group by " + orden
		titulo += ` del ${convertirFechaSinSegundos(primeraFechaTabla[0][0].horaSolicitud)} a ${objeto.fecha2} ordenado por ${orden}`
		consultaTabla += " AND horaSolicitud BETWEEN '" + primeraFechaTabla[0][0].horaSolicitud + "' AND '" + objeto.fecha2 + "'"
	}

	const [respuesta] = await pool.query(consulta)
	const [respuesta2] = await pool.query(consultaTabla)
	const respuesta3 = titulo
	console.log(titulo)
	if (respuesta == undefined) {
		return res.status(404).send('No hizo nada');
	}

	return res.json({respuesta, respuesta2, respuesta3});

}


export const tabla = async (req, res) => {
	const nombre = req.body.name;
	const [respuesta] = await pool.query(`SELECT id, ubicacion, empresa, departamento, usuarioSolicitud, DATE_FORMAT(horaSolicitud, '%Y-%m-%d %H:%i:%s') as horaSolicitud, DATE_FORMAT(horaCierre, '%Y-%m-%d %H:%i:%s') as horaCierre, DATE_FORMAT(fechaVencimiento, '%Y-%m-%d %H:%i:%s') as fechaVencimiento, prioridad, estado, categoria, subcategoria, categoriaTercerNivel, asignadoA, peso, informacionCierre, clasificacion, usuarioEnvio, tiempoResolver, tiempoEsperaUsuario, listaPerso FROM tabla${nombre};`)

	if (respuesta == undefined) {
		return res.status(404).send('No existe la tabla');
	}

	return res.json(respuesta);
}

export const eliminarTabla = async (req, res) => {
	const { name } = req.body;
	await pool.query(`DROP TABLE IF EXISTS tabla${name}`)
	return res.json('Se eliminó la tabla')
}