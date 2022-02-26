// external imports
import { combineReducers } from 'redux';

// internal imports
import authReducer from './auth/auth';

// error modal reducer
import errorModalReducer from './errorModal/errorModal';


const reducers = combineReducers({
    auth: authReducer,
    errorModal: errorModalReducer,
});

export default reducers;