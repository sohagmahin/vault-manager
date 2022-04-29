import { updateObject } from "../../../shared/utility";
import * as actionTypes from "../../actions/actionTypes";

const initState = {
  loading: false,
  tempData: null,
  data: [],
  error: null,
};

const vaultStart = (state) => {
  return updateObject(state, { loading: true });
};

const vaultSuccess = (state, data) => {
  return updateObject(state, { loading: false, data });
};

const tempVaultSuccess = (state, tempData) => {
  return updateObject(state, { tempData });
};

const vaultFail = (state, error) => {
  return updateObject(state, { loading: false, error });
};

const reducer = (state = initState, actions) => {
  const { type, data, tempData, error } = actions;
  switch (type) {
    case actionTypes.VAULT_START:
      return vaultStart(state);

    case actionTypes.VAULT_SUCCESS:
      return vaultSuccess(state, data);

    case actionTypes.TEMP_VAULT_SUCCESS:
      return tempVaultSuccess(state, tempData);

    case actionTypes.VAULT_FAIL:
      return vaultFail(state, error);

    default:
      return state;
  }
};

export default reducer;
