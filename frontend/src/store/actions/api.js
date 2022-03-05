import axios from "axios";
import Axios from "../../services/NetworkService";

// ---->write your api call<----

// testing...
export const postSingIn = (username, password) => {
  console.log("postLogin api call");
  console.log(username + password);
  return Axios.post("/user/login", {
    username: username,
    password: password,
  });
};

export const postSingUp = (name, username, password) => {
  console.log("postLogin api call");
  console.log(username + password);
  return Axios.post("/user/signup", {
    name: name,
    username: username,
    password: password,
  });
};

export const getSingleTodo = () => {
  console.log("getSingleTodo api call");
  return Axios.get("/todos/1");
};
