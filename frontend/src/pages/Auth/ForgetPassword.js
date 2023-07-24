import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../feature/auth/authApi";
import { errorToast, successToast } from "../../shared/utility";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const navigate = useNavigate();

  const [forgetPassword, { data, isLoading, error, isError }] =
    useForgetPasswordMutation();

  useEffect(() => {
    if (isError) {
      if (error?.data?.errors) {
        let keys = Object.keys(error?.data?.errors);

        let value = error?.data?.errors[keys[0]];
        setErrToastMsg(value?.msg);
      } else if (error?.data?.message) {
        setErrToastMsg(error?.data?.message);
      }
    } else if (data?.message) {
      setSuccessToastMsg(data?.message);
    }

    console.log(error);
  }, [data, error, isError]);

  const onChangeHandler = (event, type) => {
    let value = event.target.value;
    if (type === "email") {
      setEmail(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    forgetPassword({ email: email });
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      {errToastMsg ? errorToast(errToastMsg, () => setErrToastMsg("")) : null}
      {successToastMsg
        ? successToast(successToastMsg, () => setSuccessToastMsg(""))
        : null}
      <div className="flex-col hero-content">
        <label className="text-lg font-medium">Forget Password</label>
        <div className="w-full shadow-2xl card bg-base-100">
          <div className="card-body w-80">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter your mail</span>
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

            <div className="mt-6 form-control">
              <button
                id="submit"
                disabled={isLoading}
                className="btn btn-primary"
                onClick={onSubmit}
              >
                SEND LINK
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="flex justify-center">
              <button onClick={() => navigate("/login")}>Back to Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
