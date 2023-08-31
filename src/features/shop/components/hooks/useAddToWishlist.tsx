import { useMutation } from "@apollo/client";
import { gql } from "__generated__";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

const ADD_TO_WISHLIST = gql(/* GraphQL */ `
  mutation AddItemToWishlist($addItemToWishlistId: ID!) {
    addItemToWishlist(id: $addItemToWishlistId) {
      message
    }
  }
`);

const useAddToWishlist = (fetchCheckoutlist: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const [
    addGuitarToWishlist,
    { loading: isAddingToWishlist, error: addingToWishlistError },
  ] = useMutation(ADD_TO_WISHLIST, {
    onCompleted(data) {
      const { message } = data.addItemToWishlist;
      enqueueSnackbar(message, { variant: "success" });
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleAddToWishlist = useCallback(
    (id: string) => {
      addGuitarToWishlist({
        variables: {
          addItemToWishlistId: id,
        },
        errorPolicy: "none",
        onCompleted(data) {
          const { message } = data.addItemToWishlist;
          enqueueSnackbar(message, { variant: "success" });

          fetchCheckoutlist();
        },
        onError(error, clientOptions) {
          enqueueSnackbar(error.message, { variant: "error" });
        },
      });
    },
    [addGuitarToWishlist, enqueueSnackbar, fetchCheckoutlist]
  );

  return {
    handleAddToWishlist,
    isAddingToWishlist,
    addingToWishlistError,
  };
};

export default useAddToWishlist;
