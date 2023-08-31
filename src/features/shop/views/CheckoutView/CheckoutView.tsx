import { useEffect } from "react";
import ShopLayout from "layouts/ShopLayout";
import HelmetDecorator from "components/HelmetDecorator";
import Table from "components/Table/Table";
import SERVER_URLs from "common/constants/serverUrls";
import { GetGuitarsWithDataLoaderQuery } from "__generated__/graphql";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useFetchCheckoutList from "./hooks/useFetchCheckoutList";
import getCheckoutItemQunantity from "./utils/getQunantity";
import useAddProductToCheckout from "./hooks/useAddProductToCheckout";
import useRemoveProductFromCheckout from "./hooks/useRemoveProductFromCheckout";
import Button from "components/Button/Button";
import { gql } from "__generated__";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

const RESET_WHOLE_CHECKOUT = gql(/* GraphQL */ `
  mutation ResetWholeCheckout {
    resetWholeCheckout {
      message
    }
  }
`);

const CheckoutView = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, error, fetchCheckoutlist, loading, checkoutItemsIds } =
    useFetchCheckoutList();

  useEffect(() => {
    fetchCheckoutlist();
  }, [fetchCheckoutlist]);

  const [removeGuitarFromWishlist, { loading: isResetingCheckout }] =
    useMutation(RESET_WHOLE_CHECKOUT, {
      onCompleted(data) {
        enqueueSnackbar("Złożone przez ciebie zamówienie zostało przyjęte!", {
          variant: "success",
        });
        fetchCheckoutlist();
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });

  const { handleAddToCheckout, isAddingToCheckout } =
    useAddProductToCheckout(fetchCheckoutlist);
  const { handleRemoveFromCheckout, isRemovingFromCheckout } =
    useRemoveProductFromCheckout(fetchCheckoutlist);

  const getTotalValue = () =>
    data?.getGuitarsWithDataLoader.data.reduce((acc, next) => {
      const currentItemQuantity =
        checkoutItemsIds?.getGuitarsFromCheckout.data.find(
          (item) => item.id === next._id
        )?.quantity || 0;

      return acc + currentItemQuantity * next.price;
    }, 0);

  return (
    <ShopLayout title="Koszyk">
      <HelmetDecorator title="Koszyk" />
      {error ? (
        <Typography color={"red"}>
          Wystąpił błąd. Sprawdź połączenie i spróbuj ponownie
        </Typography>
      ) : (
        <>
          <Table
            isLoading={loading}
            // for some reason I need to pass ` || ([] as Character[])` in order to make react-snap work
            data={
              data?.getGuitarsWithDataLoader.data ||
              ([] as GetGuitarsWithDataLoaderQuery["getGuitarsWithDataLoader"]["data"])
            }
            tableName={"Filtry"}
            isFiltersBarVisibleInitially={true}
            columns={[
              {
                title: "Zdjęcie",
                key: "photo",
                render: (row) => (
                  <Box height={"50px"}>
                    <img
                      src={
                        row.imageId
                          ? SERVER_URLs.FILES(row.imageId)
                          : "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg"
                      }
                      alt="gitara"
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "block",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ),
              },
              {
                title: "Nazwa",
                key: "name",
                render: (row) => (
                  <Link
                    to={PATHS_CORE.GUITAR_DETAILS(row._id)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {row.producer.name} {row.name}
                  </Link>
                ),
              },
              {
                title: "Cena za 1 szt.",
                key: "oneQuantityPrice",
                render: (row) => `${row.price}zł`,
              },
              {
                title: "Ilość Sztuk",
                key: "quantity",
                render: (row) =>
                  // checkoutItemsIds?.getGuitarsFromCheckout.data.find(
                  //   (item) => item.id === row._id
                  // )?.quantity,
                  getCheckoutItemQunantity({ checkoutItemsIds, row }),
                // isSortable: true,
              },
              {
                title: "Wartość",
                key: "totalPrice",
                render: (row) =>
                  `${
                    getCheckoutItemQunantity({ checkoutItemsIds, row }) *
                    row.price
                  }zł`,
                // isSortable: true,
              },

              {
                title: "Akcje",
                key: "actions",
                noWrap: true,
                render: (row) => (
                  <Box display="flex">
                    <Tooltip title="Dodaj kolejną sztukę">
                      <IconButton
                        onClick={() => handleAddToCheckout(row._id)}
                        disabled={isAddingToCheckout}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="usuń sztukę">
                      <IconButton
                        onClick={() => handleRemoveFromCheckout(row._id)}
                        disabled={isRemovingFromCheckout}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ),
              },
            ]}
          />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>
                Wartość produktów:{" "}
                <Typography color={"brown"} component={"span"}>
                  {getTotalValue()}
                  zł
                </Typography>
              </Typography>

              <Box mt={4} display={"flex"} justifyContent={"flex-end"}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => removeGuitarFromWishlist()}
                  disabled={!getTotalValue() || isResetingCheckout}
                >
                  Złóż zamówienie
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </ShopLayout>
  );
};

export default CheckoutView;
