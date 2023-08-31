import { GetGuitarsFromCheckoutQuery } from "__generated__/graphql";

const getCheckoutItemQunantity = <T extends { _id: string }>({
  checkoutItemsIds,
  row,
}: {
  checkoutItemsIds?: GetGuitarsFromCheckoutQuery;
  row: T;
}) => {
  const quantity = checkoutItemsIds?.getGuitarsFromCheckout.data.find(
    (item) => item.id === row._id
  )?.quantity;
  return quantity || 0;
};

export default getCheckoutItemQunantity;
