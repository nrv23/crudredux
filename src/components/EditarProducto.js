import React,{createRef,useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actualizarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const productoEditar = useSelector(state =>  state.productos.productoeditar);
    const error = useSelector(state =>  state.productos.error);
    const [producto, guardarProducto] = useState({
        nombre:'',
        precio: '',
        id: ''
    });

    const {nombre, precio} = producto;
    const precioRef = createRef();
    const nombreRef = createRef();

    useEffect(() => {
        console.log(productoEditar)
        if(productoEditar) {
            guardarProducto({
                nombre: productoEditar.nombre,
                precio: productoEditar.precio,
                id: productoEditar.id
            })
        }
    }, [productoEditar])

    const editarProducto = e => {
        e.preventDefault();

        dispatch(actualizarProductoAction(producto));
        history.push('/');
       
    }

    const onChangeForm = ({target:{name,value}}) => {
        guardarProducto({
            ...producto,
            [name]: value
        })
    }


    return ( 

        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form 
                            onSubmit={editarProducto}
                        >
                            {
                                error? <p className="alert alert-danger text-center p2 mt-4">Hubo un error</p> : null
                            }
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    name="nombre"
                                    id="" 
                                    className="form-control" 
                                    placeholder="Nombre Producto"
                                    defaultValue={nombre}
                                    ref={nombreRef}
                                    onChange={onChangeForm}
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
                                    defaultValue={precio}
                                    ref={precioRef}
                                    onChange={onChangeForm}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;