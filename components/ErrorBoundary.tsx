import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './common/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center p-4">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-teal-400 rounded-full blur-xl opacity-50"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="relative w-full h-full text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">A slight turbulence.</h1>
            <p className="text-slate-600 mt-2 max-w-md">
                It seems we've encountered a small hiccup. Your data is safe. A fresh start should resolve the issue.
            </p>
            <Button onClick={this.handleReload} className="mt-8">
                Reload Application
            </Button>
        </div>
      );
    }

    return this.props.children;
  }
}