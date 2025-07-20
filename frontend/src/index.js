// Before (index.js)
import React from 'react';
import App from './App';

const root = document.getElementById('root');
// No usage of React or App

// After: Use the imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
