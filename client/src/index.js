import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import store, {persistedStore} from './redux/store';
import client from "./apollo/apollo";
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
// import { Provider } from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <Provider store={store}> */}
        {/* <PersistGate persistor={persistedStore}> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        {/* </PersistGate> */}
      {/* </Provider> */}
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
