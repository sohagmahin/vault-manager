import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../test-utils";
import Card from "./Card";

describe("Vaul Card Test", () => {
  test("passing data and check it rendered with those data or not", async () => {
    const data = {
      id: "123456",
      title: "Facebook Meta",
      description: "Business account credential",
      domain: "www.facebook.com",
      username: "sohag_fb",
      password: "sohag@fb_tbqz",
      // setSuccessToastMsg: any;
      // setErrToastMsg: any;
    };
    renderWithRedux(<Card {...data} />);
    expect(screen.getByText(/Facebook Meta/)).toBeInTheDocument();
    expect(screen.getByText(/Business account credential/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/www.facebook.com/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/sohag_fb/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/sohag@fb_tbqz/)).toBeInTheDocument();
  });
});
