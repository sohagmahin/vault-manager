import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import { useDispatch } from "react-redux";
import { addCredential } from "../../../store/actions/index";

function CreateModal({ showModal, setShowModal }) {
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
    dispatch(addCredential(title, description, domain, userName, password));
  };

  let dialog = (
    <div className="flex flex-col">
      <div>Add Your Credential</div>
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
        <input type="submit" value="Add" />
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

export default CreateModal;
