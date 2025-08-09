import { render, screen } from "@testing-library/react";
import InfoSection from "./InfoSection";

describe("InfoSection", () => {
  it("renders", () => {
    render(<InfoSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /what\'s good to know about using setInterval/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: /what\'s good to know about using setInterval/i,
      })
    ).toBeInTheDocument();
  });

  it("renders two comparison cards", () => {
    render(<InfoSection />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
  });

  it("displays main thread comparison card", () => {
    render(<InfoSection />);
    expect(screen.getByText("Main Thread")).toBeInTheDocument();
  });

  it("displays web worker comparison card", () => {
    render(<InfoSection />);
    expect(screen.getByText("Web Worker")).toBeInTheDocument();
  });

  it("shows pros and cons for main thread", () => {
    render(<InfoSection />);
    expect(screen.getAllByText("Pros")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Cons")[0]).toBeInTheDocument();
  });

  it("shows pros and cons for web worker", () => {
    render(<InfoSection />);
    expect(screen.getAllByText("Pros")[1]).toBeInTheDocument();
    expect(screen.getAllByText("Cons")[1]).toBeInTheDocument();
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
