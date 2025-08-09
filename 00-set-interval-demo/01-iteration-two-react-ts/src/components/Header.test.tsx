import { render, screen, within } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the main heading", () => {
    render(<Header />);

    const header = screen.getByRole("banner", {});
    expect(header).toBeInTheDocument();

    expect(
      within(header).getByRole("heading", {
        level: 1,
        name: "setInterval Performance Comparison",
      })
    ).toBeInTheDocument();

    const description = screen.getByText(
      /Real-time demonstration of setInterval running on the main thread versus in a web worker/i
    );
    expect(description).toBeInTheDocument();
  });
});
