import { ADMIN_ACCOUNT_ID } from "common/constants/env";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { DecodedUser } from "types/jwt.types";

const LOCALSTORAGE_AUTH_TOKENS = "tokens-graphql";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const saveTokens = (tokens: Tokens) =>
  localStorage.setItem(LOCALSTORAGE_AUTH_TOKENS, JSON.stringify(tokens));

export const getTokens = (): Tokens | null => {
  const tokens = localStorage.getItem(LOCALSTORAGE_AUTH_TOKENS);

  if (!tokens) return null;

  return JSON.parse(tokens);
};

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode<JwtPayload>(token);

  return decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : true;
};

export const removeTokens = () => {
  localStorage.removeItem(LOCALSTORAGE_AUTH_TOKENS);
};

export const tokenExpiresInSeconds = (token?: string) => {
  if (!token) {
    return 0;
  }

  const decodedToken = jwtDecode<JwtPayload>(token);
  return decodedToken.exp ? decodedToken.exp - Date.now() / 1000 || 0 : 0;
};

export const getUserIdFromToken = () => {
  const tokens = getTokens();
  if (!tokens) {
    return null;
  }
  const decodedToken = jwtDecode<DecodedUser>(tokens.accessToken);
  return decodedToken._id;
};

export const isUserLogged = () => {
  const tokens = getTokens();

  return tokens?.accessToken && !isTokenExpired(tokens.accessToken);
};

export const isUserAdmin = () => {
  return isUserLogged() && getUserIdFromToken() === ADMIN_ACCOUNT_ID;
};
