
export const graficasReducer = (estadoInicial , accion)=>{

    switch(accion.type){

        case 'AGREGAR GRAFICA':
            return [ ...estadoInicial, accion.payload ];

        case 'ELIMINAR GRAFICA':

            return estadoInicial.filter(grafica=> grafica.id !== accion.payload);
        
        default:
            return estadoInicial;

    }

}