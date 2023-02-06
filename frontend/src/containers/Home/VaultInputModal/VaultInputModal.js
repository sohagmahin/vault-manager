import React, { useEffect, useState } from "react";
import { errorToast, VaultInputMode } from "../../../shared/utility";
import CustomInput from "../../../components/UI/Input/CustomInput";
import { successToast } from "../../../shared/utility";
import {
  useAddVaultMutation,
  useUpdateVaultMutation,
} from "../../../feature/vault/vaultApi";

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

  const [
    addVault,
    { data: addedVault, isLoading: isAddLoading, error: errorAddVault },
  ] = useAddVaultMutation();
  const [
    updateVault,
    { data: updatedVault, isLoading: isUpdateLoading, error: errorUpdateVault },
  ] = useUpdateVaultMutation();

  useEffect(() => {
    let error = errorAddVault ?? errorUpdateVault ?? undefined;
    let data = addedVault ?? updatedVault ?? undefined;

    if (data) {
      setSuccessToastMsg(data?.message);
      setErrToastMsg("");
    }

    if (error) {
      if (error?.data?.errors) {
        let objectKey = Object.keys(error.data.errors)[0];
        let message = error.data.errors[objectKey].msg;
        setErrToastMsg(message);
      } else {
        setErrToastMsg(error?.data?.data);
      }

      setSuccessToastMsg("");
    }
  }, [errorAddVault, errorUpdateVault, addedVault, updatedVault]);

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
    if (VaultInputMode.ADD === selectedVaultMode) {
      let payload = {
        title,
        description,
        domain,
        username: userName,
        password,
      };
      addVault(payload);
    } else if (VaultInputMode.UPDATE === selectedVaultMode) {
      let payload = {
        title,
        description,
        domain,
        username: userName,
        password,
      };
      updateVault(crId, payload);
    }
  };

  useEffect(() => {
    if (!updateData) return;

    //filled up the form
    setCrId(updateData._id);
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
          className="mt-4 btn btn-primary"
          value={
            isAddLoading || isUpdateLoading
              ? "loading..."
              : selectedVaultMode === VaultInputMode.ADD
              ? "Add"
              : "Update"
          }
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
        <div className="relative modal-box">
          <label
            onClick={() => setShowModal(false)}
            for="my-modal-3"
            className="absolute btn btn-sm btn-circle right-2 top-2"
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
