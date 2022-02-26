import axios from "axios";
import Axios from "../../services/NetworkService";

// ---->write your api call<----

// testing...
export const getTodo = () => {
    console.log("getTodo api call")
    return Axios.get('/todos/');
}

export const getSingleTodo = () => {
    console.log("getSingleTodo api call")
    return Axios.get('/todos/1');
}