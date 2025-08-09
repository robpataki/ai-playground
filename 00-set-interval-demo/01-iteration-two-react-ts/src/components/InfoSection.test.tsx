import React from "react";
import { render, screen } from "@testing-library/react";
import InfoSection from "./InfoSection";

describe("InfoSection", () => {
  it("renders the section heading", () => {
    render(<InfoSection />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(
      "What's good to know about using setInterval"
    );
  });

  it("renders two comparison cards", () => {
    render(<InfoSection />);

    const comparisonCards = screen.getAllByRole("heading", { level: 3 });
    expect(comparisonCards).toHaveLength(2);
  });

  it("displays main thread comparison card", () => {
    render(<InfoSection />);

    const mainThreadCard = screen.getByText("Main Thread");
    expect(mainThreadCard).toBeInTheDocument();
  });

  it("displays web worker comparison card", () => {
    render(<InfoSection />);

    const workerCard = screen.getByText("Web Worker");
    expect(workerCard).toBeInTheDocument();
  });

  it("shows pros and cons for main thread", () => {
    render(<InfoSection />);

    const mainThreadPros = screen.getByText("Pros");
    expect(mainThreadPros).toBeInTheDocument();

    const mainThreadCons = screen.getByText("Cons");
    expect(mainThreadCons).toBeInTheDocument();
  });

  it("shows pros and cons for web worker", () => {
    render(<InfoSection />);

    const workerPros = screen.getAllByText("Pros")[1];
    expect(workerPros).toBeInTheDocument();

    const workerCons = screen.getAllByText("Cons")[1];
    expect(workerCons).toBeInTheDocument();
  });

  it("lists main thread pros correctly", () => {
    render(<InfoSection />);

    expect(
      screen.getByText("Direct access to DOM elements")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Simple to implement and debug")
    ).toBeInTheDocument();
    expect(
      screen.getByText("No additional setup required")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Immediate access to page context")
    ).toBeInTheDocument();
  });

  it("lists main thread cons correctly", () => {
    render(<InfoSection />);

    expect(
      screen.getByText("Blocks UI rendering when busy")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Can cause page to become unresponsive")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Affects user experience during heavy operations")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Timing can be delayed by other JavaScript execution")
    ).toBeInTheDocument();
  });

  it("lists web worker pros correctly", () => {
    render(<InfoSection />);

    expect(
      screen.getByText("Runs in background without blocking UI")
    ).toBeInTheDocument();
    expect(
      screen.getByText("More accurate timing (less affected by main thread)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Better performance for intensive tasks")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Doesn't interfere with user interactions")
    ).toBeInTheDocument();
  });

  it("lists web worker cons correctly", () => {
    render(<InfoSection />);

    expect(screen.getByText("No direct DOM access")).toBeInTheDocument();
    expect(
      screen.getByText("Communication requires message passing")
    ).toBeInTheDocument();
    expect(screen.getByText("More complex to implement")).toBeInTheDocument();
    expect(
      screen.getByText("Limited browser support in older browsers")
    ).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<InfoSection />);

    const section = screen.getByRole("region", {
      name: /what's good to know about using setinterval/i,
    });
    expect(section).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<InfoSection />);

    const section = container.querySelector(".info-section");
    expect(section).toBeInTheDocument();

    const comparisonGrid = container.querySelector(".comparison-grid");
    expect(comparisonGrid).toBeInTheDocument();

    const mainThreadCard = container.querySelector(
      ".comparison-card.main-thread"
    );
    expect(mainThreadCard).toBeInTheDocument();

    const workerCard = container.querySelector(".comparison-card.web-worker");
    expect(workerCard).toBeInTheDocument();
  });
}); 