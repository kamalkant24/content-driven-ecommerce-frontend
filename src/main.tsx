import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  

<React.StrictMode>
<BrowserRouter basename='/realestate'>
<Provider store={store}>
  <App />
</Provider>
</BrowserRouter>
</React.StrictMode>
)
