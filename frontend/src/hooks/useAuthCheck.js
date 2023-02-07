import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../feature/auth/authSlice";

function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let localAuth = localStorage.getItem("auth");
    if (localAuth) {
      let auth = JSON.parse(localAuth);
      console.log(auth);
      if (auth?.accessToken && auth?.userId) {
        dispatch(
          userLoggedIn({ accessToken: auth.accessToken, id: auth.userId })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}

export default useAuthCheck;
