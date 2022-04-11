// external imports
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

// internal imports
import * as actions from "../../store/actions";
import { AUTH_SUCCESS } from "../../store/actions/actionTypes";

const AuthMode = Object.freeze({
  SINGIN: "SINGIN",
  SINGUP: "SINGUP",
});

const Auth = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [currentAuthMode, setCurrentAuthMode] = useState(AuthMode.SINGIN);
  const [redirectPath, setRedirectPath] = useState("");
  const onChangeHandler = (event, type) => {
    let value = event.target.value;
    if (type === "username") {
      setUserName(value);
    }

    if (type === "password") {
      setPassword(value);
    }
    if (type === "name") {
      setName(value);
    }
  };

  const onAuthToggle = () => {
    AuthMode.SINGIN === currentAuthMode
      ? setCurrentAuthMode(AuthMode.SINGUP)
      : setCurrentAuthMode(AuthMode.SINGIN);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(userName + password);
    if (AuthMode.SINGIN === currentAuthMode) {
      let response = dispatch(actions.singIn(userName, password));
      response.then((result) => {
        if (result.type === AUTH_SUCCESS) {
          // window.location = "/";
          setRedirectPath("/");
        }
      });
    } else {
      let response = dispatch(actions.singUp(name, userName, password));
      response.then((resut) => {});
    }
  };

  return (
    <div className="flex flex-col">
      {redirectPath !== "" ? <Navigate to="/" /> : null}
      <form className="flex flex-col" onSubmit={onSubmit}>
        {AuthMode.SINGUP === currentAuthMode ? (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => onChangeHandler(event, "name")}
          />
        ) : (
          <></>
        )}
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(event) => onChangeHandler(event, "username")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => onChangeHandler(event, "password")}
        />
        <button>
          {AuthMode.SINGIN === currentAuthMode ? "Sign In" : "Sign Up"}
        </button>
        <button onClick={onAuthToggle}>
          Switch to{" "}
          {AuthMode.SINGIN === currentAuthMode ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
