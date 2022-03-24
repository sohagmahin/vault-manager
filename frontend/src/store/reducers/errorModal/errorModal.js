import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from ".././../../shared/utility";

const initialState = {
  data: null,
};

const openModal = (state, data) => {
  return updateObject(state, { data });
};

const closeModal = (state) => {
  return updateObject(state, {
    data: null,
  });
};
const reducer = (state = initialState, action) => {
  const { data } = action;
  switch (action.type) {
    case actionTypes.OPEN_ERROR_MODAL:
      return openModal(state, data);
    case actionTypes.CLOSE_ERROR_MODAL:
      return closeModal(state);
    default:
      return state;
  }
};

export default reducer;
