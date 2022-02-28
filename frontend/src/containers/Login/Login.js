// external imports
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// internal imports
import * as actions from "../../store/actions";

const Login = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandler = (event, type) => {
    let value = event.target.value;
    if (type === "username") {
      setUserName(value);
    }

    if (type === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // To-do
    console.log(userName + password);
    dispatch(actions.login(userName, password));
  };

  return (
    <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(event) => onChangeHandler(event, "username")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => onChangeHandler(event, "password")}
        />
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
