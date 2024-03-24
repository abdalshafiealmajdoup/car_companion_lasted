import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ServiceCenter {
  id?: number;
  Name: string;
  Phone: string;
  Email: string;
  ServicesOffered: string;
  CarTypesServiced: string;
  City: string;
  Region: string;
  Password?: string;
}

interface ServiceCenterState {
  serviceCenters: ServiceCenter[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  token: string | null;
}

const initialState: ServiceCenterState = {
  serviceCenters: [],
  status: 'idle',
  error: null,
  token: null,
};

// Async thunk actions
export const fetchServiceCenters = createAsyncThunk(
  'serviceCenters/fetchServiceCenters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/service-centers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerServiceCenter = createAsyncThunk(
  'serviceCenters/register',
  async (serviceCenterData: Omit<ServiceCenter, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/service-centers/register', serviceCenterData);
      localStorage.setItem('serviceCenterToken', response.data.token);
      return response.data.service_center;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginServiceCenter = createAsyncThunk(
  'serviceCenters/login',
  async (credentials: Pick<ServiceCenter, 'Email' | 'Password'>, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/service-centers/login', credentials);
      localStorage.setItem('serviceCenterToken', response.data.access_token);
      localStorage.setItem('serviceCenterID', response.data.serviceCenterID);
      localStorage.setItem('serviceCenterName', response.data.serviceCenterName);
      localStorage.setItem('serviceCenterPhone', response.data.serviceCenterPhone);
      localStorage.setItem('serviceCenterEmail', response.data.serviceCenterEmail);


      return { token: response.data.access_token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutServiceCenter = createAsyncThunk(
  'serviceCenters/logout',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('serviceCenterToken');
      await axios.post('http://localhost:8000/api/service-centers/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('serviceCenterToken');
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateServiceCenter = createAsyncThunk(
  'serviceCenters/updateServiceCenter',
  async ({ id, ...dataToUpdate }: Partial<ServiceCenter> & { id: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('serviceCenterToken');
      const response = await axios.put(`http://localhost:8000/api/service-centers/${id}`, dataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('serviceCenterName', response.data.Name);
      localStorage.setItem('serviceCenterEmail', response.data.Email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteServiceCenter = createAsyncThunk(
  'serviceCenters/deleteServiceCenter',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('serviceCenterToken');
      await axios.delete(`http://localhost:8000/api/service-centers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const serviceCenterSlice = createSlice({
  name: 'serviceCenters',
  initialState,
  reducers: {
    clearServiceCenterData(state) {
      state.serviceCenters = [];
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceCenters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServiceCenters.fulfilled, (state, action: PayloadAction<ServiceCenter[]>) => {
        state.serviceCenters = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchServiceCenters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerServiceCenter.fulfilled, (state, action: PayloadAction<ServiceCenter>) => {
        state.serviceCenters.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(updateServiceCenter.fulfilled, (state, action: PayloadAction<ServiceCenter>) => {
        const index = state.serviceCenters.findIndex(center => center.id === action.payload.id);
        if (index !== -1) {
          state.serviceCenters[index] = { ...state.serviceCenters[index], ...action.payload };
        }
        state.status = 'succeeded';
      })
      . addCase(deleteServiceCenter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteServiceCenter.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.serviceCenters = state.serviceCenters.filter(center => center.CenterID !== action.payload);
      })
      .addCase(deleteServiceCenter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong deleting the service center';
      });
  },
});

export const { clearServiceCenterData } = serviceCenterSlice.actions;
export default serviceCenterSlice.reducer;
