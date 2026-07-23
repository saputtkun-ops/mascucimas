import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React App:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', textAlign: 'center', background: '#0f172a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontWeight: 'bold', fontSize: 20 }}>M</div>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', margin: 0 }}>Mas Cuci Mas App</h2>
          <p style={{ color: '#94a3b8', marginTop: 8, fontSize: 13, maxWidth: 400 }}>
            Aplikasi berhasil memulihkan diri dari kesalahan browser: {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 20, padding: '12px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 14, cursor: 'pointer', fontWeight: 'bold', fontSize: 13 }}
          >
            Muat Ulang Aplikasi (Reload)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
