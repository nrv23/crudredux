import React,{useState} from 'react';
import { crearProductoAction } from '../actions/productoActions'; // las funciones de los actions son las que ejecutan
import {useDispatch,useSelector } from 'react-redux';
import { mostrarAlertaAction,ocultarAlertaAction } from '../actions/alertaAction';
// el dispatch para conectarse con el reducer

//El dispatch ejecuta la funcion del action que a su vez, ejecuta otra funcion local 

// con el useSelector se puede leer el state del store
const NuevoProducto = ({history}) => {
    //los componentes al estar dentro del router, por el props viene el history para redireccionar

    const [state, setstate] = useState({
        nombre: '',
        precio: ''
    });

    const {nombre, precio} = state;

  //  const {productos:{error,loading}} = useSelector(state => state); // el parametro state es el state global del store y como es una funcion
    // retora ese mismo state

    const {alerta} =  useSelector(state => state.alerta);
    const dispatch = useDispatch(); // esta funcion ejecuta las funciones del action.
    // Es una funcion que toma como párametro una funcion del action

    //funcion para agregar el producto usando el action 

    const actualizarState = ({target: {value,name}}) => {
        setstate({
            ...state,
            [name]: value
        })
    }

    const agregarProducto = obj => dispatch(crearProductoAction(obj));

    const submitNuevoProducto = e => {
        e.preventDefault(); 

        //validar formulario

        if(nombre.trim().length === 0 || precio.toString().trim().length === 0) {
            dispatch(mostrarAlertaAction({
                msg: 'Todos los campos son requeridos',
                classes: 'alert alert-danger text-center p3 mt-4'
            }))
            return;
        }
 
        //revisar que no hay errores

        //agregar el nuevo producto
        agregarProducto(state);
        dispatch(ocultarAlertaAction());
        history.push('/');// redireccionar a la pagina principal
    }
    return (

        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Producto
                        </h2>
                        {alerta ? <p className={`${alerta.classes}`}>{alerta.msg}</p>: null}
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    id="" 
                                    className="form-control" 
                                    placeholder="Nombre Producto"
                                    onChange={e=> actualizarState(e)}
                                    value={nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number" 
                                    name="precio" 
                                    id="" 
                                    className="form-control" 
                                    placeholder="Precio Producto"
                                    onChange={e=> actualizarState(e)}
                                    value={precio}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                               Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;