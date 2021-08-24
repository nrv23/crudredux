//cada reducer tiene su propio state
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';
const initialState = { // el initial STate debe tener las propiedades que se necesitan
    productos: [], // estos productos son los que vienen del server,
    error: null, // si hay un error cambia su estado 
    loading: false, //bandera para indicar que la aplicacion esta descargando datos
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
        default: 
            return state;
    }
}