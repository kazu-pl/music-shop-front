import { useCallback } from "react";
import { GetGuitarsWithDataLoaderQuery, Guitar } from "__generated__/graphql";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SERVER_URLs from "common/constants/serverUrls";
import renderMaxLengthText from "utils/renderMaxLengthText";
import Button from "components/Button/Button";
import { PATHS_ADMIN } from "common/constants/paths";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import ColoredIconWrapper from "components/ColoredIconWrapper/ColoredIconWrapper";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMutation } from "@apollo/client";
import { gql } from "__generated__";
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";

const ADD_TO_WISHLIST = gql(/* GraphQL */ `
  mutation AddItemToWishlist($addItemToWishlistId: ID!) {
    addItemToWishlist(id: $addItemToWishlistId) {
      message
    }
  }
`);
const REMOVE_FROM_WISHLIST = gql(/* GraphQL */ `
  mutation RemoveItemfromWishlist($removeItemfromWishlistId: ID!) {
    removeItemfromWishlist(id: $removeItemfromWishlistId) {
      message
    }
  }
`);

export const checkIfIsOnWishlist = (
  itemId: string,
  data?: GetGuitarsWithDataLoaderQuery
) => {
  return !!data?.getGuitarsWithDataLoader.data.filter(
    (item) => item._id === itemId
  ).length;
};

export interface GuitarTileProps {
  data: Guitar;
  noMarginBottom?: boolean;
  isOnWishlist?: boolean;
  fetchWishlist?: () => void;
}

const GuitarTile = ({
  data,
  noMarginBottom,
  isOnWishlist,
  fetchWishlist,
}: GuitarTileProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [addGuitarToWishlist, { loading: isAddingToWishlist }] = useMutation(
    ADD_TO_WISHLIST,
    {
      variables: {
        addItemToWishlistId: data._id,
      },
      onCompleted(data) {
        const { message } = data.addItemToWishlist;
        enqueueSnackbar(message, { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );

  const [removeGuitarFromWishlist, { loading: isRemovingFromWishlist }] =
    useMutation(REMOVE_FROM_WISHLIST, {
      variables: {
        removeItemfromWishlistId: data._id,
      },
      onCompleted(data) {
        const { message } = data.removeItemfromWishlist;
        enqueueSnackbar(message, { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });

  const handleAddToWishlist = useCallback(() => {
    addGuitarToWishlist({
      variables: {
        addItemToWishlistId: data._id,
      },
      errorPolicy: "none",
      onCompleted(data) {
        const { message } = data.addItemToWishlist;
        enqueueSnackbar(message, { variant: "success" });

        fetchWishlist && fetchWishlist();
      },
      onError(error, clientOptions) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  }, [addGuitarToWishlist, data._id, fetchWishlist, enqueueSnackbar]);

  const handleRemoveFromWishlist = useCallback(() => {
    removeGuitarFromWishlist({
      variables: {
        removeItemfromWishlistId: data._id,
      },
      errorPolicy: "none",
      onCompleted(data) {
        const { message } = data.removeItemfromWishlist;
        enqueueSnackbar(message, { variant: "success" });

        fetchWishlist && fetchWishlist();
      },
      onError(error, clientOptions) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  }, [data._id, fetchWishlist, enqueueSnackbar, removeGuitarFromWishlist]);

  return (
    <Grid
      container
      height={200}
      mb={noMarginBottom ? 0 : 2}
      boxShadow={1}
      p={1}
    >
      <Grid height={"100%"} item xs={2}>
        <img
          src={
            data.imageId
              ? SERVER_URLs.FILES(data.imageId)
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
      </Grid>
      <Grid display={"flex"} flexDirection={"column"} item xs={8} pl={1} pr={1}>
        <Box mb={2}>
          <Typography variant="h6">{`${data.producer.name} ${data.name}`}</Typography>
        </Box>
        <Box mb={2}>
          <Typography>{`${renderMaxLengthText(
            data.description,
            100
          )}`}</Typography>
        </Box>
      </Grid>
      <Grid display={"flex"} flexDirection={"column"} item xs={2}>
        <Box mb={2}>
          <Typography variant="h6">{`Cena:`}</Typography>
          <Typography variant="h6">{`${data.price} zł`}</Typography>
        </Box>
        <Box mb={2}>
          <Typography>{`Dostępność: `}</Typography>
          <Typography>{`${data.availability.name}`}</Typography>
        </Box>
        <Box mb={2} display={"flex"}>
          <Button to={PATHS_ADMIN.SINGLE_GUITAR(data._id)}>więcej</Button>
          <IconButton>
            <ColoredIconWrapper color="primary">
              <ShoppingCartIcon />
            </ColoredIconWrapper>
          </IconButton>

          <Tooltip
            title={
              isOnWishlist ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"
            }
          >
            <IconButton
              onClick={
                isOnWishlist ? handleRemoveFromWishlist : handleAddToWishlist
              }
              disabled={
                isOnWishlist ? isRemovingFromWishlist : isAddingToWishlist
              }
            >
              <ColoredIconWrapper color={isOnWishlist ? "success" : "grey"}>
                <FavoriteIcon />
              </ColoredIconWrapper>
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GuitarTile;
