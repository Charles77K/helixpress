// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // Update state to trigger fallback UI
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info); // You can log to external services here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Something went wrong.
          </h1>
          <p className="text-gray-600">{this.state.error?.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
