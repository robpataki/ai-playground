import { createWorker, terminateWorker } from "./workerUtils";

// Mock Worker constructor
const mockWorker = {
  addEventListener: jest.fn(),
  postMessage: jest.fn(),
  terminate: jest.fn(),
};

// Mock Blob and URL.createObjectURL
const mockBlob = {
  size: 1000,
  type: "application/javascript",
};

const mockWorkerUrl = "blob:mock-worker-url";

global.Worker = jest.fn().mockImplementation(() => mockWorker);
global.Blob = jest.fn().mockImplementation(() => mockBlob);
global.URL.createObjectURL = jest.fn().mockReturnValue(mockWorkerUrl);
global.URL.revokeObjectURL = jest.fn();

describe("workerUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createWorker", () => {
    it("creates a new Worker instance", () => {
      const worker = createWorker();

      expect(global.Worker).toHaveBeenCalledWith(mockWorkerUrl);
      expect(worker).toBe(mockWorker);
    });

    it("creates a blob with the correct worker script", () => {
      createWorker();

      expect(global.Blob).toHaveBeenCalledWith(
        [expect.stringContaining("Web Worker for setInterval demonstration")],
        { type: "application/javascript" }
      );
    });

    it("creates a blob URL for the worker script", () => {
      createWorker();

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
    });

    it("adds error event listener to worker", () => {
      createWorker();

      expect(mockWorker.addEventListener).toHaveBeenCalledWith(
        "error",
        expect.any(Function)
      );
    });

    it("revokes blob URL when worker errors", () => {
      const worker = createWorker();

      // Get the error event listener
      const errorListener = mockWorker.addEventListener.mock.calls.find(
        (call) => call[0] === "error"
      )?.[1];

      if (errorListener) {
        errorListener();
      }

      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(mockWorkerUrl);
    });

    it("handles Worker constructor errors gracefully", () => {
      const mockError = new Error("Worker creation failed");
      (global.Worker as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      expect(() => createWorker()).toThrow("Worker creation failed");
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(mockWorkerUrl);
    });

    it("includes the complete worker script content", () => {
      createWorker();

      const blobContent = (global.Worker as jest.Mock).mock.calls[0][0][0];

      // Check for key functions and features
      expect(blobContent).toContain("startCounter");
      expect(blobContent).toContain("pauseCounter");
      expect(blobContent).toContain("resumeCounter");
      expect(blobContent).toContain("stopCounter");
      expect(blobContent).toContain("simulateWorkerWork");
      expect(blobContent).toContain("setInterval");
      expect(blobContent).toContain("postMessage");
    });
  });

  describe("terminateWorker", () => {
    it("terminates the worker when provided", () => {
      terminateWorker(mockWorker as any);

      expect(mockWorker.terminate).toHaveBeenCalled();
    });

    it("handles null worker gracefully", () => {
      expect(() => terminateWorker(null)).not.toThrow();
    });

    it("handles undefined worker gracefully", () => {
      expect(() => terminateWorker(undefined as any)).not.toThrow();
    });
  });
}); 