import React from 'react'

export class ErrorHandler extends React.PureComponent {
  static displayName = 'ErrorHandler'
  state = { hasError: false, theError: null }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, theError: error }
  }

  componentDidCatch = (error: Error, info: React.ErrorInfo) => {
    this.logError(error, info)
  }

  logError = (error: Error, info: React.ErrorInfo) => {
    console.log('ERROR | : info -> ', info.componentStack)
    console.error('ERROR | : error -> ', error)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <div
          style={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#ff0000',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ERROR!
        </div>
      )
    }

    return children
  }
}

export default ErrorHandler
