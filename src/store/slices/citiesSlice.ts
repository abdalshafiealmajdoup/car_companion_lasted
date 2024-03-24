import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import citiesData from './areas.json';

// Async thunk for loading cities data
export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  // Here you might fetch data from an API in a real app
  // For simplicity, we'll just return the citiesData directly
  return citiesData.cities;
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default citiesSlice.reducer;
