import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contact {
  id?: number;
  name: string;
  email: string;
  subject: string;
  description: string;
}

interface ContactState {
  contacts: Contact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactState = {
  contacts: [],
  status: 'idle',
  error: null,
};

// Async thunk actions
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/contacts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contactData: Contact, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/contacts', contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/api/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ContactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.contacts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong deleting the contact';
      });
  },
});

export default ContactSlice.reducer;
