import { useState, useEffect, useRef, useCallback } from "react";
import { createWorker } from "../utils/workerUtils";

export const useCounters = () => {
  const [mainThreadCounter, setMainThreadCounter] = useState<number>(0);
  const [workerCounter, setWorkerCounter] = useState<number>(0);
  const [mainThreadStatus] = useState<boolean>(true);
  const [workerStatus, setWorkerStatus] = useState<boolean>(false);

  const mainThreadIntervalRef = useRef<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  // Start main thread counter
  const startMainThreadCounter = useCallback(() => {
    if (mainThreadIntervalRef.current) {
      clearInterval(mainThreadIntervalRef.current);
    }

    mainThreadIntervalRef.current = setInterval(() => {
      setMainThreadCounter((prev) => prev + 1);
    }, 1000);
  }, []);

  // Start web worker
  const startWebWorker = useCallback(() => {
    try {
      console.log("Creating web worker...");
      const worker = createWorker();
      workerRef.current = worker;

      // Listen for messages from worker
      worker.onmessage = function (e: MessageEvent) {
        console.log("Main thread received worker message:", e.data);

        if (e.data.type === "counter") {
          console.log("Updating worker counter to:", e.data.value);
          setWorkerCounter(e.data.value);
        } else if (e.data.type === "status") {
          console.log("Worker status update:", e.data.status);
          if (e.data.status === "started") {
            setWorkerStatus(true);
          } else if (e.data.status === "stopped") {
            setWorkerStatus(false);
          }
        }
      };

      // Handle worker errors
      worker.onerror = function (error: ErrorEvent) {
        console.error("Worker error:", error);
        setWorkerStatus(false);
      };

      // Start the worker counter immediately
      console.log("Sending start command to worker");
      worker.postMessage({ command: "start" });
    } catch (error) {
      console.error("Failed to create web worker:", error);
      setWorkerStatus(false);
    }
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (mainThreadIntervalRef.current) {
      clearInterval(mainThreadIntervalRef.current);
    }
    if (workerRef.current) {
      workerRef.current.terminate();
    }
  }, []);

  // Initialize counters
  useEffect(() => {
    console.log("Initializing counters...");
    startMainThreadCounter();
    startWebWorker();

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [startMainThreadCounter, startWebWorker, cleanup]);

  // Debug: Log state changes
  useEffect(() => {
    console.log("Worker counter state changed to:", workerCounter);
  }, [workerCounter]);

  useEffect(() => {
    console.log("Worker status state changed to:", workerStatus);
  }, [workerStatus]);

  return {
    mainThreadCounter,
    workerCounter,
    mainThreadStatus,
    workerStatus,
  };
};
