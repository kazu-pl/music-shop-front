import { useEffect } from "react";

import ShopLayout from "layouts/ShopLayout/ShopLayout";
import HelmetDecorator from "components/HelmetDecorator/HelmetDecorator";
import GuitarTile from "../../components/GuitarTile";
import Typography from "@mui/material/Typography";
import useFetchWishList from "./useFetchWishList";
import { checkIfIsOnWishlist } from "features/shop/components/GuitarTile/GuitarTile";

const WishListView = () => {
  const { data, error, loading, fetchWishlist } = useFetchWishList();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <ShopLayout title="Lista życzeń">
      <HelmetDecorator title="Lista życzeń" />
      {loading ? (
        "loading..."
      ) : error ? (
        <Typography color={"red"}>
          Wystąpił błąd. Odśwież stronę i spróbuj ponownie
        </Typography>
      ) : data ? (
        data.getGuitarsWithDataLoader.totalItems > 0 ? (
          data.getGuitarsWithDataLoader.data.map(
            ({ __typename, ...guitar }, index) => (
              <GuitarTile
                key={guitar._id}
                data={guitar}
                noMarginBottom={
                  index + 1 === data.getGuitarsWithDataLoader.data.length
                }
                isOnWishlist={checkIfIsOnWishlist(guitar._id, data)}
                fetchWishlist={fetchWishlist}
              />
            )
          )
        ) : (
          "Twoja lista życzeń jest pusta."
        )
      ) : (
        ""
      )}
    </ShopLayout>
  );
};

export default WishListView;
