import { store } from './../index';
// src/store/slices/carTypesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import carData from '../cars.json';

// Define a type for the slice state
interface CarType {
  id: string;
  name: string;
}

interface CarTypesState {
  carTypes: CarType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: CarTypesState = {
  carTypes: [],
  status: 'idle',
  error: null,
};

// First, create the thunk
export const fetchCarTypes = createAsyncThunk('carTypes/fetchCarTypes', async () => {
  try {
    return carData.Makes.map((make: any) => ({
      id: make.make_id,
      name: make.make_display,
    }));
  } catch (error) {
    console.error('Error fetching car types:', error.message);
    throw error;
  }
});

export const carTypesSlice = createSlice({
  name: 'carTypes',
  initialState,
  reducers: {
    // Standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarTypes.fulfilled, (state, action: PayloadAction<CarType[]>) => {
        state.status = 'succeeded';
        // Add any fetched car types to the array
        state.carTypes = action.payload;
      })
      .addCase(fetchCarTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.carTypes.status)`
export const selectAllCarTypes = (state: RootState) => state.carTypes.carTypes;
export const getCarTypesStatus = (state: RootState) => state.carTypes.status;
export const getCarTypesError = (state: RootState) => state.carTypes.error;

export default carTypesSlice.reducer;
