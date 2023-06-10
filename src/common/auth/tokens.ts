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
