import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import {  contactActions, contactSelector } from "../redux/contactReducer";

function ContactInfo() {
  const { showContactInfo, contactInfo } = useSelector(contactSelector);
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-black bg-opacity-60 w-full rounded-br-lg">
        <div className="flex justify-between items-center m-2 bg-white bg-opacity-35 p-2 rounded-lg">
          <h1 className="uppercase font-bold">Contacts Information</h1>
          <button className="border bg-yellow-400 p-1 font-bold rounded-xl hover:bg-yellow-500 cursor-pointer shadow-md shadow-black/50" onClick={()=>dispatch(contactActions.setShowAddForm())}>
            Add New Contact
          </button>
        </div>
        {showContactInfo ? (
          <div>
            <IoCloseCircle
              className="text-red-500 size-7 ml-4 cursor-pointer "
              onClick={() =>
                dispatch(
                  contactActions.setShowContactInfo({
                    contact: null,
                    target: "button",
                  })
                )
              }
            />

            <div className="flex flex-col justify-center items-center">
              <FaRegCircleUser className="size-24 text-orange-500  border-none " />
              <h1 className="text-yellow-200 font-bold mt-1">
                {contactInfo.username}
              </h1>
            </div>
            <div className="bg-white bg-opacity-15 p-2 rounded-lg">
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200">
                  <span className="text-orange-400">Name:</span>{" "}
                  {contactInfo.name}
                </h2>
              </div>
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200">
                  <span className="text-orange-400">Email:</span>{" "}
                  {contactInfo.email}
                </h2>
              </div>
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200">
                  <span className="text-orange-400">Address:</span>
                </h2>
              </div>
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200 indent-8">
                  <span className="text-orange-400">City:</span>{" "}
                  {contactInfo.address.city}
                </h2>
              </div>
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200 indent-8">
                  <span className="text-orange-400">Street:</span>{" "}
                  {contactInfo.address.street}
                </h2>
              </div>
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200 indent-8">
                  <span className="text-orange-400">Suite:</span>{" "}
                  {contactInfo.address.suite}
                </h2>
              </div>
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200 indent-8">
                  <span className="text-orange-400">ZipCode:</span>{" "}
                  {contactInfo.address.zipcode}
                </h2>
              </div>
              <div className="bg-green-800 bg-opacity-30 rounded p-2 mb-1">
                <h2 className="font-bold text-green-200">
                  <span className="text-orange-400">Company:</span>{" "}
                  {contactInfo.company.name}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-yellow-200 font-bold mt-1">
            Please Choose a contact to view information
          </h1>
        )}
      </div>
    </>
  );
}

export default ContactInfo;
