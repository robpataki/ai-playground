import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock all child components
jest.mock("./components/Header", () => {
  return function MockHeader() {
    return <header data-testid="header">Header</header>;
  };
});

jest.mock("./components/CountersSection", () => {
  return function MockCountersSection() {
    return <section data-testid="counters-section">Counters Section</section>;
  };
});

jest.mock("./components/InfoSection", () => {
  return function MockInfoSection() {
    return <section data-testid="info-section">Info Section</section>;
  };
});

jest.mock("./components/ResourcesSection", () => {
  return function MockResourcesSection() {
    return <section data-testid="resources-section">Resources Section</section>;
  };
});

jest.mock("./components/Footer", () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("counters-section")).toBeInTheDocument();
    expect(screen.getByTestId("info-section")).toBeInTheDocument();
    expect(screen.getByTestId("resources-section")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<App />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<App />);

    const app = container.querySelector(".App");
    expect(app).toBeInTheDocument();
  });

  it("renders all main sections in correct order", () => {
    render(<App />);

    const sections = screen.getAllByRole("region");
    expect(sections).toHaveLength(3); // Counters, Info, Resources

    const main = screen.getByRole("main");
    const children = Array.from(main.children);

    expect(children[0]).toHaveAttribute("data-testid", "counters-section");
    expect(children[1]).toHaveAttribute("data-testid", "info-section");
    expect(children[2]).toHaveAttribute("data-testid", "resources-section");
  });
});
