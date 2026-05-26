import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-gray-900 border border-red-500/30 rounded-xl p-6">
            <h2 className="text-red-400 font-bold text-lg mb-2">Error de aplicación</h2>
            <p className="text-gray-300 text-sm mb-4">{this.state.error.message}</p>
            <pre className="text-gray-500 text-xs bg-gray-800 rounded p-3 overflow-auto max-h-40">
              {this.state.error.stack}
            </pre>
            <button
              onClick={() => this.setState({ error: null })}
              className="mt-4 text-sm text-blue-400 hover:text-blue-300"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
