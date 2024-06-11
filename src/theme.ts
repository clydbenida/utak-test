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
  })
}

// export const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#FF6347', // Tomato Red
//       dark: '#333333', // Dark Charcoal
//       light: '#F5F5F5', // Off-White
//       contrastText: '#FFFDD0', // Cream
//     },
//     secondary: {
//       main: '#FF7F50', // Sunset Orange
//       contrastText: '#FFFDD0', // Cream
//     },
//     background: {
//       default: '#F5F5F5', // Off-White
//       paper: '#FFFDD0', // Cream
//     },
//     text: {
//       primary: '#333333', // Dark Charcoal
//       secondary: '#6E6E6E', // Warm Gray
//     },
//     // accent: {
//     //   main: '#9ACD32', // Sage Green
//     // },
//     warning: {
//       main: '#FFD700', // Harvest Gold
//       contrastText: '#8B4513', // Cocoa Brown
//     },
//   },
// });
//
