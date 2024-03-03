import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

import Star from '../src/Star';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Star maxRating={5} />
    <Star maxRating={10} />
    {/* <App /> */}
  </React.StrictMode>
);
