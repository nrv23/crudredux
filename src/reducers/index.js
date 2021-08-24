import { combineReducers} from 'redux';
import productosReducer from './productosReducer'

// productosReducer devuelve un objeto que es el state de productos
//los reducers de cada parte de la aplicacion se combinan para tener un solo reducer global de la aplicacion 

export default combineReducers({ // este objeto combina cada reducer 
    productos: productosReducer
}); // la aplicacion con redux solo permite genera un solo combineReducer