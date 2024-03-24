import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Admin {
  AdminID?: number;
  Name: string;
  Email: string;
  Password?: string;
}

interface AdminState {
  list: Admin[];
  currentAdmin?: Admin;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  tokenAdmin: string | null;
}

const initialState: AdminState = {
  list: [], 
  currentAdmin: undefined,
  status: 'idle',
  error: null,
  tokenAdmin: null,
}
export const fetchAllAdmins = createAsyncThunk('admins/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8000/api/admins');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const registerAdmin = createAsyncThunk('admins/register', async (adminData: Admin, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/admins/register', adminData);
    localStorage.setItem('tokenAdmin', response.data.token);
    localStorage.setItem('AdminID', response.data.admin.AdminID);
    localStorage.setItem('AdminEmail', response.data.admin.Email);
    localStorage.setItem('AdminName', response.data.admin.Name);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginAdmin = createAsyncThunk('admins/login', async (loginData: { Email: string; Password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/admins/login', loginData);
    localStorage.setItem('tokenAdmin', response.data.access_token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutAdmin = createAsyncThunk('admins/logout', async (_, { rejectWithValue, dispatch }) => {
  try {
    await axios.post('http://localhost:8000/api/admins/logout', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`,
      },
    });
    localStorage.removeItem('tokenAdmin');
    dispatch(clearAdminData());
    return true;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const updateAdmin = createAsyncThunk(
    'admins/update',
    async (updateData: { AdminID: number; Name?: string; Email?: string; Password?: string; }, { rejectWithValue }) => {
      try {
        const { AdminID, ...dataToUpdate } = updateData;
        const response = await axios.put(`http://localhost:8000/api/admins/${AdminID}`, dataToUpdate, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`,
          },
        });
        localStorage.setItem('AdminEmail', response.data.admin.Email);
        localStorage.setItem('AdminName', response.data.admin.Name);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const deleteAdmin = createAsyncThunk(
    'admins/delete',
    async (AdminID: number, { rejectWithValue, dispatch }) => {
      try {
        const response = await axios.delete(`http://localhost:8000/api/admins/${AdminID}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`,
          },
        });
        dispatch(clearAdminData()); 
        return AdminID;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  const adminSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
      clearAdminData(state) {
        state.currentAdmin = undefined;
        state.tokenAdmin = null;
        state.status = 'idle';
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchAllAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action: PayloadAction<Admin[]>) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
        .addCase(registerAdmin.fulfilled, (state, action: PayloadAction<{ admin: Admin; token: string }>) => {
          state.currentAdmin = action.payload.admin;
          state.tokenAdmin = action.payload.token;
          state.status = 'succeeded';
        })
        .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<{ access_token: string; admin: Admin }>) => {
          state.currentAdmin = action.payload.admin;
          state.tokenAdmin = action.payload.access_token;
          state.status = 'succeeded';
        })
        .addCase(updateAdmin.fulfilled, (state, action) => {
          if (action.payload && action.payload.admin) {
            state.currentAdmin = action.payload.admin; 
          }
          state.status = 'succeeded';
        })
        .addCase(deleteAdmin.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteAdmin.fulfilled, (state, action: PayloadAction<number>) => {
          state.list = state.list.filter(admin => admin.AdminID !== action.payload);
          state.status = 'succeeded';
        })
        .addCase(deleteAdmin.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Something went wrong deleting the admin.';
        })
        .addMatcher(action => action.type.endsWith('/pending'), (state) => {
          state.status = 'loading';
        })
        .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        });
    },
  });
  export const { clearAdminData } = adminSlice.actions;
  export default adminSlice.reducer;