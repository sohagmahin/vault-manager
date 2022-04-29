import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCredential,
  getAllCredentials,
  updateCredential,
} from "../../../store/actions/index";
import { errorToast, VaultInputMode } from "../../../shared/utility";
import CustomInput from "../../../components/UI/Input/CustomInput";
import {
  TEMP_VAULT_SUCCESS,
  VAULT_FAIL,
} from "../../../store/actions/actionTypes";
import { successToast } from "../../../shared/utility";

function VaultInputModal({
  showModal,
  setShowModal,
  selectedVaultMode,
  updateData,
}) {
  const [crId, setCrId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");

  const dispatch = useDispatch();
  const onChangeHandler = (event, type) => {
    // event.preventDefault();
    let value = event.target.value;
    switch (type) {
      case "title":
        setTitle(value);
        console.log(value);
        break;

      case "description":
        setDescription(value);
        break;

      case "domain":
        setDomain(value);
        break;

      case "username":
        setUserName(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("on submit clicked!!");
    if (VaultInputMode.ADD === selectedVaultMode) {
      let response = dispatch(
        addCredential(title, description, domain, userName, password)
      );
      response.then((result) => {
        if (result.type === TEMP_VAULT_SUCCESS) {
          //  refetch the all data
          setSuccessToastMsg("Add Successull!");
          dispatch(getAllCredentials());
        } else if (result.type === VAULT_FAIL) {
          setErrToastMsg("Add failed!");
        }
      });
    } else if (VaultInputMode.UPDATE === selectedVaultMode) {
      //update dispatch
      let response = dispatch(
        updateCredential(crId, title, description, domain, userName, password)
      );
      response.then((result) => {
        if (result.type === TEMP_VAULT_SUCCESS) {
          //  refetch the all data
          setSuccessToastMsg("Update succefull!");
          dispatch(getAllCredentials());
        } else if (result.type === VAULT_FAIL) {
          setErrToastMsg("Update failed!");
        }
      });
    }
  };

  useEffect(() => {
    if (!updateData) return;

    console.log({ ...updateData });
    //filled up the form
    setCrId(updateData.id);
    setTitle(updateData.title);
    setDescription(updateData.description);
    setDomain(updateData.domain);
    setUserName(updateData.username);
    setPassword(updateData.password);
  }, [updateData]);

  let labelText = (
    <h3 className="text-lg font-bold">
      {selectedVaultMode === VaultInputMode.ADD ? "Add" : "Update"} Credential
    </h3>
  );

  let dialog = (
    <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <CustomInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => onChangeHandler(event, "title")}
          // onChange={onChangeHandler}
        />

        <CustomInput
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => onChangeHandler(event, "description")}
        />

        <CustomInput
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={(event) => onChangeHandler(event, "domain")}
        />
        <CustomInput
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={(event) => onChangeHandler(event, "username")}
        />
        <CustomInput
          type="text"
          placeholder="Password"
          value={password}
          onChange={(event) => onChangeHandler(event, "password")}
        />

        <input
          type="submit"
          className="btn btn-primary mt-4"
          value={selectedVaultMode === VaultInputMode.ADD ? "Add" : "Update"}
        />
      </form>
    </div>
  );
  return (
    <>
      {/* {dialog} */}
      {/* <Modal show={showModal}> {dialog}</Modal> */}
      <div
        className={
          showModal
            ? "modal modal-open transition duration-150 ease-in-out"
            : "opacity-0 transition duration-150 ease-in-out"
        }
      >
        {successToastMsg
          ? successToast(successToastMsg, () => setSuccessToastMsg(""))
          : null}
        {errToastMsg ? errorToast(errToastMsg, () => setErrToastMsg("")) : null}
        <div className="modal-box relative">
          <label
            onClick={() => setShowModal(false)}
            for="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {labelText}
          <p>{dialog}</p>
        </div>
      </div>
    </>
  );
}

export default VaultInputModal;
