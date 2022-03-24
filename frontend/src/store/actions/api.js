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

export const postCredential = (
  title,
  description,
  domain,
  username,
  password
) => {
  console.log("postCredential api calling...");
  console.log(title + description + domain + username + password);
  return Axios.post("/passmanager", {
    title,
    description,
    domain,
    username,
    password,
  });
};

export const getCredentials = () => {
  console.log("getAllCredential api calling...");
  return Axios.get("/passmanager/all");
};

// http://localhost:3001/passmanager/
