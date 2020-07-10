import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ErrorHandler from './components/ErrorHandler';
const AppWithErrorHandler = (
    <ErrorHandler>
        <App />
    </ErrorHandler>
)
ReactDOM.render(AppWithErrorHandler, document.getElementById('app'));

