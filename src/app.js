import React, { Component, Fragment } from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from "apollo-client";
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { Provider } from 'react-redux';
import { history } from './redux/store';
import Router from './router';
import { config } from './config';
import Header from './components/header';
import { store } from './redux/store';

const cache = new InMemoryCache({
    dataIdFromObject: o => o.id
});
const httpLink = new HttpLink({
    uri: config.graphql,
    credentials: 'same-origin'
})
const wsLink = new WebSocketLink({
    uri: config.wsGraphql,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem('token'),
        }
    }
})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }
})
const link = ApolloLink.split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient({
    link: link,
    cache
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Fragment>
                        <Header />
                        <Router history={history} />
                    </Fragment>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;