import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";

import { generateTheme } from "./theme";
import { useAppSelector } from './redux/hooks';

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  const themeMode = useAppSelector(state => state.app.themeMode);

  const customTheme = useMemo(() => generateTheme(themeMode), [themeMode]);
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
