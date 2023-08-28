import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getTokens } from "./common/auth/tokens";
import SERVER_URLs from "./common/constants/serverUrls";
import { createUploadLink } from "apollo-upload-client";

const httpLink = createHttpLink({
  uri: `${SERVER_URLs.GRAPH_QL}`,
});

const authLink = setContext((operation, { headers, ...rest }) => {
  console.log({ authLink_operation: operation, authLink_rest: rest });
  // get the authentication token from local storage if it exists

  const token = getTokens()?.accessToken;

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const cache = new InMemoryCache();

const client = new ApolloClient({
  connectToDevTools: true,
  defaultOptions: {
    mutate: {
      errorPolicy: "all", // set globally errorPolicy, znalezione tutaj: https://stackoverflow.com/a/48419218
    },
    query: {
      errorPolicy: "all",
    },
  },
  // uri: SERVER_URLs.GRAPH_QL, // use this if you don't to use auth, if using auth then no need to use this as authLink has uri already
  cache,

  link: createUploadLink({
    headers: {
      "Apollo-Require-Preflight": "true",
      authorization: getTokens()?.accessToken
        ? `Bearer ${getTokens()?.accessToken}`
        : "",
    },

    uri: `${SERVER_URLs.GRAPH_QL}`,
  }),
  //
  //

  // link: authLink
  //   .concat(httpLink)
  //   .concat(
  //     createUploadLink({ headers: { "Apollo-Require-Preflight": "true" } })
  //   ), // if using link with authLink then you don't need to use above uri
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
