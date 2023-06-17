import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../feature/auth/authApi";
import { errorToast, successToast } from "../../shared/utility";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");
  const navigate = useNavigate();

  const [login, { data, isLoading, error, isError }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      setErrToastMsg(error?.data?.message);
    }
    if (data?.access_token && data?.id) {
      navigate("/");
    }
  }, [data, error, navigate]);

  const onChangeHandler = (event, type) => {
    let value = event.target.value;
    if (type === "email") {
      setEmail(value);
    }

    if (type === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      {errToastMsg ? errorToast(errToastMsg, () => setErrToastMsg("")) : null}

      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="w-full shadow-2xl card bg-base-100">
          <div className="card-body w-80">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => onChangeHandler(event, "email")}
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
            <div className="mt-6 form-control">
              <button
                id="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                LOGIN
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="flex justify-center">
              <button onClick={() => navigate("/register")}>
                Do you want to register?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
