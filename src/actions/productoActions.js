import clienteAxios from '../config/axios';
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    DESCARGAR_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGAR_PRODUCTOS_ERROR,
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_ACTUALIZAR,
    ACTUALIZAR_PRODUCTO_EXITO,
    ACTUALIZAR_PRODUCTO_ERROR,
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


//Funcion para descargar los productos de la bd

export function obtenerProductosAction() {

    return async (dispacth) => {

        try {
            dispacth(descargarProductos(true));

            const {data} = await clienteAxios.get('/productos');
            dispacth(descargarProductosExito(data));

        } catch (error) {
            console.log(error);
            dispacth(descargarProductosError(true));
        }
    }
}

export function eliminarProductoAction (idproducto){

    return async (dispatch) => {

        try {   
            console.log(idproducto)
           
            dispatch(eliminarProducto(idproducto));

            await clienteAxios.delete('/productos/'+idproducto);
            dispatch(eliminarProductoExito());
            
            Swal.fire('Eliminar Producto','Producto Eliminado','success');
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError(true));
        }

    }
}

 const descargarProductos = (estado) => ({
    type: DESCARGAR_PRODUCTOS,
    payload: estado
 });

 const descargarProductosExito = (productos) => ({
    type: DESCARGAR_PRODUCTOS_EXITO,
    payload: productos
 });


 const descargarProductosError = (estado) => ({
    type: DESCARGAR_PRODUCTOS_ERROR,
    payload: estado
 });


 //funcion para eliminar un producto


 const eliminarProducto = (idproducto) => ({
     type: ELIMINAR_PRODUCTO,
     payload: idproducto
 });

 const eliminarProductoExito = (idproducto) => ({
    type: ELIMINAR_PRODUCTO_EXITO
});


const eliminarProductoError = estado => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: estado
});


export function obtenerProductoEditarAction (producto) {

    return (dispatch) => {

        dispatch(obtenerProductoEditar(producto))
    }
}

const obtenerProductoEditar = producto => ({

    type: OBTENER_PRODUCTO_ACTUALIZAR,
    payload: producto
});


export function actualizarProductoAction (producto) {

    return async (dispatch) => {

        try {
            const {data} = await clienteAxios.put(`/productos/${producto.id}`,producto,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(actualizarProductoExito(data));
        } catch (error) {
            console.log(error);
            dispatch(actualizarProductoError(true));
        }

    }
}

//editar registro en la API

const actualizarProductoExito = producto => ({
    type: ACTUALIZAR_PRODUCTO_EXITO,
    payload: producto
})

const actualizarProductoError = estado => ({
    type: ACTUALIZAR_PRODUCTO_ERROR,
    payload: estado
})
