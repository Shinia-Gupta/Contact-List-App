**ContactMate**

This is a React application that demonstrates the usage of tooltips for displaying additional information when hovering over or clicking on specific elements. The application allows users to manage a list of contacts, view contact details, add new contacts, update existing contacts, search contacts and delete contacts. 

Go Live on [ContactMate]()

### Features:

1. **Contact List:** Displays a list of contacts fetched from a mock API endpoint. Users can search for specific contacts by entering text in the search input field. Each contact item in the list shows the contact's username, name, and phone number. Users can also edit or delete contacts directly from the list.

2. **Search Functionality:** The application includes a search feature allowing users to filter contacts based on their username. As users type in the search input field, the contact list dynamically updates to display only those contacts whose usernames match the search query.

3. **Contact Info:** When clicking on a contact item in the list, a detailed view of the contact's information is displayed. This includes the contact's username, name, email, address (city, street, suite, zipcode), company name, and phone number. Users can also edit or delete the contact from this view.

4. **Add/Update Contact:** Users can add new contacts or update existing contacts using a modal form. The form includes input fields for username, name, email, address (city, street, suite, zipcode), company name, and phone number. Validation is applied to ensure required fields are filled and proper email format is entered.

5. **Delete Confirmation Modal:** When deleting a contact, a confirmation modal is displayed to ensure the user's intent. This prevents accidental deletions. Users can confirm or cancel the delete operation from the modal.

6. **Toast Notifications:** Toast notifications are displayed at the top-right corner of the screen to provide feedback on contact addition, update, or deletion operations. These notifications fade out after a few seconds.

### Project Structure:

- **`src/components/`**: Contains React components for different parts of the application, such as Navbar, ContactList, ContactInfo, AddUpdateUser, and DeleteConfirmationModal.

- **`src/redux/`**: Contains Redux related files including the contactReducer, actions, and selectors. Thunks are used for handling asynchronous API calls.

- **`public/`**: Contains public assets and the `index.html` file where the root React component is mounted.

### Installation and Setup:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/react-tooltip-app.git
   ```

2. Navigate to the project directory:
   ```
   cd react-tooltip-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   npm start
   ```

The application should now be running locally and can be accessed at `http://localhost:3000`.

### Technologies Used:

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library for managing application state.
- **react-icons**: Library for including icons in React applications.
- **react-toastify**: Library for displaying toast notifications.
- **Tailwind CSS**: Utility-first CSS framework for styling components.
- **JSONPlaceholder**: Fake online REST API for testing and prototyping.
