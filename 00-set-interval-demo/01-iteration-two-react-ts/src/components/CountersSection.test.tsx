import React from "react";
import { render, screen } from "@testing-library/react";
import CountersSection from "./CountersSection";
import { useCounters } from "../hooks/useCounters";

// Mock the useCounters hook
jest.mock("../hooks/useCounters");

const mockUseCounters = useCounters as jest.MockedFunction<typeof useCounters>;

describe("CountersSection", () => {
  const mockCounters = {
    mainThreadCounter: 15,
    workerCounter: 12,
    mainThreadStatus: true,
    workerStatus: true,
  };

  beforeEach(() => {
    mockUseCounters.mockReturnValue(mockCounters);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section heading", () => {
    render(<CountersSection />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Live Counters");
  });

  it("renders two counter columns", () => {
    render(<CountersSection />);

    const counterColumns = screen.getAllByRole("heading", { level: 3 });
    expect(counterColumns).toHaveLength(2);
  });

  it("displays main thread counter information", () => {
    render(<CountersSection />);

    const mainThreadTitle = screen.getByText("setInterval on the main thread");
    expect(mainThreadTitle).toBeInTheDocument();

    const mainThreadValue = screen.getByText("15");
    expect(mainThreadValue).toBeInTheDocument();
  });

  it("displays web worker counter information", () => {
    render(<CountersSection />);

    const workerTitle = screen.getByText("setInterval in a web worker");
    expect(workerTitle).toBeInTheDocument();

    const workerValue = screen.getByText("12");
    expect(workerValue).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<CountersSection />);

    const section = screen.getByRole("region", { name: /live counters/i });
    expect(section).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<CountersSection />);

    const section = container.querySelector(".counters-section");
    expect(section).toBeInTheDocument();

    const countersContainer = container.querySelector(".counters-container");
    expect(countersContainer).toBeInTheDocument();
  });

  it("calls useCounters hook", () => {
    render(<CountersSection />);

    expect(mockUseCounters).toHaveBeenCalledTimes(1);
  });
}); 