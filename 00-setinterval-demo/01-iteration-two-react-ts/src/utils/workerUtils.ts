// Utility functions for web worker management

export const createWorker = (): Worker => {
  // Create a blob URL for the worker script
  const workerScript = `
    // Web Worker for setInterval demonstration
    let counter = 0;
    let intervalId = null;
    let isRunning = false;

    console.log('Worker initialized and ready');

    // Listen for messages from main thread
    self.addEventListener('message', function(e) {
      console.log('Worker received message:', e.data);
      const { command } = e.data;
      
      switch (command) {
        case 'start':
          console.log('Starting counter');
          startCounter();
          break;
        case 'stop':
          console.log('Stopping counter');
          stopCounter();
          break;
        default:
          console.log('Unknown command:', command);
      }
    });

    // Start the counter
    function startCounter() {
      if (isRunning) {
        console.log('Counter already running');
        return;
      }
      
      isRunning = true;
      counter = 0;
      console.log('Starting counter from 0');
      
      // Send initial status
      self.postMessage({
        type: 'status',
        status: 'started'
      });
      
      // Send first counter value immediately
      self.postMessage({
        type: 'counter',
        value: counter,
        timestamp: Date.now()
      });
      
      intervalId = setInterval(() => {
        counter++;
        console.log('Worker counter tick:', counter);
        
        // Send counter value to main thread
        self.postMessage({
          type: 'counter',
          value: counter,
          timestamp: Date.now()
        });
      }, 1000);
    }

    // Stop the counter
    function stopCounter() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      isRunning = false;
      console.log('Counter stopped');
      
      self.postMessage({
        type: 'status',
        status: 'stopped'
      });
    }
  `;

  const blob = new Blob([workerScript], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(blob);

  try {
    const worker = new Worker(workerUrl);

    // Clean up the blob URL when the worker is terminated
    worker.addEventListener("error", () => {
      URL.revokeObjectURL(workerUrl);
    });

    return worker;
  } catch (error) {
    URL.revokeObjectURL(workerUrl);
    throw error;
  }
};

export const terminateWorker = (worker: Worker | null): void => {
  if (worker) {
    worker.terminate();
  }
};
