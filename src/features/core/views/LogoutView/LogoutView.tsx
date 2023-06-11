import { useApolloClient } from "@apollo/client";
import { removeTokens } from "common/auth/tokens";
import { PATHS_CORE } from "common/constants/paths";
import { Navigate } from "react-router-dom";

const LogoutView = () => {
  const client = useApolloClient();
  client.resetStore();
  removeTokens();
  return <Navigate to={PATHS_CORE.SHOP} />;
};

export default LogoutView;
