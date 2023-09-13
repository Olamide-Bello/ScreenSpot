import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GlobalState from './Components/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalState>
);

