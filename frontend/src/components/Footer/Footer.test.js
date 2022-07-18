import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
describe("Footer components: Checking req. text are in Footer", () => {
  it("check copyright text in footer", () => {
    render(<Footer />);
    const footerText = screen.getByText(
      /Copyright © 2022 - All right reserved by vault/
    );
    expect(footerText).toBeInTheDocument();
  });
});
