import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import { gql } from "__generated__/gql";
import { saveTokens } from "common/auth/tokens";
import { SortByKeys, SortOrder } from "__generated__/graphql";
import "./index.css";
import "./ShopView.css";
import { Button } from "@mui/material";

import { useSnackbar } from "notistack";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import HelmetDecorator from "components/HelmetDecorator/HelmetDecorator";

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
  const {
    data: guitarsData,
    loading: guitarsLoading,
    error: guitarError,
    refetch: guitarsRefetch,
  } = useQuery(GET_GUITARS_QUERY, {
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
    <ShopLayout title="Sklep">
      <HelmetDecorator title="Sklep" />
      {guitarsLoading
        ? "loading..."
        : guitarError
        ? "error"
        : guitarsData
        ? guitarsData.getGuitars.data.map((guitar) => (
            <p key={guitar._id}>{guitar._id}</p>
          ))
        : ""}
    </ShopLayout>
  );
};

export default ShopView;
