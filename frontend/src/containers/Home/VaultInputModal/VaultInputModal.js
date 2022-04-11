import React, { useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal/Modal";
import { useDispatch } from "react-redux";
import { addCredential, updateCredential } from "../../../store/actions/index";
import { VaultInputMode } from "../../../shared/utility";

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
    if (VaultInputMode.ADD === selectedVaultMode)
      dispatch(addCredential(title, description, domain, userName, password));
    else if (VaultInputMode.UPDATE === selectedVaultMode) {
      //update dispatch
      dispatch(
        updateCredential(crId, title, description, domain, userName, password)
      );
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
    <div>
      {selectedVaultMode === VaultInputMode.ADD ? "Add" : "Update"} Credential
    </div>
  );

  let dialog = (
    <div className="flex flex-col">
      {labelText}
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => onChangeHandler(event, "title")}
          // onChange={onChangeHandler}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => onChangeHandler(event, "description")}
        />

        <input
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={(event) => onChangeHandler(event, "domain")}
        />
        <input
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={(event) => onChangeHandler(event, "username")}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(event) => onChangeHandler(event, "password")}
        />
        <input
          type="submit"
          value={selectedVaultMode === VaultInputMode.ADD ? "Add" : "Update"}
        />
      </form>
      <button onClick={() => setShowModal(false)}>Cancel</button>
    </div>
  );
  return (
    <>
      {/* {dialog} */}
      <Modal show={showModal}> {dialog}</Modal>
    </>
  );
}

export default VaultInputModal;
