import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_ID } from "../../constants/keys";
import { successToast, errorToast } from "../../shared/utility";
import { fetchProfile, updateProfile } from "../../store/actions";
import { PROFILE_FAIL, PROFILE_SUCCESS } from "../../store/actions/actionTypes";

function ProfilePage() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");
  const dispatch = useDispatch();

  const onChangeHandler = (event, type) => {
    let value = event.target.value;
    if (type === "username") {
      setUserName(value);
    }

    if (type === "name") {
      setName(value);
    }
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem(USER_ID));
    if (!id) return;
    dispatch(fetchProfile(id));
    return () => {
      //   second
    };
  }, []);

  const profileData = useSelector((state) => state.profile.data);
  const isLoading = useSelector((state) => state.profile.loading);
  const err = useSelector((state) => state.profile.error);
  useEffect(() => {
    if (!profileData) return;
    setName(profileData.name);
    setUserName(profileData.username);
    console.log(profileData);
  }, [profileData]);

  if (isLoading) return <>Loading...</>;
  if (err) return <>Something went wrong!!</>;

  const onSubmit = () => {
    const id = JSON.parse(localStorage.getItem(USER_ID));
    const updatedData = {
      name: name,
      username: userName,
    };
    let response = dispatch(updateProfile(id, updatedData));
    response.then((result) => {
      if (result.type == PROFILE_SUCCESS) {
        setSuccessToastMsg("Profile has been updated!");
        setErrToastMsg("");
      } else if (result.type === PROFILE_FAIL) {
        setErrToastMsg("Update failed!");
        setSuccessToastMsg("");
      }
    });
  };

  return (
    <div className="hero h-full fixed bg-base-200">
      {successToastMsg
        ? successToast(successToastMsg, () => setSuccessToastMsg(""))
        : errToastMsg
        ? errorToast(errToastMsg, () => setErrToastMsg(""))
        : null}
      <div className="hero-content flex-col">
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
            <div className="form-control mt-6">
              <button
                id="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                SAVE PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
