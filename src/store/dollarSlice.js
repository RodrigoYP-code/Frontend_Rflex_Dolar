import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDollarValues, updateDollarValue, deleteDollarValue } from '../services/dollarService';

export const getDollarValues = createAsyncThunk(
  'dollar/fetch',
  async ({ startDate, endDate }) => {
     console.log('🔁 Thunk dispatch:', startDate, endDate);
    const response = await fetchDollarValues(startDate, endDate);
    return response.data; 
  }
  
);
export const updateDollar = createAsyncThunk(
  'dollar/update',
  async ({ fecha, newValue }) => {
    const response = await updateDollarValue(fecha, newValue);
    return response.data; 
  }
);
export const deleteDollar = createAsyncThunk(
  'dollar/delete',
  async (fecha) => {
    await deleteDollarValue(fecha);
    return fecha;
  }
);

const dollarSlice = createSlice({
  name: 'dollar',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDollarValues.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDollarValues.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDollarValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDollar.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.data.findIndex(d => d.fecha === updated.fecha);
        if (index !== -1) {
          state.data[index] = updated;
        }
      })
      .addCase(deleteDollar.fulfilled, (state, action) => {
        const fecha = action.payload;
        state.data = state.data.filter(d => d.fecha !== fecha);
      });
  },
});

export default dollarSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// // Estado inicial vacío
// const initialState = {
//   dollarValues: [],
//   loading: false,
//   error: null,
// };

// // Crear el slice de Redux
// const dollarSlice = createSlice({
//   name: 'dollar',
//   initialState,
//   reducers: {
//     setDollarValues: (state, action) => {
//       state.dollarValues = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// // Exportar las acciones
// export const { setDollarValues, setLoading, setError } = dollarSlice.actions;

// // Exportar el reducer
// export default dollarSlice.reducer;
