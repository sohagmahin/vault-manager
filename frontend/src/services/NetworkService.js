import axios from "axios";
import { LOCAL_USER_KEY } from "../constants/keys";
import store from "../store/index";
import { openErrorModal } from "../store/actions/index";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 2500,
});

instance.interceptors.request.use(
    config => {
        let localStorageData = localStorage.getItem(LOCAL_USER_KEY);

        if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            const token = parsedData.accessToken;
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log(config);
        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem(LOCAL_USER_KEY);
            window.location = '/login';
        }
        else if (error.response.status === 404) {
            console.log("erroor -message : ", error.message);
            window.location = '/404';
        } else {
            // handle all error except 401,404
            store.dispatch(openErrorModal(error.message));
            return Promise.reject(error.response);
        }
    });

export default instance;