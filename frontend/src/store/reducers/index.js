// external imports
import { combineReducers } from "redux";

// internal imports
import authReducer from "./auth/auth";
import vaultReducer from "./vault/vault";

// error modal reducer
import errorModalReducer from "./errorModal/errorModal";

const reducers = combineReducers({
  auth: authReducer,
  vault: vaultReducer,
  errorModal: errorModalReducer,
});

export default reducers;
