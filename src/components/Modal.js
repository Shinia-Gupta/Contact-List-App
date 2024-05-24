import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import { useDispatch, useSelector } from "react-redux";
import { contactActions, contactSelector } from "../redux/contactReducer";

const Modal = ({ children }) => {
  // Select relevant state from Redux store
  const { showAddForm, isUpdate } = useSelector(contactSelector);
  const dispatch = useDispatch();

  return createPortal(
    <>
      {/* Render modal only if showAddForm or isUpdate is true */}
      {(showAddForm || isUpdate) && (
        <div className="fixed top-0 z-100 grid h-screen w-screen place-items-center backdrop-blur overflow-auto">
          <div className="relative z-50 min-h-[200px] min-w-[50%] bg-gradient-to-t from-green-900 to-yellow-500 p-4 rounded-3xl shadow-lg shadow-slate-900 mt-[200px]">
            <div className="flex justify-end">
              {/* Close button */}
              <AiOutlineClose
                onClick={() =>
                  dispatch(
                    isUpdate
                      ? contactActions.setShowUpdateForm() // Dispatch action to hide update form
                      : contactActions.setShowAddForm() // Dispatch action to hide add form
                  )
                }
                className="self-end text-2xl cursor-pointer"
              />
            </div>
            {children} {/* Render children components inside the modal */}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root") // Render modal into modal-root element
  );
};

export default Modal;
