import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OVsg2CDSokPhjdKmuBkfQaPjcIeS4ABAzAaFOcW6TIvm7phBV6dG89atHK9CXstJsV8Yx0opCRJnTjqQ064jDHL00OX8sRhSE');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
