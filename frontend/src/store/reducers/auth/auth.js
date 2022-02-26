import * as actionTypes from '../../../constants/actionTypes';
import { updateObject } from '../../../constants/utility';

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const loginStart = (state,) => {
    return updateObject(state,
        {
            loading: true
        });
}

const loginSuccess = (state, data) => {
    return updateObject(state,
        {
            loading: false,
            data: data,
            error: null,
        });
}
const loginFail = (state, error) => {
    return updateObject(state,
        {
            loading: false,
            error: error
        });
}
const reducer = (state = initialState, action) => {
    const { data, error } = action;
    switch (action.type) {
        case actionTypes.LOGIN_START: return loginStart(state);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, data);
        case actionTypes.LOGIN_FAIL: return loginFail(state, error);
        default: return state;
    }
}

export default reducer;