import * as actionTypes from "../actionTypes";
import { postCredential, putCredential, getCredentials } from "../api";
const vaultStart = () => {
  return {
    type: actionTypes.VAULT_START,
  };
};

const vaultSuccess = (data) => {
  return {
    type: actionTypes.VAULT_SUCCESS,
    data: data,
  };
};

const tempVaultSuccess = (data) => {
  return {
    type: actionTypes.TEMP_VAULT_SUCCESS,
    tempData: data,
  };
};

const vaultFail = (error) => {
  return {
    type: actionTypes.VAULT_FAIL,
    error: error,
  };
};

export const addCredential = (
  title,
  description,
  domain,
  username,
  password
) => {
  return async (dispatch) => {
    dispatch(vaultStart());
    try {
      let response = await postCredential(
        title,
        description,
        domain,
        username,
        password
      );
      console.log(response.data);
      return dispatch(tempVaultSuccess(response.data));
    } catch (err) {
      return dispatch(vaultFail({ message: err.message }));
    }
  };
};

export const getAllCredentials = () => {
  return async (dispatch) => {
    dispatch(vaultStart());
    try {
      let response = await getCredentials();
      console.log(response.data);
      return dispatch(vaultSuccess(response.data.data));
    } catch (err) {
      return dispatch(vaultFail({ message: err.message }));
    }
  };
};

export const updateCredential = (
  id,
  title,
  description,
  domain,
  username,
  password
) => {
  return async (dispatch) => {
    dispatch(vaultStart());
    try {
      let response = await putCredential(
        id,
        title,
        description,
        domain,
        username,
        password
      );
      console.log(response.data);
      return dispatch(tempVaultSuccess(response.data));
    } catch (err) {
      return dispatch(vaultFail({ message: err.message }));
    }
  };
};
