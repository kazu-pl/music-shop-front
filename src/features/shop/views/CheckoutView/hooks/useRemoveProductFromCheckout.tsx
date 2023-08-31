import { useMutation } from "@apollo/client";
import { gql } from "__generated__";
import { useSnackbar } from "notistack";
import { useCallback } from "react";

const REMOVE_ITEM_FROM_CHECKOUT = gql(/* GraphQL */ `
  mutation RemoveItemfromCheckout($removeItemfromCheckoutId: ID!) {
    removeItemfromCheckout(id: $removeItemfromCheckoutId) {
      message
    }
  }
`);

const useRemoveProductFromCheckout = (fetchCheckoutlist: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const [
    removeGuitarFromWishlist,
    { loading: isRemovingFromCheckout, error: removingFromCheckoutError },
  ] = useMutation(REMOVE_ITEM_FROM_CHECKOUT, {
    onCompleted(data) {
      const { message } = data.removeItemfromCheckout;
      enqueueSnackbar(message, { variant: "success" });
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleRemoveFromCheckout = useCallback(
    (id: string) => {
      removeGuitarFromWishlist({
        variables: {
          removeItemfromCheckoutId: id,
        },
        errorPolicy: "none",
        onCompleted(data) {
          const { message } = data.removeItemfromCheckout;
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
    handleRemoveFromCheckout,
    isRemovingFromCheckout,
    removingFromCheckoutError,
  };
};
export default useRemoveProductFromCheckout;
