import { JWT_ADMIN_TOKEN } from './constants';
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext} from '@apollo/client/link/context'
import { config } from './config';

const httpLink = createHttpLink({uri: config.HASURA_ENDPOINT})
const authLink = setContext((_, config) => {
    const token = localStorage.getItem(JWT_ADMIN_TOKEN);
  
    if (!token) {
      return config;
    }
  
    return {
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });
  
  export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });