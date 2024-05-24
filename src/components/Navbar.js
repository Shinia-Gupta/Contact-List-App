import React from "react";
import { RiContactsBook3Line } from "react-icons/ri";

function Navbar() {
  return (
    <>
      <div className="text-center text-3xl bg-gradient-to-r from-green-900 to-yellow-500 rounded-t-lg uppercase font-bold drop-shadow-lg flex p-3  text-orange-500 items-center">
        <RiContactsBook3Line className="text-orange-300 size-11 mr-2" />
        ContactMate
      </div>
    </>
  );
}

export default Navbar;
