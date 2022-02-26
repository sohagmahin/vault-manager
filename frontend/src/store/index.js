//external imports
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

// internal imports
import reducers from "./reducers";

//thunk middleware is used to intercept actions so as to make API call before dispatching result to reducer
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;