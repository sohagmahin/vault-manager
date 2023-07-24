// external imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../feature/auth/authApi";
import { errorToast } from "../../shared/utility";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");
  const navigate = useNavigate();

  const [register, { data, isLoading, error, isError }] = useRegisterMutation();

  useEffect(() => {
    if (isError) {
      if (error.status === 400) {
        const errObj = error?.data?.errors;
        const keys = Object.keys(errObj);
        setErrToastMsg(error?.data?.errors[keys[0]]?.msg);
      } else if (error.status === 409) {
        setErrToastMsg(error?.data?.message);
      }
    }
    if (data?.message) {
      navigate("/login");
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
    if (type === "name") {
      setName(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      {errToastMsg ? errorToast(errToastMsg, () => setErrToastMsg("")) : null}

      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="w-full shadow-2xl card bg-base-100">
          <div className="card-body w-80">
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
            </div>
            <div className="mt-6 form-control">
              <button
                id="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                REGISTER
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="flex justify-center">
              <button onClick={() => navigate("/login")}>
                Do you want to login?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
