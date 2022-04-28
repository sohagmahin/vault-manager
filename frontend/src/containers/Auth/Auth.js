// external imports
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

// internal imports
import * as actions from "../../store/actions";
import { AUTH_FAIL, AUTH_SUCCESS } from "../../store/actions/actionTypes";

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
  const [toastMessage, setToastMessage] = useState("");
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
        } else if (result.type === AUTH_FAIL) {
          setToastMessage("Login failed!");
        }
      });
    } else {
      let response = dispatch(actions.singUp(name, userName, password));
      response.then((resut) => {});
    }
  };

  const errorToast = (data) => (
    <div
      id="toast-danger"
      className="flex fixed z-50 justify-center items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{data}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        // onClick={() => dispatch(closeErrorModal())}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  return (
    <div className="hero min-h-screen bg-base-200">
      {redirectPath !== "" ? <Navigate to="/" /> : null}
      {toastMessage ? errorToast(toastMessage) : null}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card w-full shadow-2xl bg-base-100">
          <div className="card-body w-80">
            {AuthMode.SINGUP === currentAuthMode ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => onChangeHandler(event, "name")}
                  className="input input-bordered"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                value={userName}
                onChange={(event) => onChangeHandler(event, "username")}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => onChangeHandler(event, "password")}
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={onSubmit}>
                {AuthMode.SINGIN === currentAuthMode ? "LOGIN" : "REGISTER"}
              </button>
            </div>
            <div class="divider">OR</div>
            <div className="flex justify-center">
              <button onClick={onAuthToggle}>
                Do you want to{" "}
                {AuthMode.SINGIN === currentAuthMode ? "register?" : "login?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
