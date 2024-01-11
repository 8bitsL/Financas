import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './componentes/Home';

import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Home/>
  </Provider>
);

