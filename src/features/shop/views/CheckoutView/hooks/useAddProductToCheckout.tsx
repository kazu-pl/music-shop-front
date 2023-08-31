import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "__generated__";
import { useSnackbar } from "notistack";

const ADD_ITEM_TO_CHECKOUT = gql(/* GraphQL */ `
  mutation AddItemToCheckout($addItemToCheckoutId: ID!) {
    addItemToCheckout(id: $addItemToCheckoutId) {
      message
    }
  }
`);

const useAddProductToCheckout = (fetchCheckoutlist: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const [
    addProductToCheckout,
    { loading: isAddingToCheckout, error: addingToCheckoutError },
  ] = useMutation(ADD_ITEM_TO_CHECKOUT, {
    onCompleted(data) {
      const { message } = data.addItemToCheckout;
      enqueueSnackbar(message, { variant: "success" });
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleAddToCheckout = useCallback(
    (id: string) => {
      addProductToCheckout({
        variables: {
          addItemToCheckoutId: id,
        },
        errorPolicy: "none",
        onCompleted(data) {
          const { message } = data.addItemToCheckout;
          enqueueSnackbar(message, { variant: "success" });

          fetchCheckoutlist();
        },
        onError(error, clientOptions) {
          enqueueSnackbar(error.message, { variant: "error" });
        },
      });
    },
    [enqueueSnackbar, addProductToCheckout, fetchCheckoutlist]
  );

  return {
    handleAddToCheckout,
    isAddingToCheckout,
    addingToCheckoutError,
  };
};
export default useAddProductToCheckout;
