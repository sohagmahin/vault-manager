import { render, screen } from "@testing-library/react";
import {} from "@testing-library/jest-dom";
import Header from "./Header";

describe("Header text and List of element check", () => {
  it("have title text", () => {
    render(<Header />);
    expect(screen.getByText("Vault Manager")).toBeInTheDocument();
  });

  test("Checking list of items", async () => {
    render(<Header />);
    // screen.debug();
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});
