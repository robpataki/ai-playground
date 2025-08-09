import React from "react";

interface CounterColumnProps {
  title: string;
  counter: number;
  status: boolean;
  ariaLabel: string;
}

const CounterColumn: React.FC<CounterColumnProps> = ({
  title,
  counter,
  status,
  ariaLabel,
}) => {
  return (
    <div className="counter-column">
      <h3>{title}</h3>
      <div
        className="counter-display"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <span className="counter-value">{counter}</span>
        <span className="counter-unit">seconds</span>
      </div>
      <div className="status-indicator">
        <span
          className={`status-dot ${status ? "active" : ""}`}
          data-testid="status-dot"
        ></span>
        <span className="status-text">{status ? "Active" : "Inactive"}</span>
      </div>
    </div>
  );
};

export default CounterColumn;
