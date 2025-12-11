import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Contact } from '../types/contact';

interface ContactsState {
  list: Contact[];
  searchQuery: string;
  selectedIds: string[];
}

const initialState: ContactsState = {
  list: [],
  searchQuery: '',
  selectedIds: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.list.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const index = state.list.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    deleteContact(state, action: PayloadAction<string>) {
      const idToDelete = action.payload;
      state.list = state.list.filter(contact => contact.id !== idToDelete);
      state.selectedIds = state.selectedIds.filter(id => id !== idToDelete);
    },

    deleteMultipleContacts(state, action: PayloadAction<string[]>) {
      const idsToDelete = action.payload;
      state.list = state.list.filter(contact => !idsToDelete.includes(contact.id));
      state.selectedIds = [];
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    toggleContactSelection(state, action: PayloadAction<string>) {
      const contactId = action.payload;
      const isAlreadySelected = state.selectedIds.includes(contactId);
      
      if (isAlreadySelected) {
        state.selectedIds = state.selectedIds.filter(id => id !== contactId);
      } else {
        state.selectedIds.push(contactId);
      }
    },

    selectAllContacts(state, action: PayloadAction<string[]>) {
      state.selectedIds = action.payload;
    },

    clearAllSelections(state) {
      state.selectedIds = [];
    },
  },
});

export const {
  addContact,
  updateContact,
  deleteContact,
  deleteMultipleContacts,
  setSearchQuery,
  toggleContactSelection,
  selectAllContacts,
  clearAllSelections,
} = contactsSlice.actions;

export default contactsSlice.reducer;
