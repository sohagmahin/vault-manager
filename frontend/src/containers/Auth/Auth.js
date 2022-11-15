// external imports
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authApi";
import { errorToast, successToast } from "../../shared/utility";

// internal imports
import * as actions from "../../store/actions";
import { AUTH_FAIL, AUTH_SUCCESS } from "../../store/actions/actionTypes";

const AuthMode = Object.freeze({
  SINGIN: "SINGIN",
  SINGUP: "SINGUP",
});

const Auth = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [currentAuthMode, setCurrentAuthMode] = useState(AuthMode.SINGIN);
  const [redirectPath, setRedirectPath] = useState("");
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");

  const navigate = useNavigate();

  const [
    register,
    {
      data: rgData,
      isLoading: rgIsLoading,
      error: rgError,
      isError: rgIsError,
    },
  ] = useRegisterMutation();
  const [login, { loginData, loginIsLoading, loginError, loginIsError }] =
    useLoginMutation();
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
      login({ username: userName, password });
    } else {
      register({ name, username: userName, password });
    }
  };

  useEffect(() => {
    console.log(rgData);
    if (AuthMode.SINGUP === currentAuthMode) {
      if (rgIsError) {
        setErrToastMsg(rgError?.data?.message);
      } else if (rgData?.message === "Signup success") {
        setCurrentAuthMode(AuthMode.SINGIN);
        setSuccessToastMsg("Registration successfull!");
        setErrToastMsg("");
      }
    } else {
      if (loginError) {
        setErrToastMsg(loginIsError?.data.message);
      } else if (loginData?.accessToken && loginData?.id) {
        // setRedirectPath("/");
        setErrToastMsg("");
        navigate("/");
      }
    }
  }, [
    rgData,
    rgError,
    loginData,
    loginError,
    navigate,
    currentAuthMode,
    loginIsError,
    rgIsError,
  ]);

  return (
    <div className="hero min-h-screen bg-base-200">
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
