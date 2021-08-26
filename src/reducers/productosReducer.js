//cada reducer tiene su propio state
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
    ACTUALIZAR_PRODUCTO_ERROR
} from '../types';
const initialState = { // el initial STate debe tener las propiedades que se necesitan
    productos: [], // estos productos son los que vienen del server,
    error: null, // si hay un error cambia su estado 
    loading: false, //bandera para indicar que la aplicacion esta descargando datos
    productoeliminar: null,
    productoeditar: null,
}
//el reducer siempre retorna una funcion que devuelve un state

export default function (state = initialState,action){

    switch(action.type) {   
        
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos,action.payload] // spread operator, tomar copia del array actual de productos y agregar el nuevo producto
            }
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false // si falla al agregar el producto
            }
        case DESCARGAR_PRODUCTOS:
            return {
                ...state,
                loading: true,
                error:false
            }
        case DESCARGAR_PRODUCTOS_EXITO:
            return {
                ...state,
                productos : action.payload,
                loading:false,
                error:false
            }
        case DESCARGAR_PRODUCTOS_ERROR:
            return {
                ...state,
                loading:false,
                error:true
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                loading: false,
                error:false,
                productoeliminar: action.payload
            }
        case ELIMINAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                error: false,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar: null
            }        
        case ELIMINAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                productoeliminar: null
            }
        case OBTENER_PRODUCTO_ACTUALIZAR:
            return {
                ...state,
                productoeditar: action.payload
            }
        case ACTUALIZAR_PRODUCTO_EXITO: 
            return {
                ...state,
                error: false,
                loading: false,
                productoeliminar: null,
                productoeditar: null,
                productos: state.productos.map(producto => producto.id === action.payload.id ? action.payload : producto)
            }
        case ACTUALIZAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
                productoeliminar: null,
                productoeditar: null
            }
        default: 
            return state;
    }
}