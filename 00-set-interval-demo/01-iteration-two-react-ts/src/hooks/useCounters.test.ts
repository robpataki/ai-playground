import { renderHook, act } from "@testing-library/react";
import { useCounters } from "./useCounters";
import { createWorker } from "../utils/workerUtils";

// Mock the worker utilities
jest.mock("../utils/workerUtils");

const mockCreateWorker = createWorker as jest.MockedFunction<
  typeof createWorker
>;

// Mock Worker
const mockWorker = {
  onmessage: jest.fn(),
  onerror: jest.fn(),
  postMessage: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  terminate: jest.fn(),
  readyState: 1,
};

// Mock setInterval and clearInterval
const mockSetInterval = jest.fn();
const mockClearInterval = jest.fn();

global.setInterval = mockSetInterval;
global.clearInterval = mockClearInterval;

// Mock performance.now
const mockPerformanceNow = jest.fn();
global.performance.now = mockPerformanceNow;

// Mock console methods
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

describe("useCounters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateWorker.mockReturnValue(mockWorker as any);
    mockPerformanceNow.mockReturnValue(1000);
    mockSetInterval.mockReturnValue(123 as any);
  });

  afterEach(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useCounters());

    expect(result.current.mainThreadCounter).toBe(0);
    expect(result.current.workerCounter).toBe(0);
    expect(result.current.mainThreadStatus).toBe(true);
    expect(result.current.workerStatus).toBe(false);
  });

  it("starts main thread counter on mount", () => {
    renderHook(() => useCounters());
    expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it("creates web worker on mount", () => {
    renderHook(() => useCounters());
    expect(mockCreateWorker).toHaveBeenCalledTimes(1);
  });

  it("sends start command to worker", () => {
    renderHook(() => useCounters());
    expect(mockWorker.postMessage).toHaveBeenCalledWith({ command: "start" });
  });

  it("handles worker counter messages", () => {
    const { result } = renderHook(() => useCounters());

    // Simulate worker message
    act(() => {
      mockWorker.onmessage({ data: { type: "counter", value: 5 } } as any);
    });

    expect(result.current.workerCounter).toBe(5);
  });

  it("handles worker status messages", () => {
    const { result } = renderHook(() => useCounters());

    // Simulate worker status message
    act(() => {
      mockWorker.onmessage({
        data: { type: "status", status: "started" },
      } as any);
    });

    expect(result.current.workerStatus).toBe(true);
  });

  it("simulates main thread work every 5 seconds", () => {
    renderHook(() => useCounters());

    // Get the interval callback
    const intervalCallback = mockSetInterval.mock.calls[0][0];

    // Simulate 5th tick
    act(() => {
      intervalCallback();
    });

    expect(mockPerformanceNow).toHaveBeenCalled();
  });

  it("handles worker errors gracefully", () => {
    const { result } = renderHook(() => useCounters());

    // Simulate worker error
    act(() => {
      mockWorker.onerror({ message: "Worker error" } as any);
    });

    expect(mockConsoleError).toHaveBeenCalledWith("Worker error:", {
      message: "Worker error",
    });
    expect(result.current.workerStatus).toBe(false);
  });

  it("falls back to main thread counter when worker fails", () => {
    mockCreateWorker.mockImplementation(() => {
      throw new Error("Worker creation failed");
    });

    const { result } = renderHook(() => useCounters());

    expect(mockConsoleError).toHaveBeenCalledWith(
      "Failed to create web worker:",
      expect.any(Error)
    );
    expect(result.current.workerStatus).toBe(false);
  });

  it("cleans up intervals and worker on unmount", () => {
    const { unmount } = renderHook(() => useCounters());

    unmount();

    expect(mockClearInterval).toHaveBeenCalledWith(123);
    expect(mockWorker.terminate).toHaveBeenCalled();
  });

  it("pauses counters when page becomes hidden", () => {
    renderHook(() => useCounters());

    // Simulate page visibility change to hidden
    act(() => {
      Object.defineProperty(document, "hidden", {
        value: true,
        writable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(mockClearInterval).toHaveBeenCalledWith(123);
  });

  it("resumes counters when page becomes visible", () => {
    renderHook(() => useCounters());

    // Simulate page visibility change to visible
    act(() => {
      Object.defineProperty(document, "hidden", {
        value: false,
        writable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(mockSetInterval).toHaveBeenCalledTimes(2); // Initial + resume
  });
});
