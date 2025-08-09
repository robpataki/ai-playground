import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the copyright text with 2025", () => {
    render(<Footer />);

    const copyrightText = screen.getByText(
      /© 2025 setInterval Comparison Demo/i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("contains the correct description text", () => {
    render(<Footer />);

    const description = screen.getByText(
      /Built to demonstrate the differences between main thread and web worker execution/i
    );
    expect(description).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("footer");
  });
}); 