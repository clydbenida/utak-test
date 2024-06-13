import { createTheme } from "@mui/material";
import { ThemeMode } from "./types/types";

export const generateTheme = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#FF6347', // Tomato Red
        dark: '#333333', // Dark Charcoal
        light: '#F5F5F5', // Off-White
        contrastText: '#FFFDD0', // Cream
      },
      secondary: {
        main: '#FF7F50', // Sunset Orange
        contrastText: '#FFFDD0', // Cream
      },
      background: {
        default: '#Ffffff', // White
        paper: '#FFFFFF', // White
      },
      text: {
        primary: '#333333', // Dark Charcoal
        secondary: '#6E6E6E', // Warm Gray
      },
      success: {
        main: '#9ACD32', // Sage Green
      },
      warning: {
        main: '#FFD700', // Harvest Gold
        contrastText: '#8B4513', // Cocoa Brown
      },
    },
    components: {
      MuiSelect: {
        styleOverrides: {
          select: {
            padding: "0.8rem",
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '1px solid transparent',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '1px solid #6e6e6e',
            },
            '&.Mui-focused:after': {
              borderBottom: '1px solid #FF6347',
            },
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "contained", color: "primary" },
            style: {
              ":hover": {
                backgroundColor: "#FF6347df",
              }
            }
          }
        ],
        styleOverrides: {
          root: {
            ":disabled": {
              backgroundColor: "#888",
              color: "#ddd",
            }
          }
        }
      },
    },
    typography: {
      fontFamily: "Inter"
    }
  })
}
