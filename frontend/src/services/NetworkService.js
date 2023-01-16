import axios from "axios";
import store from "../store/index";
import { openErrorModal } from "../store/actions/index";
import { TOKEN } from "../constants/keys";

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = "http://20.193.139.57";

const instance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: baseURL,
  // baseURL: "",
  // timeout: 2500,
});

export const reqInterceptor = instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem(TOKEN);

    if (token) {
      // const parsedData = JSON.parse(localStorageData);
      console.log("token : " + token);
      // const token = parsedData.access_token;
      config.headers.Authorization = JSON.parse(token);
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
      // localStorage.removeItem(TOKEN);
      localStorage.clear();
      window.location = "/auth";
    }
    if (error.response.status === 500) {
      // localStorage.removeItem(TOKEN);
      localStorage.clear();
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
