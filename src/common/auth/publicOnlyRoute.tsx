import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { getTokens, isTokenExpired } from "common/auth/tokens";

export interface PublicOnlyRouteProps {
  children: ReactNode;
}

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const tokens = getTokens();

  if (
    tokens &&
    !isTokenExpired(tokens!.refreshToken) &&
    !isTokenExpired(tokens!.accessToken)
  ) {
    return <Navigate to={PATHS_CORE.SHOP} replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
