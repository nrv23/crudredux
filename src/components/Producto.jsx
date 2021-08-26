import React from 'react'
import { useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { eliminarProductoAction,obtenerProductoEditarAction } from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {

    const {id,nombre, precio} = producto;
    const dispatch = useDispatch();
    const history = useHistory();
    const eliminarProducto = () => dispatch(eliminarProductoAction(id));

    const confirmarEliminarProducto = () => {

        Swal.fire({
            title: 'Está seguro?',
            text: "Si elimina el producto no volverá a estar habilitado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarProducto()

            }
          })
    }

    const redireccionConHook = producto => {
        dispatch(obtenerProductoEditarAction(producto));
        history.push(`/productos/editar/${producto.id}`);
    }
    //en vez de usar Link para redireccionar, se usa el hook useHistory para usar la funcion push y redireccionar
    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">

                <button type="button" className="btn btn-primary mr-2"onClick={() =>redireccionConHook(producto)} >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmarEliminarProducto}
                >
                    Eliminar
                </button>
            </td>
        </tr> 
    );
}
 
export default Producto;