// external imports
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// internal imports
import * as actions from '../../store/actions';

const Login = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.login());
  }, []);

  return (
    <div >
      Login
    </div>
  );
}

export default Login;