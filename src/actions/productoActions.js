import clienteAxios from '../config/axios';
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';
import Swal from 'sweetalert2';

//funcion para crear nuevos productos


export function crearProductoAction (obj) {
    
    return async (dispatch) => { // usa el parametro de dispatch para ejecutar la funcion local que ejecuta el case del reducer
        
        dispatch(agregarProducto())

        try {

            const respuesta = await clienteAxios.post('/productos',obj,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(agregarProductoExito(respuesta.data));
            Swal.fire('Agregar Producto','Se ha agregado un nuevo producto','success');
        } catch (error) {
            console.log(error)
            dispatch(agregarProductoError(true));
            Swal.fire('Agregar Producto','Hubo un error','error');
        }
    }
}

const agregarProducto = () => ({ // esta funcion envia el type que va ejecutar el case del reducer
    type: AGREGAR_PRODUCTO,
    payload: true
});

const agregarProductoExito = producto => ({ // esta funcion envia el type que va ejecutar el case del reducer
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = estado => ({ // esta funcion envia el type que va ejecutar el case del reducer
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});