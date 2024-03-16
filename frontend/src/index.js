import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
document.querySelector("#root").style.margin = "0"
root.render(
    <>
        <App />
    </>
);