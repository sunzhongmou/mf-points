import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.renderComponent = (containerId, history) => {
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId),
  );

  serviceWorker.unregister();
};

window.unmountComponent = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
