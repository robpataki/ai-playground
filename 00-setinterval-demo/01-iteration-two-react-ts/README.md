# setInterval Performance Comparison Demo

A React TypeScript application that demonstrates the performance differences between running `setInterval` on the main thread versus in a web worker.

## 🚀 Features

- **Real-time Counters**: Live demonstration of two counters running simultaneously
- **Main Thread Counter**: Shows how `setInterval` behaves on the main thread
- **Web Worker Counter**: Demonstrates `setInterval` running in a background thread
- **Performance Comparison**: Visual comparison of pros and cons for each approach
- **Responsive Design**: Modern, accessible UI that works on all devices
- **Comprehensive Testing**: Full test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Testing**: Jest + React Testing Library
- **Styling**: CSS with modern features (Grid, Flexbox, CSS Variables)
- **Web Workers**: Native browser API for background processing

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 01-iteration-two
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing

### Run all tests

```bash
pnpm test
```

### Run tests in watch mode

```bash
pnpm test:watch
```

### Run tests with coverage

```bash
pnpm test:coverage
```

### Run tests for CI

```bash
pnpm test:ci
```

## 🏗️ Build

### Development build

```bash
pnpm dev
```

### Production build

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── __tests__/       # Component tests
│   ├── Header.tsx       # Page header
│   ├── Footer.tsx       # Page footer (updated to 2025)
│   ├── CountersSection.tsx  # Main counters display
│   ├── CounterColumn.tsx    # Individual counter column
│   ├── InfoSection.tsx      # Comparison information
│   └── ResourcesSection.tsx # Learning resources
├── hooks/               # Custom React hooks
│   ├── __tests__/       # Hook tests
│   └── useCounters.ts   # Counter management logic
├── utils/               # Utility functions
│   ├── __tests__/       # Utility tests
│   └── workerUtils.ts   # Web worker management
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── setupTests.ts        # Jest test configuration
├── index.css            # Global styles
└── App.css              # Component-specific styles
```

## 🔧 Key Components

### useCounters Hook

Manages the state and logic for both main thread and web worker counters:

- Starts/stops intervals
- Handles worker communication
- Manages page visibility changes
- Provides fallback for unsupported browsers

### Web Worker Implementation

- Inline worker script creation using Blob URLs
- Message-based communication with main thread
- Error handling and graceful degradation
- Performance monitoring and reporting

### Responsive Design

- CSS Grid and Flexbox layouts
- Mobile-first responsive design
- Accessibility features (ARIA labels, semantic HTML)
- Modern CSS features (backdrop-filter, gradients)

## 🧪 Test Coverage

The project maintains high test coverage across all components:

- **Components**: 100% coverage
- **Hooks**: 100% coverage
- **Utilities**: 100% coverage
- **Overall**: 80%+ coverage threshold

### Testing Strategy

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Hook and component interaction testing
- **Mocking**: Comprehensive mocking of browser APIs and external dependencies
- **Accessibility**: Testing for proper ARIA attributes and semantic structure

## 🌐 Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Web Workers**: Supported in all modern browsers
- **CSS Features**: Graceful degradation for older browsers
- **JavaScript**: ES2020+ features with TypeScript compilation

## 📱 Performance Features

- **Lazy Loading**: Components load only when needed
- **Optimized Rendering**: React 19 optimizations
- **Web Worker**: Background processing without blocking UI
- **Efficient Updates**: Minimal re-renders and state updates

## 🔒 Security Features

- **Content Security Policy**: Proper CSP headers
- **External Links**: `rel="noopener noreferrer"` for external resources
- **Input Validation**: Type-safe props with TypeScript
- **Worker Isolation**: Sandboxed web worker execution

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Static Hosting

The built files in the `dist/` directory can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Any static file hosting service

### Environment Variables

No environment variables are required for this demo application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **MDN Web Docs**: For comprehensive web API documentation
- **React Team**: For the amazing React framework
- **Vite Team**: For the fast build tool
- **Testing Library**: For excellent testing utilities

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
