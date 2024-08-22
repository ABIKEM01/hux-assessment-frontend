import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface ContactsState {
  contacts: Contact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (token: string) => {
    const response = await axios.get('http://localhost:5000/api/contacts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex((contact) => contact._id === action.payload._id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch contacts';
      });
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
