import axios from 'axios';

//crear el cliente axios 

const clienteAxios = axios.create({
    baseURL: 'http://localhost:4000'
});

export default clienteAxios;