// external imports
import { combineReducers } from "redux";

// internal imports
import authReducer from "./auth/auth";
import vaultReducer from "./vault/vault";
import profileReducer from "./profile/profile";

// error modal reducer
import errorModalReducer from "./errorModal/errorModal";

const reducers = combineReducers({
  auth: authReducer,
  vault: vaultReducer,
  profile: profileReducer,
  errorModal: errorModalReducer,
});

export default reducers;
