# setInterval: Main Thread vs Web Worker Comparison

This project demonstrates the differences between running `setInterval` on the main thread versus in a web worker. It provides a real-time comparison showing how each approach affects performance and user experience.

## Features

- **Live Counters**: Two counters running simultaneously - one on the main thread and one in a web worker
- **Real-time Performance**: See the differences in timing accuracy and UI responsiveness
- **Educational Content**: Comprehensive explanation of pros and cons for each approach
- **Resource Links**: Curated links to learn more about setInterval and Web Workers
- **Accessible Design**: Built with accessibility in mind, including ARIA labels and keyboard navigation

## How It Works

### Main Thread Counter
- Runs directly in the main JavaScript thread
- Updates the DOM every second
- Simulates heavy computation every 5 seconds to demonstrate blocking behavior
- Can cause UI freezing during intensive operations

### Web Worker Counter
- Runs in a separate background thread
- Communicates with main thread via message passing
- More accurate timing (less affected by main thread operations)
- Doesn't block the UI during intensive operations

## Files

- `index.html` - Main HTML structure with semantic markup
- `styles.css` - Modern, responsive CSS with accessibility features
- `script.js` - Main JavaScript logic for the main thread counter
- `worker.js` - Web Worker implementation for background processing
- `README.md` - This documentation file

## Running the Project

1. Open `index.html` in a modern web browser
2. Watch both counters increment every second
3. Notice the difference in behavior when heavy operations occur
4. Read the educational content below the counters
5. Explore the resource links for deeper learning

## Browser Compatibility

- **Modern Browsers**: Full support for all features
- **Older Browsers**: Web Workers may not be supported, fallback to main thread only
- **Mobile Devices**: Responsive design works on all screen sizes

## Key Differences Demonstrated

### Main Thread
- ✅ Direct DOM access
- ✅ Simple implementation
- ❌ Can block UI rendering
- ❌ Timing affected by other operations

### Web Worker
- ✅ Runs in background
- ✅ More accurate timing
- ✅ Better performance
- ❌ No direct DOM access
- ❌ More complex communication

## Learning Resources

The project includes links to:
- MDN Web Docs for setInterval
- Web Workers API documentation
- Performance optimization guides
- Real-world examples and demos

## Accessibility Features

- Semantic HTML structure
- ARIA labels and live regions
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences respected
- Screen reader friendly

## Performance Monitoring

The application includes built-in performance monitoring:
- Timing accuracy comparison
- Work simulation every 5 seconds
- Console logging for debugging
- Page visibility handling

## Contributing

Feel free to enhance this project by:
- Adding more performance metrics
- Implementing additional timing functions
- Improving the UI/UX
- Adding more educational content

## License

This project is open source and available for educational purposes.
