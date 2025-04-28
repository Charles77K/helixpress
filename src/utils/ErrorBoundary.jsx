import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error occurred
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging purposes
    console.error('Error captured by ErrorBoundary:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Customize the fallback UI (can be anything you want)
      return (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
          }}
        >
          <h2>Oops! Something went wrong.</h2>
          <p>Please try again later.</p>
        </div>
      );
    }

    return this.props.children; // Render the children components if no error
  }
}

export default ErrorBoundary;
