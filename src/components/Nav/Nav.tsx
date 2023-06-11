import { PATHS_CORE } from "common/constants/paths";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{ position: "absolute", zIndex: 2 }}>
      <Link to={PATHS_CORE.SHOP}>SHOP</Link>
      <Link to={PATHS_CORE.LOGIN} style={{ marginLeft: 8 }}>
        LOGIN
      </Link>
      <Link to={PATHS_CORE.ACCOUNT} style={{ marginLeft: 8 }}>
        Account
      </Link>
      <Link to={PATHS_CORE.REGISTER} style={{ marginLeft: 8 }}>
        REGISTER
      </Link>
    </nav>
  );
};

export default Nav;
