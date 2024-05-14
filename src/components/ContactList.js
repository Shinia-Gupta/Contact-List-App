import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  contactActions,
  contactSelector,
  fetchContactsThunk,
  fetchFilteredContactsThunk,
} from "../redux/contactReducer";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdPersonSearch } from "react-icons/md";

function ContactList() {
  const { contactsList } = useSelector(contactSelector);
  const dispatch = useDispatch();

  // const handleDelete =async (e, contact) => {

  //   try{
  //   e.stopPropagation();
  // await  dispatch(deleteContactThunk(contact));
  //   dispatch(
  //     contactActions.setShowContactInfo({ contact: null, target: "button" })
  //   );

  //   toast.success("Contact deleted successfully !")
  // }catch(err){
  //   toast.error(error);
  // }
  // };

  const handleUpdate = (e, contact) => {
    e.stopPropagation();
    dispatch(contactActions.setShowUpdateForm(contact));
  };
  useEffect(() => {
    dispatch(fetchContactsThunk());
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
              dispatch(fetchFilteredContactsThunk(e.target.value))
            }
          />
          <MdPersonSearch className="absolute right-0 mr-2 size-6 text-orange-400" />
        </div>
        {contactsList.map((contact) => (
          <div
            className="flex gap-2 ml-2 items-center justify-between border border-b-1 border-t-0 border-l-0 border-r-0 p-2 border-yellow-100 cursor-pointer"
            key={contact.id}
            onClick={() =>
              dispatch(
                contactActions.setShowContactInfo({ contact, target: "div" })
              )
            }
          >
            <div className="flex gap-2 items-center">
              <div>
                <FaRegCircleUser className=" shadow-md shadow-black/50 size-5 text-white" />
              </div>

              <div>
                <h1 className="text-yellow-600 font-bold">
                  {contact.username}
                </h1>
                <p className="text-yellow-400 font-medium text-xs">
                  {contact.phone.slice(0, contact.phone.indexOf("x")).trim()}
                </p>
              </div>
            </div>
            <div className="flex gap-1 ">
              <FaUserEdit
                className="size-5 text-yellow-500 shadow-md shadow-black/50 cursor-pointer"
                onClick={(e) => handleUpdate(e, contact)}
              />
              <MdDelete
                className="size-5 text-red-700 shadow-md shadow-black/50 cursor-pointer"
                onClick={(e) =>
                  dispatch(contactActions.setDeleteConfirmation(contact))
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
