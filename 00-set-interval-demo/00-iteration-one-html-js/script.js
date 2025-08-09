// Main thread counter
let mainThreadCounter = 0;
let mainThreadInterval;

// Web worker counter
let workerCounter = 0;
let worker;
let workerInterval;

// DOM elements
const mainThreadValue = document.getElementById('main-thread-value');
const workerValue = document.getElementById('worker-value');
const mainThreadStatus = document.getElementById('main-thread-status');
const workerStatus = document.getElementById('worker-status');

// Initialize the application
function init() {
    startMainThreadCounter();
    startWebWorker();
    updateStatusIndicators();
}

// Start main thread counter
function startMainThreadCounter() {
    mainThreadInterval = setInterval(() => {
        mainThreadCounter++;
        mainThreadValue.textContent = mainThreadCounter;
        
        // Simulate some main thread work to demonstrate blocking
        if (mainThreadCounter % 5 === 0) {
            simulateMainThreadWork();
        }
    }, 1000);
}

// Simulate main thread work (this will block the UI)
function simulateMainThreadWork() {
    const start = performance.now();
    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
    }
    const end = performance.now();
    
    console.log(`Main thread work took ${(end - start).toFixed(2)}ms`);
}

// Start web worker
function startWebWorker() {
    try {
        // Create web worker
        worker = new Worker('worker.js');
        
        // Listen for messages from worker
        worker.onmessage = function(e) {
            if (e.data.type === 'counter') {
                workerCounter = e.data.value;
                workerValue.textContent = workerCounter;
            }
        };
        
        // Handle worker errors
        worker.onerror = function(error) {
            console.error('Worker error:', error);
            updateWorkerStatus(false);
        };
        
        // Start the worker counter
        worker.postMessage({ command: 'start' });
        
    } catch (error) {
        console.error('Failed to create web worker:', error);
        updateWorkerStatus(false);
        // Fallback to main thread counter if worker fails
        startWorkerFallback();
    }
}

// Fallback if web worker is not supported
function startWorkerFallback() {
    console.log('Using fallback counter for web worker');
    workerInterval = setInterval(() => {
        workerCounter++;
        workerValue.textContent = workerCounter;
    }, 1000);
}

// Update status indicators
function updateStatusIndicators() {
    // Main thread status is always active
    updateMainThreadStatus(true);
    
    // Worker status depends on worker creation
    if (worker && worker.readyState === Worker.READY) {
        updateWorkerStatus(true);
    } else {
        updateWorkerStatus(false);
    }
}

function updateMainThreadStatus(active) {
    const statusDot = mainThreadStatus.querySelector('.status-dot');
    const statusText = mainThreadStatus.querySelector('.status-text');
    
    if (active) {
        statusDot.classList.add('active');
        statusText.textContent = 'Active';
    } else {
        statusDot.classList.remove('active');
        statusText.textContent = 'Inactive';
    }
}

function updateWorkerStatus(active) {
    const statusDot = workerStatus.querySelector('.status-dot');
    const statusText = workerStatus.querySelector('.status-text');
    
    if (active) {
        statusDot.classList.add('active');
        statusText.textContent = 'Active';
    } else {
        statusDot.classList.remove('active');
        statusText.textContent = 'Inactive';
    }
}

// Cleanup function
function cleanup() {
    if (mainThreadInterval) {
        clearInterval(mainThreadInterval);
    }
    if (workerInterval) {
        clearInterval(workerInterval);
    }
    if (worker) {
        worker.terminate();
    }
}

// Handle page unload
window.addEventListener('beforeunload', cleanup);

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause counters when page is not visible
        if (mainThreadInterval) {
            clearInterval(mainThreadInterval);
        }
        if (worker) {
            worker.postMessage({ command: 'pause' });
        }
    } else {
        // Resume counters when page becomes visible
        startMainThreadCounter();
        if (worker) {
            worker.postMessage({ command: 'resume' });
        }
    }
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Performance monitoring
let lastMainThreadUpdate = performance.now();
let lastWorkerUpdate = performance.now();

// Monitor timing accuracy
setInterval(() => {
    const now = performance.now();
    const mainThreadDelta = now - lastMainThreadUpdate;
    const workerDelta = now - lastWorkerUpdate;
    
    // Log timing differences every 10 seconds
    if (mainThreadCounter % 10 === 0) {
        console.log(`Timing - Main thread: ${mainThreadDelta.toFixed(2)}ms, Worker: ${workerDelta.toFixed(2)}ms`);
    }
    
    lastMainThreadUpdate = now;
    lastWorkerUpdate = now;
}, 1000);
