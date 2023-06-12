import { Container, Typography } from "@mui/material";
import AppBar from "components/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { PATHS_ADMIN, PATHS_CORE } from "common/constants/paths";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ColoredIconWrapper from "components/ColoredIconWrapper/ColoredIconWrapper";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  getTokens,
  isTokenExpired,
  isUserAdmin,
  isUserLogged,
} from "common/auth/tokens";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useLazyQuery } from "@apollo/client";
import { useLayoutEffect } from "react";
import { gql } from "__generated__";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const GET_USER_DATA_FOR_SHOPLAYOUT = gql(/* GraphQL */ `
  query GetUserDataForShopLayout {
    getUserData {
      name
      surname
      email
      street
      streetNumber
      postalCode
      city
      phone
    }
  }
`);

export interface ShopLayoutProps {
  children?: React.ReactNode;
  title: string;
  extra?: React.ReactNode;
}

const ShopLayout = ({ children, title, extra }: ShopLayoutProps) => {
  const [fetch, { data }] = useLazyQuery(GET_USER_DATA_FOR_SHOPLAYOUT, {
    errorPolicy: "all",
  });

  useLayoutEffect(() => {
    const tokens = getTokens();
    if (tokens && !isTokenExpired(tokens.accessToken || "")) {
      fetch();
    }
  }, [fetch, title]);

  return (
    <>
      <AppBar
        userData={
          data?.getUserData.name
            ? {
                title: data?.getUserData.name
                  ? `Witaj, ${data?.getUserData.name}`
                  : "",
              }
            : undefined
        }
        additionalControls={
          <Box display="flex" alignItems={"center"} justifyContent={"center"}>
            <Badge badgeContent={1} color="error">
              {/* @ts-ignore */}
              <IconButton LinkComponent={Link} to={PATHS_CORE.CHECKOUT}>
                <ColoredIconWrapper color="white">
                  <ShoppingCartIcon />
                </ColoredIconWrapper>
              </IconButton>
            </Badge>
            <Box
              ml={2}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Badge badgeContent={2} color="error">
                {/* @ts-ignore */}
                <IconButton LinkComponent={Link} to={PATHS_CORE.WISHLIST}>
                  <ColoredIconWrapper color="white">
                    <FavoriteIcon />
                  </ColoredIconWrapper>
                </IconButton>
              </Badge>
            </Box>
          </Box>
        }
        logo={
          // @ts-ignore
          <IconButton LinkComponent={Link} to={PATHS_CORE.SHOP}>
            <ColoredIconWrapper color="white">
              <StorefrontIcon />
            </ColoredIconWrapper>
          </IconButton>
        }
        userDropdown={
          isUserLogged()
            ? isUserAdmin()
              ? [
                  {
                    icon: <StorefrontIcon />,
                    label: "Sklep",
                    to: PATHS_CORE.SHOP,
                  },
                  {
                    icon: <AccountBoxIcon />,
                    label: "Konto",
                    to: PATHS_CORE.ACCOUNT,
                  },
                  {
                    icon: <DashboardIcon />,
                    label: "panel admina",
                    to: PATHS_ADMIN.FILTERS_LIST,
                  },
                  {
                    icon: <LogoutIcon />,
                    label: "Wyloguj",
                    isErrorColor: true,
                    to: PATHS_CORE.LOGOUT,
                  },
                ]
              : [
                  {
                    icon: <StorefrontIcon />,
                    label: "Sklep",
                    to: PATHS_CORE.SHOP,
                  },
                  {
                    icon: <AccountBoxIcon />,
                    label: "Konto",
                    to: PATHS_CORE.ACCOUNT,
                  },
                  {
                    icon: <LogoutIcon />,
                    label: "Wyloguj",
                    isErrorColor: true,
                    to: PATHS_CORE.LOGOUT,
                  },
                ]
            : [
                {
                  icon: <StorefrontIcon />,
                  label: "Sklep",
                  to: PATHS_CORE.SHOP,
                },
                {
                  icon: <LoginIcon />,
                  label: "Zaloguj się",
                  to: PATHS_CORE.LOGIN,
                },
                {
                  icon: <PersonAddIcon />,
                  label: "Zarejestruj się",
                  to: PATHS_CORE.REGISTER,
                },
              ]
        }
      />
      <Container>
        <Box
          mt={2}
          mb={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h4" component={"h1"}>
            {title}
          </Typography>

          {extra}
        </Box>
        <>{children}</>
      </Container>
    </>
  );
};

export default ShopLayout;
