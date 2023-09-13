import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/auth';
import { CartProvider } from './context/cart';
import 'antd/dist/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
    <App />
    </CartProvider>
  </AuthProvider>
);
