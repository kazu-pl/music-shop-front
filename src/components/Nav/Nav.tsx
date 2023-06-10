import { PATHS_CORE } from "common/constants/paths";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to={PATHS_CORE.SHOP}>SHOP</Link>
      <Link to={PATHS_CORE.LOGIN} style={{ marginLeft: 8 }}>
        LOGIN
      </Link>
      <Link to={PATHS_CORE.ACCOUNT} style={{ marginLeft: 8 }}>
        Account
      </Link>
    </nav>
  );
};

export default Nav;
