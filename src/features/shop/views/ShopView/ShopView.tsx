import { useQuery } from "@apollo/client";

import { gql } from "__generated__/gql";
import {
  GetGuitarsFilters,
  GetGuitarsSortInput,
  SortByKeys,
  SortOrder,
} from "__generated__/graphql";
import "./index.css";
import "./ShopView.css";

import Grid from "@mui/material/Grid";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import HelmetDecorator from "components/HelmetDecorator/HelmetDecorator";
import { useLayoutEffect, useState } from "react";
import GuitarTile from "../../components/GuitarTile";
import TablePagination from "@mui/material/TablePagination";
import FiltersList, {
  FiltersListProps,
  sortOptions,
} from "./components/FiltersList";
import AbsoluteLoadingSpinner from "components/AbsoluteLoadingSpinner";
import Typography from "@mui/material/Typography";
import { checkIfIsOnWishlist } from "features/shop/components/GuitarTile/GuitarTile";
import useFetchWishList from "../WishListView/useFetchWishList";
import useFetchCheckoutList from "../CheckoutView/hooks/useFetchCheckoutList";

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

const ShopView = () => {
  const [sort, setSort] = useState<GetGuitarsSortInput>({
    sortBy: SortByKeys.Default,
    sortOrder: SortOrder.Asc,
  });
  const [filters, setFilters] = useState<GetGuitarsFilters>({});

  const [params, setParams] = useState({ limit: 10, offset: 0 });

  const {
    data: guitarsData,
    loading: guitarsLoading,
    error: guitarError,
    // refetch,
  } = useQuery(GET_GUITARS_QUERY, {
    variables: {
      limit: params.limit,
      offset: params.offset,
      sort,
      filters,
    },
    fetchPolicy: "network-only",
  });

  const handleOnChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setParams((prev) => ({ ...prev, offset: (page - 1) * prev.limit }));
  };

  const onChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setParams((prev) => ({
      ...prev,
      offset: 0,
      limit: parseInt(event.target.value, 10),
    }));

    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

  const handleSubmitFiltersList: FiltersListProps["handleSubmit"] = ({
    sort,

    ...values
  }) => {
    const sortedItem = sortOptions.find((item) => item.label === sort);
    setSort((prev) => ({
      ...prev,
      ...(sortedItem?.sortBy && { sortBy: sortedItem.sortBy }),
      ...(sortedItem?.sortOrder && { sortOrder: sortedItem.sortOrder }),
    }));
    setFilters((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const { data: wishlistData, fetchWishlist } = useFetchWishList();
  const { data: checkoutData, fetchCheckoutlist } = useFetchCheckoutList();

  useLayoutEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useLayoutEffect(() => {
    fetchCheckoutlist();
  }, [fetchCheckoutlist]);

  return (
    <ShopLayout title="Sklep muzyczny MusicShop">
      <HelmetDecorator title="Sklep" />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <FiltersList handleSubmit={handleSubmitFiltersList} />
        </Grid>

        <Grid item xs={12} lg={9} style={{ position: "relative" }}>
          {guitarsLoading ? (
            "loading..."
          ) : guitarError ? (
            <Typography color={"red"}>
              Wystąpił błąd. Odśwież stronę i spróbuj ponownie
            </Typography>
          ) : guitarsData ? (
            guitarsData.getGuitarsWithDataLoader.totalItems > 0 ? (
              guitarsData.getGuitarsWithDataLoader.data.map(
                ({ __typename, ...guitar }, index) => (
                  <GuitarTile
                    key={guitar._id}
                    data={guitar}
                    noMarginBottom={
                      index + 1 ===
                      guitarsData.getGuitarsWithDataLoader.data.length
                    }
                    isOnWishlist={checkIfIsOnWishlist(guitar._id, wishlistData)}
                    fetchWishlist={fetchWishlist}
                    isOnCheckoutList={checkIfIsOnWishlist(
                      guitar._id,
                      checkoutData
                    )}
                    fetchCheckoutlist={fetchCheckoutlist}
                  />
                )
              )
            ) : (
              "Niestety nie posiadamy instrumentu spełniającego podane kryteria"
            )
          ) : (
            ""
          )}

          {guitarsLoading && <AbsoluteLoadingSpinner />}
        </Grid>
      </Grid>

      <TablePagination
        component="div"
        count={guitarsData?.getGuitarsWithDataLoader.totalItems || 0}
        page={params.offset / params.limit}
        onPageChange={handleOnChangePage}
        rowsPerPage={params.limit}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </ShopLayout>
  );
};

export default ShopView;
