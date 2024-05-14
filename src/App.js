import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import ContactInfo from './components/ContactInfo';
import AddUpdateUser from './components/AddUpdateUser';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
  
  <>
  <div className='app m-10'>
    <Navbar/>
    <div className='flex'>
      <ContactList/>
      <ContactInfo/>
    </div>
    <AddUpdateUser/>
  </div>
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
