import { Routes, Route } from "react-router-dom";
import { PATHS_CORE } from "./common/constants/paths";
import ShopView from "features/shop/views/ShopView";
import AccountView from "features/shop/views/AccountView";
import LoginView from "features/core/views/LoginView";
import RegisterView from "features/core/views/RegisterView";
import Nav from "components/Nav";

const Router = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path={PATHS_CORE.SHOP} element={<ShopView />} />
        <Route path={PATHS_CORE.LOGIN} element={<LoginView />} />
        <Route path={PATHS_CORE.REGISTER} element={<RegisterView />} />
        <Route path={PATHS_CORE.ACCOUNT} element={<AccountView />} />
      </Routes>
    </div>
  );
};

export default Router;
