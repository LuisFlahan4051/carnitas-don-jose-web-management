import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ApolloProvider } from '@apollo/client';
import { client, URIGRAPHQL } from './apollo/client'
import Main from './components/Main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Main URIGRAPHQL={URIGRAPHQL}/>
    </ApolloProvider>
  </React.StrictMode>
);
