import React,{Fragment,useEffect} from 'react';
import { obtenerProductosAction } from '../actions/productoActions';
import {useDispatch,useSelector } from 'react-redux';
import Producto from './Producto';
const Productos = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(obtenerProductosAction());
    }, [dispatch])

    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const loading = useSelector(state => state.productos.loading);
    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {
                loading? <p className="text-center">Cargando... </p>: null
            }
            {
                error? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error </p>: null
            }
            {
                productos.length === 0 && !error? <p className="alert alert-info text-center mt-4 p2">No hay Productos</p>:
                <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col"> Nombre </th>
                        <th scope="col"> Precio </th>
                        <th scope="col"> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        productos.map(producto => <Producto key={producto.id} producto={producto} />)
                    }
                </tbody>
            </table>
           
           
             }
        </Fragment>
    );
}
 
export default Productos;