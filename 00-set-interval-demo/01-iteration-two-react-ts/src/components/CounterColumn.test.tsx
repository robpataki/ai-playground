import { render, screen } from "@testing-library/react";
import CounterColumn from "./CounterColumn";

describe("CounterColumn", () => {
  const defaultProps = {
    title: "Test Counter",
    counter: 42,
    status: true,
    ariaLabel: "Test counter label",
  };

  it("renders the title correctly", () => {
    render(<CounterColumn {...defaultProps} />);

    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toHaveTextContent("Test Counter");
  });

  it("displays the counter value correctly", () => {
    render(<CounterColumn {...defaultProps} />);

    const counterValue = screen.getByText("42");
    expect(counterValue).toBeInTheDocument();
  });

  it("shows the correct unit text", () => {
    render(<CounterColumn {...defaultProps} />);

    const unit = screen.getByText("seconds");
    expect(unit).toBeInTheDocument();
  });

  it("displays active status when status is true", () => {
    render(<CounterColumn {...defaultProps} />);

    const statusText = screen.getByText("Active");
    expect(statusText).toBeInTheDocument();

    const statusDot = screen.getByTestId("status-dot");
    expect(statusDot).toHaveClass("active");
  });

  it("displays inactive status when status is false", () => {
    render(<CounterColumn {...defaultProps} status={false} />);

    const statusText = screen.getByText("Inactive");
    expect(statusText).toBeInTheDocument();

    const statusDot = screen.getByTestId("status-dot");
    expect(statusDot).not.toHaveClass("active");
  });

  it("has proper accessibility attributes", () => {
    render(<CounterColumn {...defaultProps} />);

    const counterDisplay = screen.getByLabelText("Test counter label");
    expect(counterDisplay).toBeInTheDocument();
    expect(counterDisplay).toHaveAttribute("aria-live", "polite");
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<CounterColumn {...defaultProps} />);

    const column = container.querySelector(".counter-column");
    expect(column).toBeInTheDocument();

    const counterDisplay = container.querySelector(".counter-display");
    expect(counterDisplay).toBeInTheDocument();

    const statusIndicator = container.querySelector(".status-indicator");
    expect(statusIndicator).toBeInTheDocument();
  });
});
