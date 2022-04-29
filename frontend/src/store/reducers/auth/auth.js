import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const authStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const authSuccess = (state, data) => {
  return updateObject(state, {
    loading: false,
    data: data,
    error: null,
  });
};
const authFail = (state, error) => {
  return updateObject(state, {
    loading: false,
    error: error,
  });
};
const reducer = (state = initialState, action) => {
  const { data, error } = action;
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, data);
    case actionTypes.AUTH_FAIL:
      return authFail(state, error);
    default:
      return state;
  }
};

export default reducer;
