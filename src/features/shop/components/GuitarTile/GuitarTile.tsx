import { GetGuitarsWithDataLoaderQuery, Guitar } from "__generated__/graphql";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SERVER_URLs from "common/constants/serverUrls";
import renderMaxLengthText from "utils/renderMaxLengthText";
import Button from "components/Button/Button";
import { PATHS_CORE } from "common/constants/paths";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ColoredIconWrapper from "components/ColoredIconWrapper/ColoredIconWrapper";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import useAddProductToCheckout from "features/shop/views/CheckoutView/hooks/useAddProductToCheckout";
import useRmoveFromWishlist from "../hooks/useRmoveFromWishlist";
import useAddToWishlist from "../hooks/useAddToWishlist";
import getAvailabilityColor from "features/shop/utils/getAvailabilityColor";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  isOnCheckoutList?: boolean;
  fetchWishlist: () => void;
  fetchCheckoutlist: () => void;
}

const GuitarTile = ({
  data,
  noMarginBottom,
  isOnWishlist,
  isOnCheckoutList,
  fetchWishlist,
  fetchCheckoutlist = () => {},
}: GuitarTileProps) => {
  const { handleAddToCheckout, isAddingToCheckout } =
    useAddProductToCheckout(fetchCheckoutlist);

  const { handleRemoveFromWishlist, isRemovingFromWishlist } =
    useRmoveFromWishlist(fetchWishlist);
  const { handleAddToWishlist, isAddingToWishlist } =
    useAddToWishlist(fetchWishlist);

  return (
    <Grid
      container
      height={200}
      mb={noMarginBottom ? 0 : 2}
      boxShadow={1}
      p={1}
    >
      <Grid height={"100%"} item xs={2}>
        <LazyLoadImage
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
            250
          )}`}</Typography>
        </Box>
      </Grid>
      <Grid display={"flex"} flexDirection={"column"} item xs={2}>
        <Box mb={2}>
          <Typography variant="h6">
            {`Cena:`}{" "}
            <Typography
              variant="h6"
              component={"span"}
              color={"brown"}
            >{`${data.price} zł`}</Typography>
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography>{`Dostępność: `}</Typography>
          <Typography
            color={getAvailabilityColor(data.availability.name)}
          >{`${data.availability.name}`}</Typography>
        </Box>
        <Box mb={2} display={"flex"}>
          <Button to={PATHS_CORE.GUITAR_DETAILS(data._id)}>więcej</Button>
          <Tooltip
            title={
              isOnCheckoutList
                ? "Ten produkt już znajduje się w koszyku. Dodaj kolejną sztukę"
                : "Dodaj do koszyka"
            }
          >
            <IconButton
              onClick={() => handleAddToCheckout(data._id)}
              disabled={isAddingToCheckout}
            >
              <ColoredIconWrapper color={isOnCheckoutList ? "primary" : "grey"}>
                <ShoppingCartIcon />
              </ColoredIconWrapper>
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              isOnWishlist ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"
            }
          >
            <IconButton
              onClick={
                isOnWishlist
                  ? () => handleRemoveFromWishlist(data._id!)
                  : () => handleAddToWishlist(data._id!)
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
