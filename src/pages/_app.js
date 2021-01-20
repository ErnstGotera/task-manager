import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { light } from '../components/theme';
import { ThemeProvider } from '@material-ui/core';
const client = new ApolloClient({
  uri: 'https://api.8base.com/ckk4mjotn029807jo4ouxaxvu',
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={light}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
