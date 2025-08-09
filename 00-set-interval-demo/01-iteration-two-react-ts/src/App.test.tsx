import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders", () => {
    render(<App />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders all main sections in correct order", () => {
    render(<App />);

    const sections = screen.getAllByRole("region");
    expect(sections).toHaveLength(3); // Counters, Info, Resources

    expect(sections[0]).toHaveAttribute("data-testid", "counters-section");
    expect(sections[1]).toHaveAttribute("data-testid", "info-section");
    expect(sections[2]).toHaveAttribute("data-testid", "resources-section");
  });
});
