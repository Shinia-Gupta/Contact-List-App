import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  contactActions,
  contactSelector,
  fetchContactsThunk,
  fetchFilteredContactsThunk,
} from "../redux/contactReducer";
import { FaRegCircleUser } from "react-icons/fa6"; // Import user icon
import { FaUserEdit } from "react-icons/fa"; // Import edit icon
import { MdDelete } from "react-icons/md"; // Import delete icon
import { MdPersonSearch } from "react-icons/md"; // Import search icon

function ContactList() {
  const { contactsList } = useSelector(contactSelector); // Retrieve contacts list from Redux store
  const dispatch = useDispatch();

  const handleUpdate = (e, contact) => {
    e.stopPropagation();
    dispatch(contactActions.setShowUpdateForm(contact)); // Dispatch action to show update form with selected contact
  };

  useEffect(() => {
    // Fetch contacts from localStorage or API on component mount
    const contactsList = JSON.parse(localStorage.getItem("contactsList") || "[]");
    if (contactsList.length !== 0) {
      dispatch(contactActions.setContactsList(contactsList)); // Set contacts from localStorage if available
    } else {
      dispatch(fetchContactsThunk()); // Fetch contacts from API if localStorage is empty
    }
  }, []);

  return (
    <>
      <div className="bg-green-900 p-2 rounded-bl-xl min-h-[80vh] md:w-2/5 flex-shrink-0 sm:w-full">
        <h1 className="text-orange-600 text-xl font-bold uppercase text-center mb-1">
          Contacts
        </h1>
        <hr className="" />

        <div className="flex relative items-center ">
          <input
            type="text"
            placeholder="Search contact"
            className="w-full mt-2 rounded-xl text-center text-green-900 text-opacity-80 font-bold bg-white bg-opacity-40 border border-orange-400 p-1"
            onChange={(e) =>
              dispatch(fetchFilteredContactsThunk(e.target.value)) // Dispatch action to filter contacts based on search input
            }
          />
          <MdPersonSearch className="absolute right-0 mr-2 size-6 text-orange-400" /> {/* Search icon */}
        </div>
        {contactsList.map((contact) => (
          <div
            className="flex gap-2 ml-2 items-center justify-between border border-b-1 border-t-0 border-l-0 border-r-0 p-2 border-yellow-100 cursor-pointer"
            key={contact.id}
            onClick={() =>
              dispatch(
                contactActions.setShowContactInfo({ contact, target: "div" }) // Dispatch action to show contact info on click
              )
            }
          >
            <div className="flex gap-2 items-center">
              <div>
                <FaRegCircleUser className="shadow-md shadow-black/50 size-5 text-white" /> {/* User icon */}
              </div>

              <div>
                <h1 className="text-yellow-600 font-bold">
                  {contact.username}
                </h1>
                <p className="text-yellow-400 font-medium text-xs">
                  {contact.phone.slice(0, contact.phone.indexOf("x")).trim()} {/* Display phone number */}
                </p>
              </div>
            </div>
            <div className="flex gap-1 ">
              <FaUserEdit
                className="size-5 text-yellow-500 shadow-md shadow-black/50 cursor-pointer"
                onClick={(e) => handleUpdate(e, contact)} // Handle update icon click
              />
              <MdDelete
                className="size-5 text-red-700 shadow-md shadow-black/50 cursor-pointer"
                onClick={(e) =>
                  dispatch(contactActions.setDeleteConfirmation(contact)) // Dispatch action to show delete confirmation
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContactList;
