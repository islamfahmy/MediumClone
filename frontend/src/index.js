import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';
import {Provider} from 'react-redux'
import store from './store'
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache()
});
client
  .query({
    query: gql`
      query {
        users{
          _id
          username
          email
          following{
            username
          }
          followers{
            username
          }
          perferences
      }
    }
    `
  })
  .then(result => console.log(result));
ReactDOM.render(
  <ApolloProvider client={client} >
    <Provider store={store}>
    <App />
    </Provider>
    </ApolloProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
