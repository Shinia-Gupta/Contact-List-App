import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactsList: [],
  showAddForm: false,
  showContactInfo: false,
  error: null,
  isUpdate: false,
  toDelete: false,
  message: "",
  contactInfo: {},
};

export const fetchContactsThunk = createAsyncThunk(
  "contact/fetchContact",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    // console.log(data);
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
    console.log(filteredContacts);
    //    setContacts(filteredContacts);
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
    console.log(args);
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await resp.json();
    // console.log(data);
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

const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {
    // action creator to toggle the add contact form
    setShowAddForm: (state, action) => {
      state.showAddForm = !state.showAddForm;
    },
    // action creator to toggle the contact info component
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.contactsList = [...action.payload];
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        console.log("fetch contacts rejected");
        state.error = action.payload;
      })
      .addCase(fetchFilteredContactsThunk.fulfilled, (state, action) => {
        // console.log('fetch contacts fulfilled');
        state.contactsList = [...action.payload];
        console.log(state.contactsList);
      })
      .addCase(fetchFilteredContactsThunk.rejected, (state, action) => {
        console.log("fetch contacts rejected");
        state.error = action.payload;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        const newContactList = state.contactsList.filter(
          (cont) => cont.id !== action.payload.id
        );

        state.contactsList = [...newContactList];
        state.message = "Contact deleted successfully!";
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.contactsList.push(action.payload);
        state.message = "Contact added successfully!";
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        const newList = state.contactsList.filter(
          (cont) => cont.id !== action.payload.id
        );
        state.contactsList = [...newList, action.payload];
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
