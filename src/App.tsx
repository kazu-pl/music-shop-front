import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import {
  ThemeProvider as StyledThemeProvider,
  StyleSheetManager,
} from "styled-components";
import { SnackbarProvider } from "notistack";

import Router from "./Router";
import ErrorBoundary from "./ErrorBoundary";

import muiTheme from "common/theme/muiTheme";
import CssBaseline from "@mui/material/CssBaseline";
import CreateGlobalStyle from "common/styles/globalStyles.styled";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress size={80} />}>
        <StyleSheetManager>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={muiTheme}>
              <StyledThemeProvider theme={muiTheme}>
                <CssBaseline />
                <CreateGlobalStyle />
                <SnackbarProvider>
                  <BrowserRouter>
                    <Router />
                  </BrowserRouter>
                </SnackbarProvider>
              </StyledThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </StyleSheetManager>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
