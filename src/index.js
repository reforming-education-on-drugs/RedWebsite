import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './pages/App';
import './styles/styles.scss'; 
require('./images/favicon.ico');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);