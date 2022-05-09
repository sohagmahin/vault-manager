import axios from "axios";
import store from "../store/index";
import { openErrorModal } from "../store/actions/index";
import { getLocalData } from "./localServices";
import { LOCAL_AUTH_KEY } from "../constants/index";

const baseURL = process.env.REACT_APP_HOST || "http://localhost:3001";

const instance = axios.create({
  baseURL: baseURL,
  // timeout: 2500,
});

export const reqInterceptor = instance.interceptors.request.use(
  (config) => {
    let localStorageData = getLocalData(LOCAL_AUTH_KEY);

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

export const resInterceptor = instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(LOCAL_AUTH_KEY);
      window.location = "/auth";
    }
    if (error.response.status === 500) {
      localStorage.removeItem(LOCAL_AUTH_KEY);
      store.dispatch(openErrorModal(error.message));
    }
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
