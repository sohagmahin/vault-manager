import { useSelector } from "react-redux";

function useAuth() {
  let auth = useSelector((state) => state?.auth);
  if (auth?.accessToken && auth?.id) {
    return true;
  } else {
    return false;
  }
}

export default useAuth;
