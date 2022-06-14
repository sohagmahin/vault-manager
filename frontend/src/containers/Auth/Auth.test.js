import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "../../store/reducers";
import { render, screen, cleanup } from "@testing-library/react";
import Auth from "./Auth";
import userEvent from "@testing-library/user-event";

function renderWithRedux(
  component,
  { initialState, store = createStore(reducers, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

describe("authentication page", () => {
  afterEach(cleanup);
  it("Have login mode", async () => {
    renderWithRedux(<Auth />);

    expect(screen.getByText(/Forgot password/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
    expect(screen.getByText(/Username/)).toBeInTheDocument();
    expect(screen.queryByText(/Name/)).toBeNull();

    expect(
      await screen.findByRole("button", { name: "LOGIN" })
    ).toBeInTheDocument();
  });

  it("Have Register mode", async () => {
    renderWithRedux(<Auth />);
    expect(screen.queryByText("Name")).toBeNull();
    await userEvent.click(screen.getByText(/Do you want to register?/));
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText(/Do you want to login?/)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "REGISTER" })
    ).toBeInTheDocument();
  });
});
