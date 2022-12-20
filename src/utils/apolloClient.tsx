import {ApolloClient, InMemoryCache} from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://swop.cx/graphql?api-key=13be8b65ca5f1f5e88bbd7fd72ac0c5f9c19dc2123e35dd59dbc522d8902837a',
  cache: new InMemoryCache(),
});
