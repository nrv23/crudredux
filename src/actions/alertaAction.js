import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';


export function mostrarAlertaAction(alerta) {
    return dispatch => {
        dispatch(mostrarAlertaError(alerta))
    }
}

export function ocultarAlertaAction () {
    return dispatch => {
        dispatch(ocultarAlertaError());
    }
}


const mostrarAlertaError = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});


const ocultarAlertaError = () => ({
    type: OCULTAR_ALERTA
})