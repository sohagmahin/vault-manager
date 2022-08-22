import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const start = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const success = (state, data) => {
  return updateObject(state, {
    loading: false,
    data: data,
    error: null,
  });
};
const fail = (state, error) => {
  return updateObject(state, {
    loading: false,
    error: error,
  });
};
const reducer = (state = initialState, action) => {
  const { data, error } = action;
  switch (action.type) {
    case actionTypes.PROFILE_START:
      return start(state);
    case actionTypes.PROFILE_SUCCESS:
      return success(state, data);
    case actionTypes.PROFILE_FAIL:
      return fail(state, error);
    default:
      return state;
  }
};

export default reducer;
