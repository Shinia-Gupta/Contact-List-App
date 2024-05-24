import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  contactActions,
  contactSelector,
  deleteContactThunk,
} from "../redux/contactReducer";
import { toast } from "react-toastify";

const DeleteConfirmationModal = () => {
  // Select relevant state from Redux store
  const { toDelete, contactInfo, error } = useSelector(contactSelector);
  const dispatch = useDispatch();

  // Function to handle contact deletion
  const handleDelete = async (e, contactInfo) => {
    e.stopPropagation(); // Prevent event propagation

    try {
      // Dispatch deleteContactThunk to delete contact
      await dispatch(deleteContactThunk(contactInfo));
      // Reset delete confirmation state and contact info
      dispatch(contactActions.setDeleteConfirmation(contactInfo));
      dispatch(
        contactActions.setShowContactInfo({ contact: null, target: "button" })
      );
      // Show success message
      toast.success("Contact deleted successfully !");
    } catch (err) {
      // Show error message if deletion fails
      toast.error(error);
    }
  };

  // Effect to handle body overflow when modal is opened or closed
  useEffect(() => {
    const body = document.querySelector("body");
    if (toDelete) {
      body.style.overflow = "hidden"; // Disable scrolling
    } else {
      body.style.overflow = "auto"; // Enable scrolling
    }
    // Revert back to initial state when unmounting
    return () => {
      body.style.overflow = "auto";
    };
  }, [toDelete]); // Dependency array ensures effect runs only when toDelete changes

  // Render modal using createPortal to a separate DOM node
  return createPortal(
    <>
      {/* Render modal if toDelete is true */}
      {toDelete && (
        <div className="absolute top-0 z-1000 grid h-screen w-screen  place-items-center backdrop-blur ">
          <div className="relative z-50 m-auto min-h-[150px] min-w-[30%] bg-black p-4 rounded-3xl shadow-lg shadow-slate-900">
            <div className="flex justify-end"></div>
            <div>
              <h1 className="font-bold text-white text-lg mb-2">
                Are you sure you want to delete this contact?
              </h1>
              <div className="flex justify-end">
                {/* Button to confirm deletion */}
                <button
                  className="font-bold mr-3 p-2 rounded-lg  bg-red-800 text-white"
                  onClick={(e) => handleDelete(e, contactInfo)}
                >
                  Confirm
                </button>
                {/* Button to cancel deletion */}
                <button
                  className="font-bold mr-3 p-2 rounded-lg  bg-green-600 text-white"
                  onClick={() =>
                    dispatch(
                      contactActions.setDeleteConfirmation(contactInfo)
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root") // Render modal into modal-root element
  );
};

export default DeleteConfirmationModal;
