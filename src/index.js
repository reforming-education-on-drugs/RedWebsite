import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './pages/App.jsx';
import './styles/styles.scss'; 
import './assets/images/favicon.ico';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);