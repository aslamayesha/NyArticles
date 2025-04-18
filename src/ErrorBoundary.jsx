import React from 'react';
import FallbackUi from './components/common/presentational/fallbackUi/FallbackUi';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <FallbackUi error={this.state.error.toString()} />
                </div>
            );
        }
        // Normally, just render children
        // eslint-disable-next-line
        return this.props.children;
    }
}

export default ErrorBoundary;
