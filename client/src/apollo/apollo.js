import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ?? "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;