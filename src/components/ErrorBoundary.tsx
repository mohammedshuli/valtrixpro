import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback?.(this.state.error) ?? (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7] p-6">
          <div className="max-w-xl w-full rounded-3xl border border-red-200 bg-white p-8 shadow-lg">
            <h1 className="text-3xl font-playfair font-bold text-red-700 mb-4">Something went wrong</h1>
            <p className="text-gray-700 mb-6">{this.state.error.message}</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="rounded-lg bg-[#E6A520] px-5 py-3 font-semibold text-white hover:bg-[#d49a1f]"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
