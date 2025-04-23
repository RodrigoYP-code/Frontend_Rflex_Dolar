import { configureStore } from '@reduxjs/toolkit';
import dollarReducer from './dollarSlice';

const store = configureStore({
  reducer: {
    dollar: dollarReducer,
  },
});

export default store;
