import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../feature/auth/authApi";
import { errorToast, successToast } from "../../shared/utility";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errToastMsg, setErrToastMsg] = useState("");
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const params = useParams();
  const { token, userID } = params;

  useEffect(() => {
    if (!token || !userID) {
      setErrToastMsg("Invalid URL");
    }
  }, [token, userID]);

  const [resetPassword, { data, isLoading, error, isError }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isError) {
      setErrToastMsg(error?.data?.message);
    } else if (data?.message) {
      setSuccessToastMsg(data?.message);
    } else if (data?.errors) {
      //   console.log(data);
    }
  }, [data, error, isError]);

  const onChangeHandler = (event, type) => {
    let value = event.target.value;
    if (type === "new-password") {
      setNewPassword(value);
    } else if (type === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrToastMsg("Password and confirm password does not match");
    } else if (newPassword.length < 6) {
      setErrToastMsg("Password must be at least 6 characters long");
    } else if (userID && token) {
      resetPassword({ userID, token, password: newPassword });
    }
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      {errToastMsg ? errorToast(errToastMsg, () => setErrToastMsg("")) : null}
      {successToastMsg
        ? successToast(successToastMsg, () => setSuccessToastMsg(""))
        : null}
      <div className="flex-col hero-content">
        <div className="w-full shadow-2xl card bg-base-100">
          <div className="card-body w-80">
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={newPassword}
                  onChange={(event) => onChangeHandler(event, "new-password")}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(event) =>
                    onChangeHandler(event, "confirm-password")
                  }
                  className="input input-bordered"
                />
              </div>
            </>

            <div className="mt-6 form-control">
              <button
                id="submit"
                disabled={isLoading}
                className="btn btn-primary"
                onClick={onSubmit}
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
