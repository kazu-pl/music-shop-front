import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { gql } from "__generated__/gql";
import { SortByKeys, SortOrder } from "__generated__/graphql";

const GET_GUITARS_QUERY = gql(/* GraphQL */ `
  query GetGuitarsWithDataLoader(
    $limit: Int!
    $offset: Int!
    $sort: GetGuitarsSortInput!
    $filters: GetGuitarsFilters!
  ) {
    getGuitarsWithDataLoader(
      limit: $limit
      offset: $offset
      sort: $sort
      filters: $filters
    ) {
      data {
        _id
        name
        description
        fretsNumber
        imageId
        price
        scaleLength
        stringsNumber
        availability {
          _id
          name
          description
          type
        }
        bodyWood {
          _id
          description
          name
          type
        }
        bridge {
          _id
          description
          name
          type
        }
        fingerboardWood {
          _id
          description
          name
          type
        }
        guitarType {
          _id
          description
          name
          type
        }
        pickupsSet {
          _id
          description
          name
          type
        }
        producer {
          _id
          description
          name
          type
        }
        shape {
          _id
          description
          name
          type
        }
      }
      totalItems
    }
  }
`);

const GET_WISHLIST_ITEMS_IDS = gql(/* GraphQL */ `
  query GetGuitarsFromWishlist {
    getGuitarsFromWishlist {
      data
      totalItems
    }
  }
`);

const useFetchWishList = () => {
  const [
    fetch,
    {
      data: guitarsData,
      loading: guitarsLoading,
      error: guitarError,
      // refetch,
    },
  ] = useLazyQuery(GET_GUITARS_QUERY, {
    variables: {
      limit: 9999999999999999999,
      offset: 0,
      sort: {
        sortBy: SortByKeys.Default,
        sortOrder: SortOrder.Asc,
      },
      filters: {
        ids: [],
      },
    },
    fetchPolicy: "network-only",
  });

  const [
    fetchWishlist,
    {
      data: wishlistItemsIds,
      loading: wishlistIdsLoading,
      error: wishlistError,
    },
  ] = useLazyQuery(GET_WISHLIST_ITEMS_IDS, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (wishlistItemsIds) {
      fetch({
        variables: {
          limit: 999999, // too big number will thorn an error: `Variable "$limit" got invalid value 10000000000000000000; Int cannot represent non 32-bit signed integer value`
          offset: 0,
          sort: {
            sortBy: SortByKeys.Default,
            sortOrder: SortOrder.Asc,
          },
          filters: {
            ids: wishlistItemsIds.getGuitarsFromWishlist.data,
          },
        },
      });
    }
  }, [wishlistItemsIds, fetch]);

  return {
    fetchWishlist,
    data: guitarsData,
    loading: guitarsLoading || wishlistIdsLoading,
    error: guitarError || wishlistError,
  };
};

export default useFetchWishList;
