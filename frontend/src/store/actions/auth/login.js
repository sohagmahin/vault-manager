import * as actionTypes from '../../../constants/actionTypes';
import { getTodo } from "../api";

const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
}
const loginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        data: data,
    };
}

const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error,
    };
}

export const login = () => {
    return async (dispatch) => {
        dispatch(loginStart());
        try {
            let response = await getTodo();
            dispatch(loginSuccess(response.data));
        } catch (err) {
            dispatch(loginFail({ message: err.message }));
        }
    };
}