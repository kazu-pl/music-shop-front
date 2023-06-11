import { Navigate } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { getTokens, isTokenExpired, isUserAdmin } from "common/auth/tokens";

import { useSnackbar } from "notistack";
import { ReactNode } from "react";

export interface PrivateRouteProps {
  children: ReactNode;
  onlyForAdmin?: boolean;
}

const PrivateRoute = ({ children, onlyForAdmin }: PrivateRouteProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const tokens = getTokens();

  if (!tokens) {
    enqueueSnackbar("Zaloguj się", {
      variant: "info",
    });
    return <Navigate to={PATHS_CORE.LOGIN} replace />;
  }

  if (isTokenExpired(tokens!.accessToken)) {
    enqueueSnackbar("Sejsa wygasła", {
      variant: "info",
    });

    return <Navigate to={PATHS_CORE.LOGIN} replace />;
  }

  if (onlyForAdmin && !isUserAdmin()) {
    return <Navigate to={PATHS_CORE.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
