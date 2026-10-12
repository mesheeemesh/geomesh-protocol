'use client';

import type { ReactNode } from 'react';
import { Component } from 'react';

interface ChartErrorBoundaryProps {
  title: string;
  children: ReactNode;
}

interface ChartErrorBoundaryState {
  hasError: boolean;
}

export default class ChartErrorBoundary extends Component<
  ChartErrorBoundaryProps,
  ChartErrorBoundaryState
> {
  state: ChartErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            borderRadius: 20,
            padding: 20,
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            color: '#9a3412',
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 8 }}>{this.props.title}</div>
          <div style={{ fontSize: 14 }}>
            This chart failed to load. Refresh the page to try again.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
