// external imports
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { errorToast, successToast } from "../../shared/utility";

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
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");

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
          setErrToastMsg("");
        } else if (result.type === AUTH_FAIL) {
          setErrToastMsg("Login failed!");
        }
      });
    } else {
      let response = dispatch(actions.singUp(name, userName, password));
      response.then((result) => {
        if (result.type === AUTH_SUCCESS) {
          setCurrentAuthMode(AuthMode.SINGIN);
          setSuccessToastMsg("Registration successfull!");
          setErrToastMsg("");
        } else if (result.type === AUTH_FAIL) {
          setErrToastMsg("Registration failed!");
          setSuccessToastMsg("");
        }
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      {redirectPath !== "" ? <Navigate to="/" /> : null}
      {currentAuthMode === AuthMode.SINGIN
        ? successToastMsg
          ? successToast(successToastMsg, () => setSuccessToastMsg(""))
          : errToastMsg
          ? errorToast(errToastMsg, () => setErrToastMsg(""))
          : null
        : null}

      {currentAuthMode === AuthMode.SINGUP
        ? successToastMsg
          ? successToast(successToastMsg, () => setSuccessToastMsg(""))
          : errToastMsg
          ? errorToast(errToastMsg, () => setErrToastMsg(""))
          : null
        : null}
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
                id="username"
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
                id="password"
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
              <button
                id="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                {AuthMode.SINGIN === currentAuthMode ? "LOGIN" : "REGISTER"}
              </button>
            </div>
            <div className="divider">OR</div>
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
