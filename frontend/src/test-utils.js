import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/reducers";
import { render } from "@testing-library/react";

export const renderWithRedux = (
  component,
  { initialState, store = createStore(reducers, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};
