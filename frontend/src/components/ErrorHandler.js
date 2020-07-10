import React from 'react';
class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            header: error.message,
            file: error.fileName,
            lineNumber: error.lineNumber,
        });
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>{this.state.header}</h1>
                    <span>in {this.state.file}:{this.state.lineNumber}</span>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorHandler;