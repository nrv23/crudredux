import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers'; // importa el reducer global de la aplicacion


//crear el store

const store = createStore( // toma los parametros
    reducer,
    compose(applyMiddleware(thunk),
        //aqui se va colocar el codigo para ver en el navegador redux dev tools
       typeof window === 'object' && 
            typeof  window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
             window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    // al hacer esa validacion con el operador ternario me aseguro que la aplicacion funcione en un navegador donde
    // redux dev tools no esté instalado
    )//al usar la funcion applyMiddleware se le pasa el parametro thunk
)


export default store;