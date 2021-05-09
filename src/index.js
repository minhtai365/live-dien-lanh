import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './css/index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../src/components/App';

ReactDOM.render((
  <React.Fragment>
    {/* <Provider> */}
      <App />
    {/* </Provider> */}
  </React.Fragment>
), document.getElementById('root'));
