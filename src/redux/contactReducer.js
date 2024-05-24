import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for the contactSlice
const initialState = {
  contactsList: [], // Array to store contacts
  showAddForm: false, // Flag to show/hide add contact form
  showContactInfo: false, // Flag to show/hide contact info
  error: null, // Error state
  isUpdate: false, // Flag to indicate whether it's an update operation
  toDelete: false, // Flag to confirm deletion
  message: "", // Message state for success/error messages
  contactInfo: {}, // Object to store contact information
};

// Thunks for fetching, deleting, adding, and updating contacts
export const fetchContactsThunk = createAsyncThunk(
  "contact/fetchContact",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data;
  }
);

export const fetchFilteredContactsThunk = createAsyncThunk(
  "contacts/filteredContacts",
  async (args) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    const filteredContacts = data.filter((contact) =>
      contact.username.toLowerCase().includes(args.toLowerCase())
    );
    return filteredContacts;
  }
);

export const deleteContactThunk = createAsyncThunk(
  "contact/deleteContact",
  async (args) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${args.id}`, {
      method: "DELETE",
    });
    return args;
  }
);

export const addContactThunk = createAsyncThunk(
  "contact/addContact",
  async (args) => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await resp.json();
    return data;
  }
);

export const updateContactThunk = createAsyncThunk(
  "contact/updateContact",
  async (args) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/users/${args.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await resp.json();
    return data;
  }
);

// Define contactSlice
const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {
    // Action creators for toggling various UI states
    setShowAddForm: (state, action) => {
      state.showAddForm = !state.showAddForm;
    },
    setShowContactInfo: (state, action) => {
      if (action.payload.target === "div") {
        state.showContactInfo = true;
        state.contactInfo = action.payload.contact;
      } else {
        state.showContactInfo = false;
        state.contactInfo = null;
      }
    },
    setShowUpdateForm: (state, action) => {
      state.isUpdate = !state.isUpdate;
      state.contactInfo = action.payload;
    },
    setDeleteConfirmation: (state, action) => {
      state.toDelete = !state.toDelete;
      state.contactInfo = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setContactsList: (state, action) => {
      state.contactsList = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.contactsList = [...action.payload];
        localStorage.setItem('contactsList', JSON.stringify(state.contactsList));
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Fetch filtered contacts
      .addCase(fetchFilteredContactsThunk.fulfilled, (state, action) => {
        state.contactsList = [...action.payload];
      })
      .addCase(fetchFilteredContactsThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete contact
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        const newContactList = state.contactsList.filter(
          (cont) => cont.id !== action.payload.id
        );
        state.contactsList = [...newContactList];
        localStorage.removeItem("contactsList");
        localStorage.setItem('contactsList', JSON.stringify(state.contactsList));
        state.message = "Contact deleted successfully!";
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Add contact
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.contactsList.push(action.payload);
        localStorage.removeItem("contactsList");
        localStorage.setItem('contactsList', JSON.stringify(state.contactsList));
        state.message = "Contact added successfully!";
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update contact
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        const newList = state.contactsList.filter(
          (cont) => cont.id !== action.payload.id
        );
        state.contactsList = [...newList, action.payload];
        localStorage.removeItem("contactsList");
        localStorage.setItem('contactsList', JSON.stringify(state.contactsList));
        state.message = "Contact updated successfully!";
      })
      .addCase(updateContactThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const contactReducer = contactSlice.reducer;
export const contactActions = contactSlice.actions;
export const contactSelector = (state) => state.contactReducer;
