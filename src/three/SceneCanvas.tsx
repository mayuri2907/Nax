import React, { Component, Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import { SceneFallback } from './SceneFallback';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('WebGL Scene rendering encountered an issue; falling back gracefully:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Lazy load the 3D scene to preserve initial page load performance
const LazyAbstractSculptureScene = lazy(() =>
  import('./AbstractSculptureScene').then((mod) => ({ default: mod.AbstractSculptureScene }))
);

export const SceneCanvas: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="scene-canvas-wrapper" style={{ width: '100%', height: '100%', minHeight: '440px' }}>
      <SceneErrorBoundary fallback={<SceneFallback />}>
        <Suspense fallback={<SceneFallback />}>
          <LazyAbstractSculptureScene reducedMotion={reducedMotion} />
        </Suspense>
      </SceneErrorBoundary>
    </div>
  );
};
