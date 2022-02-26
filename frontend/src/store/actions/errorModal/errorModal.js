import * as actionTypes from '../../../constants/actionTypes';

export const openErrorModal = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.OPEN_ERROR_MODAL,
            data
        })
    };
}
export const closeErrorModal = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.CLOSE_ERROR_MODAL,
        })
    };
}
