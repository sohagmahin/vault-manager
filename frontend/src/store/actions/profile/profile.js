import * as actionTypes from "../actionTypes";
import { getProfile, putProfile } from "../api";

const start = () => {
  return {
    type: actionTypes.PROFILE_START,
  };
};
const success = (data) => {
  return {
    type: actionTypes.PROFILE_SUCCESS,
    data: data,
  };
};

const fail = (error) => {
  return {
    type: actionTypes.PROFILE_FAIL,
    error: error,
  };
};

export const fetchProfile = (id) => {
  return async (dispatch) => {
    dispatch(start());
    try {
      console.log("user id : " + id);
      let response = await getProfile(id);
      console.log(response);
      return dispatch(success(response.data.data));
    } catch (err) {
      return dispatch(fail({ message: err.message }));
    }
  };
};

export const updateProfile = (id, data) => {
  return async (dispatch) => {
    dispatch(start());
    try {
      let response = await putProfile(id, data);
      return dispatch(success(response.data.data));
    } catch (err) {
      return dispatch(fail({ message: err.message }));
    }
  };
};
