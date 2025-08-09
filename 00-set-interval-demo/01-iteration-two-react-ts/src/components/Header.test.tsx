import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the main heading", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("setInterval Performance Comparison");
  });

  it("renders the description paragraph", () => {
    render(<Header />);

    const description = screen.getByText(
      /Real-time demonstration of setInterval running on the main thread versus in a web worker/i
    );
    expect(description).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<Header />);

    const header = container.querySelector("header");
    expect(header).toHaveClass("header");
  });
}); 