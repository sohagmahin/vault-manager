import axios from "axios";
import Axios from "../../services/NetworkService";

// ---->write your api call<----

// testing...
export const postLogin = (username, password) => {
  console.log("postLogin api call");
  console.log(username + password);
  return Axios.post("/user/login", {
    username: username,
    password: password,
  });
};

export const getSingleTodo = () => {
  console.log("getSingleTodo api call");
  return Axios.get("/todos/1");
};
