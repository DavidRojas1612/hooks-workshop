import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Workshop
import App from './App';
import { PaginationProvider } from './store';
// Example
// import { Text } from "./example/Text";

// Workshop
ReactDOM.render(
  <PaginationProvider>
    <App />
  </PaginationProvider>,
  document.getElementById('root')
);
// Example
// ReactDOM.render(<Text />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
