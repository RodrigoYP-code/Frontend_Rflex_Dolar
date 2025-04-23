import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/material';
import store from './store';
import DollarValuesComponent from './components/DollarValuesComponent';
import DollarChart from './components/DollarChart';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      
      <Box display="flex" justifyContent="center" mt={4} gap={6}>
        <DollarValuesComponent />
        <DollarChart />
      </Box>
    </LocalizationProvider>
  </Provider>
);
