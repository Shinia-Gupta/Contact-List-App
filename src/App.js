import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ContactList from "./components/ContactList";
import ContactInfo from "./components/ContactInfo";
import AddUpdateUser from "./components/AddUpdateUser";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

function App() {
  return (
    <>
      {/* Main layout */}
      <div className="app m-10">
        {/* Navbar component */}
        <Navbar />
        
        {/* Main content area */}
        <div className="md:flex sm:bloc w-full">
          {/* ContactList component */}
          <ContactList />
          
          {/* ContactInfo component */}
          <ContactInfo />
        </div>
        
        {/* AddUpdateUser component for adding and updating contacts */}
        <AddUpdateUser />
        
        {/* DeleteConfirmationModal component */}
        <DeleteConfirmationModal />
      </div>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
