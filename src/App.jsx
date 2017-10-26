import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import './App.css';

import Todos from './components/Todos.jsx';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080',
});

const client = new ApolloClient({
  networkInterface,
  connectToDevTools: true,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Todos></Todos>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
