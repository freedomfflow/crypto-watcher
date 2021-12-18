import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import App from './App';
import CryptoContext from './CryptoContext';

ReactDOM.render(
  <CryptoContext>
    <App />
  </CryptoContext>,
  document.getElementById('root')
);
