export const PATHS_CORE = {
  SHOP: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",
  WISHLIST: "/wishlist",
  CHECKOUT: "/checkout",
  LOGOUT: "/logout",
};

export const PATHS_ADMIN = {
  FILTERS_LIST: "/admin/filters/list",
  ADD_FILTER: "/admin/filters/add",
  SINGLE_FILTER: (filterId: string) => `/admin/filter/${filterId}`,
};
