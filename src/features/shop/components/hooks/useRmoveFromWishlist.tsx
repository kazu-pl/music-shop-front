import { useMutation } from "@apollo/client";
import { gql } from "__generated__";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

const REMOVE_FROM_WISHLIST = gql(/* GraphQL */ `
  mutation RemoveItemfromWishlist($removeItemfromWishlistId: ID!) {
    removeItemfromWishlist(id: $removeItemfromWishlistId) {
      message
    }
  }
`);

const useRmoveFromWishlist = (fetchCheckoutlist: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const [
    removeGuitarFromWishlist,
    { loading: isRemovingFromWishlist, error: removingFromWishlistError },
  ] = useMutation(REMOVE_FROM_WISHLIST, {
    onCompleted(data) {
      const { message } = data.removeItemfromWishlist;
      enqueueSnackbar(message, { variant: "success" });
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleRemoveFromWishlist = useCallback(
    (id: string) => {
      removeGuitarFromWishlist({
        variables: {
          removeItemfromWishlistId: id,
        },
        errorPolicy: "none",
        onCompleted(data) {
          const { message } = data.removeItemfromWishlist;
          enqueueSnackbar(message, { variant: "success" });

          fetchCheckoutlist();
        },
        onError(error, clientOptions) {
          enqueueSnackbar(error.message, { variant: "error" });
        },
      });
    },
    [enqueueSnackbar, removeGuitarFromWishlist, fetchCheckoutlist]
  );

  return {
    handleRemoveFromWishlist,
    isRemovingFromWishlist,
    removingFromWishlistError,
  };
};

export default useRmoveFromWishlist;
