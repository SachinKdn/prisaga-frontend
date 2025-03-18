import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#358D9E',
      light: '#fafafa',
      dark: '#333333',
      contrastText: '#8B8B8B'
    },
    secondary: {
      main: '#16BDCD',
    },
    text:{
      // primary: '#333333',
      primary: '#0F1C1B',
      secondary: '#5B617A',
    }
  },
  typography: {
    // fontFamily: "Poppins, sans-serif"
    fontFamily: 'Sora, Poppins, sans-serif',
  },
  cssVariables: true,
});

export default theme;
