import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/keys";
import store from "../store/index";
import { openErrorModal } from "../store/actions/index";
import { getLocalData } from "./localServices";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 2500,
});

instance.interceptors.request.use(
  (config) => {
    let localStorageData = getLocalData(LOCAL_STORAGE_KEY);

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      console.log("Interceptor" + parsedData.access_token);
      const token = parsedData.access_token;
      config.headers.Authorization = token;
    }
    // console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   localStorage.removeItem(LOCAL_USER_KEY);
    //   window.location = "/login";
    // } else if (error.response.status === 404) {
    //   console.log("erroor -message : ", error.message);
    //   window.location = "/404";
    // } else {
    //   // handle all error except 401,404
    //   store.dispatch(openErrorModal(error.message));
    //   return Promise.reject(error.response);
    // }
  }
);

export default instance;
