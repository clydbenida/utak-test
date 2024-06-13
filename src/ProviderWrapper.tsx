import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";

import { generateTheme } from "./theme";

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {

  const customTheme = useMemo(() => generateTheme(), []);
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
