import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useEffect } from "react";

const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function ThemeProvider({ children }) {
  useEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);
  const theme = createTheme({
    direction: "rtl",
    palette: {
      mode: "light",
      primary: {
        main: "#017785",
      },
      secondary: {
        main: "#1976d2",
      },
    },
    typography: {
      fontFamily: "IRANSans, Vazirmatn, sans-serif",
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default ThemeProvider;
