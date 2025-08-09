import { render, screen, within } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByText(/© 2025 setInterval Comparison Demo/i)
    ).toBeInTheDocument();

    expect(
      within(footer).getByText(
        /Built to demonstrate the differences between main thread and web worker execution/i
      )
    ).toBeInTheDocument();
  });
});
