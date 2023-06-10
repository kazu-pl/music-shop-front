import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import { gql } from "__generated__/gql";
import { saveTokens } from "common/auth/tokens";
import { SortByKeys, SortOrder } from "__generated__/graphql";
import "./index.css";
import "./ShopView.css";
import { Button } from "@mui/material";

const LOGIN = gql(/* GraphQL */ `
  mutation Login($loginCredentials: LoginCredentialsInput!) {
    login(loginCredentials: $loginCredentials) {
      accessToken
      refreshToken
    }
  }
`);

const GETUSERDATA = gql(/* GraphQL */ `
  query getUserData {
    getUserData {
      name
      surname
      city
      email
      phone
      postalCode
      street
      streetNumber
    }
  }
`);

const GET_GUITARS_QUERY = gql(/* GraphQL */ `
  query GetGuitars(
    $offset: Int!
    $limit: Int!
    $sort: GetGuitarsSortInput!
    $filters: GetGuitarsFilters!
  ) {
    getGuitars(offset: $offset, limit: $limit, sort: $sort, filters: $filters) {
      data {
        _id
        availability {
          name
          _id
        }
      }
      totalItems
    }
  }
`);

const ShopView = () => {
  // const { loading:booksLoading, error:booksError, data:booksData } = useQuery(GET_BOOKS);

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      // default variables
      loginCredentials: {
        email: "test@test.test",
        password: "qwerty123",
      },
    },
    onCompleted(data) {
      const { __typename, ...tokens } = data.login;
      saveTokens(tokens);
    },
  });

  const [
    fetchUserData,
    {
      data: protectedData,
      loading: protectedLoading,
      error: protectedError,
      refetch,
    },
  ] = useLazyQuery(GETUSERDATA, {
    // variables: {
    //   data: {
    //     age: 5,
    //   },
    // },
    // errorPolicy: "all", // można też ustawić globalnie errorPolicy, zobacz index.tsx, znalezione:https://stackoverflow.com/a/48419218
    // "none" wyrzuci błąd na ekran co jest problematyczne,
    // "ignore" zignoruje bląd i nie pokaze jego message tak jakby nikt nie obsłużył,
    // "all" sprawi że normalnie wyświetli się error message tak jak powinno być
    fetchPolicy: "network-only",
  });
  const [
    fetchGuitars,
    {
      data: guitarsData,
      loading: guitarsLoading,
      error: guitarsError,
      refetch: guitarsRefetch,
    },
  ] = useLazyQuery(GET_GUITARS_QUERY, {
    variables: {
      limit: 5,
      offset: 0,
      sort: {
        sortBy: SortByKeys.Default,
        sortOrder: SortOrder.Asc,
      },
      filters: {},
    },
    fetchPolicy: "network-only",
  });

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() =>
            login({
              variables: {
                loginCredentials: {
                  email: "ktosfajny777@gmail.com",
                  password: "qwerty123",
                },
              },
            })
          }
        >
          login
        </button>

        {protectedLoading && "loading ..."}
        {protectedError && protectedError.message}
        {protectedData && (
          <pre>{JSON.stringify(protectedData.getUserData, undefined, 2)}</pre>
        )}

        {loading && "loading ..."}
        {error && error.message}
        {/* {data && <pre>{JSON.stringify(data.login, undefined, 2)}</pre>} */}

        {/* {booksLoading && "loading..."}
    {booksError && <p>{booksError.message}</p>}
    {booksData && <pre>{JSON.stringify(booksData, undefined, 2)}</pre>} */}

        <button onClick={() => fetchUserData()}>
          make some protected request
        </button>

        <Button onClick={() => fetchGuitars()}>fetch guitars</Button>

        {guitarsData &&
          guitarsData.getGuitars.data.map((guitar) => (
            <p key={guitar._id}>guitar id: {guitar._id}</p>
          ))}
      </header>
    </div>
  );
};

export default ShopView;
