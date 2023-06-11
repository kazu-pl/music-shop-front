import { Routes, Route } from "react-router-dom";
import { PATHS_CORE } from "./common/constants/paths";
import ShopView from "features/shop/views/ShopView";
import AccountView from "features/core/views/AccountView";
import LoginView from "features/core/views/LoginView";
import RegisterView from "features/core/views/RegisterView";
import LogoutView from "features/core/views/LogoutView";
import PrivateRoute from "common/auth/PrivateRoute";
import PublicOnlyRoute from "common/auth/publicOnlyRoute";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path={PATHS_CORE.SHOP} element={<ShopView />} />
        <Route
          path={PATHS_CORE.LOGIN}
          element={
            <PublicOnlyRoute>
              <LoginView />
            </PublicOnlyRoute>
          }
        />
        <Route
          path={PATHS_CORE.LOGOUT}
          element={
            <PrivateRoute>
              <LogoutView />
            </PrivateRoute>
          }
        />
        <Route
          path={PATHS_CORE.REGISTER}
          element={
            <PublicOnlyRoute>
              <RegisterView />
            </PublicOnlyRoute>
          }
        />
        <Route
          path={PATHS_CORE.ACCOUNT}
          element={
            <PrivateRoute>
              <AccountView />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
