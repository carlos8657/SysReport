import { useTabla } from "../hooks"
import DataTable, { createTheme } from 'react-data-table-component'


export const Tabla = () => {

	const { tabla, campos, buscar, setBuscar, setFilter, filter } = useTabla()

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
		rangeSeparatorText: 'de',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Todos',
	};

	createTheme('solarized', {
		background: {
			default: '#f8f8f'
		},
		divider: {
			default: '#073642',
		},
	});

	const columns = campos?.map((column) => {

		if (column == 'prioridad') {
			return {
				name: column.toUpperCase(),
				selector: campos => campos[column],
				reorder: true,
				conditionalCellStyles: [

					{
						when: campos => campos.prioridad == "Baja",
						style: {
							backgroundColor: 'rgb(77, 77, 255)',
							color: 'black',
							'&:hover': {
								cursor: 'pointer',
							},
						},
					},
					{
						when: campos => campos.prioridad == "Normal",
						style: {
							backgroundColor: 'rgba(63, 195, 128, 0.9)',
							color: 'black',
							'&:hover': {
								cursor: 'pointer',
							},
						},
					},
					{
						when: campos => campos.prioridad == "Alta",
						style: {
							backgroundColor: 'rgba(248, 148, 6, 0.9)',
							color: 'black',
							'&:hover': {
								cursor: 'pointer',
							},
						},
					},
					{
						when: campos => campos.prioridad == "Muy Alta",
						style: {
							backgroundColor: 'rgba(242, 38, 19, 0.9)',
							color: 'black',
							'&:hover': {
								cursor: 'pointer',
							},
						},
					},
				]
			}
		} else if (column == 'horaSolicitud' || column == 'horaCierre' || column == 'fechaVencimiento') {
			return {
				name: column.toUpperCase(),
				selector: campos => campos[column],
				reorder: true,
				width: '175px',
			}
		} else {
			return {
				name: column.toUpperCase(),
				selector: campos => campos[column],
				reorder: true,

			}
		}
	})


	const customStyles = {
		rows: {
			style: {
				backgroundColor: "rgb(148,146,146)"
			},
			stripedStyle: {
				backgroundColor: "rgb(202,202,202)"
			}
		},
		headRow: {
			style: {
				minHeight: '45px',
			},
		},
		headCells: {
			style: {
				fontSize: '14px',
			},
		},
	};

	return (
		<>
			<div className="container">
				<input
					type="text"
					className="form-control"
					placeholder="Buscar"
					value={buscar}
					onChange={(e) => setBuscar(e.target.value)}
				/>
				<DataTable
					title='Registros Del Archivo'
					columns={columns}
					data={filter}
					pagination
					paginationComponentOptions={paginationComponentOptions}
					theme="solarized"
					striped
					customStyles={customStyles}
				/>

			</div>
		</>
	)
}
