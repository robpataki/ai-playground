// Web Worker for setInterval demonstration
let counter = 0;
let intervalId;
let isPaused = false;

// Listen for messages from main thread
self.addEventListener('message', function(e) {
    const { command } = e.data;
    
    switch (command) {
        case 'start':
            startCounter();
            break;
        case 'pause':
            pauseCounter();
            break;
        case 'resume':
            resumeCounter();
            break;
        case 'stop':
            stopCounter();
            break;
        default:
            console.log('Unknown command:', command);
    }
});

// Start the counter
function startCounter() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    intervalId = setInterval(() => {
        if (!isPaused) {
            counter++;
            
            // Send counter value to main thread
            self.postMessage({
                type: 'counter',
                value: counter,
                timestamp: Date.now()
            });
            
            // Simulate some worker processing (this won't block the main thread)
            if (counter % 5 === 0) {
                simulateWorkerWork();
            }
        }
    }, 1000);
    
    // Confirm worker is ready
    self.postMessage({
        type: 'status',
        status: 'started',
        readyState: 'ready'
    });
}

// Pause the counter
function pauseCounter() {
    isPaused = true;
    self.postMessage({
        type: 'status',
        status: 'paused'
    });
}

// Resume the counter
function resumeCounter() {
    isPaused = false;
    self.postMessage({
        type: 'status',
        status: 'resumed'
    });
}

// Stop the counter
function stopCounter() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    self.postMessage({
        type: 'status',
        status: 'stopped'
    });
}

// Simulate worker processing (this runs in background)
function simulateWorkerWork() {
    const start = performance.now();
    
    // Simulate some computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
    }
    
    const end = performance.now();
    
    // Send performance data to main thread
    self.postMessage({
        type: 'performance',
        workTime: end - start,
        counter: counter
    });
}

// Handle worker errors
self.addEventListener('error', function(error) {
    self.postMessage({
        type: 'error',
        error: error.message
    });
});

// Cleanup when worker is terminated
self.addEventListener('beforeunload', function() {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
