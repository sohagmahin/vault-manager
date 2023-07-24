import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { USER_ID } from "../../constants/keys";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../feature/profile/profileApi";
import { successToast, errorToast } from "../../shared/utility";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");

  const id = useSelector((state) => state?.auth?.id);
  const { data, error, isLoading } = useGetProfileQuery(id) || {};
  const { data: profileData, message } = data || {};

  const [
    updateProfile,
    { data: updatedData, isLoading: isUpdateLoading, error: errorUpdate },
  ] = useUpdateProfileMutation() || {};

  const onChangeHandler = (event, type) => {
    let value = event.target.value;
    if (type === "email") {
      setEmail(value);
    }

    if (type === "name") {
      setName(value);
    }
  };

  useEffect(() => {
    if (updatedData) {
      setSuccessToastMsg(updatedData?.message);
      setErrToastMsg("");
    }
    if (errorUpdate) {
      setErrToastMsg(errorUpdate?.data?.message);
      setSuccessToastMsg("");
    }
  }, [updatedData, errorUpdate]);

  useEffect(() => {
    if (!profileData) return;
    setName(profileData?.name);
    setEmail(profileData?.email);
    console.log(profileData);
  }, [profileData]);

  if (isLoading) return <>Loading...</>;
  if (error) return <div>Something went wrong!!</div>;

  const onSubmit = () => {
    const updatedData = {
      name: name,
      email,
    };
    updateProfile({ id, data: updatedData });
  };

  return (
    <div className="fixed h-full hero bg-base-200">
      {successToastMsg
        ? successToast(successToastMsg, () => setSuccessToastMsg(""))
        : errToastMsg
        ? errorToast(errToastMsg, () => setErrToastMsg(""))
        : null}
      <div className="flex-col hero-content">
        <div className="card w-full shadow-2xl bg-base-100 top-[-60px]">
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
                placeholder="email"
                value={email}
                onChange={(event) => onChangeHandler(event, "email")}
                className="input input-bordered"
              />
            </div>
            <div className="mt-6 form-control">
              <button
                id="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                {isUpdateLoading ? "Loading..." : "SAVE PROFILE"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
