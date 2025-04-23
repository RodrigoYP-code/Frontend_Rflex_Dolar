import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/material';
import store from './store';
import DollarValuesComponent from './components/DollarValuesComponent';
import DollarChart from './components/DollarChart';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    mode: 'light', // cambia a 'dark' si prefieres
    primary: { main: '#1976d2' },
    background: { default: '#f9f9f9' },
  },
});

root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <Box display="flex" justifyContent="center" mt={4} gap={6}>
        <DollarValuesComponent />
        <DollarChart />
      </Box>
      </ThemeProvider>
    </LocalizationProvider>
  </Provider>
);
