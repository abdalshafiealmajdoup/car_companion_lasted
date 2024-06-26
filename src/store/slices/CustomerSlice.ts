import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Customer {
  id?: number;
  Name: string;
  Phone: string;
  Email: string;
  Password?: string;
}

interface CustomerState {
  customers: Customer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  tokenCustomer: string | null;
}

const initialState: CustomerState = {
  customers: [], 
  status: 'idle',
  error: null,
  tokenCustomer: null,
};

// Async thunk actions
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerCustomer = createAsyncThunk(
  'customers/register',
  async (customerData: Customer, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/customers/register', customerData);
      localStorage.setItem('tokenCustomer', response.data.access_token);
      localStorage.setItem('customerID', response.data.data.CustomerID);
      localStorage.setItem('customerEmail', response.data.data.Email);
      localStorage.setItem('customerPhone', response.data.data.Phone);
      return {
        id: response.data.customer.id,
        Name: customerData.Name,
        Phone: customerData.Phone,
        Email: customerData.Email,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginCustomer = createAsyncThunk(
  'customers/login',
  async (loginData: { Email: string; Password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/customers/login', loginData);
      localStorage.setItem('tokenCustomer', response.data.access_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutCustomer = createAsyncThunk(
  'customers/logout',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('tokenCustomer');
      await axios.post('http://localhost:8000/api/customers/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('tokenCustomer');
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (customerData: Customer, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('tokenCustomer');
      const response = await axios.put(`http://localhost:8000/api/customers/${customerData.id}`, customerData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (CustomerID: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('tokenCustomer');
      await axios.delete(`http://localhost:8000/api/customers/${CustomerID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return CustomerID;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  'customers/forgetPassword',
  async (phone: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/customers/forgot-password', { Phone: phone });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'customers/verifyOTP',
  async (otpData: { Phone: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/customers/verify-otp', otpData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'customers/resetPassword',
  async (resetData: { Phone: string; new_password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/customers/reset-password', resetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearCustomerData(state) {
      state.customers = [];
      state.tokenCustomer = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCustomers.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
      state.status = 'succeeded';
    })
    .addCase(fetchCustomers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    })
    // Handling registerCustomer
    .addCase(registerCustomer.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(registerCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload); 
      state.status = 'succeeded';
      state.tokenCustomer = localStorage.getItem('tokenCustomer'); 
    })
    .addCase(registerCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    })
    // Handling loginCustomer
    .addCase(loginCustomer.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loginCustomer.fulfilled, (state, action: PayloadAction<{ access_token: string }>) => {
      state.status = 'succeeded';
      state.tokenCustomer = action.payload.access_token; 
    })
    .addCase(loginCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    }).addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
      const updatedCustomer = action.payload;
      const index = state.customers.findIndex(customer => customer.id === updatedCustomer.id);
      if (index !== -1) {
        state.customers[index] = updatedCustomer;
      }
      state.status = 'succeeded';
    })
    .addCase(updateCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    })
    .addCase(deleteCustomer.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<number>) => {
      state.customers = state.customers.filter(customer => customer.CustomerID !== action.payload);
      state.status = 'succeeded';
    })
    .addCase(deleteCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something went wrong deleting the customer';
    })
    // Handling logoutCustomer
    .addCase(logoutCustomer.fulfilled, (state) => {
      state.tokenCustomer = null; 
      state.status = 'idle';
    })
    .addCase(forgetPassword.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(forgetPassword.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Handle any further state updates if necessary
    })
    .addCase(forgetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    })

    // Verify OTP
    .addCase(verifyOTP.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(verifyOTP.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Handle successful verification
    })
    .addCase(verifyOTP.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    })

    // Reset Password
    .addCase(resetPassword.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Optional: Clear customer data or update state
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const { clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
