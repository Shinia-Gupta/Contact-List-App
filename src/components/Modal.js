import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { contactActions, contactSelector } from "../redux/contactReducer";

const Modal = ({ children }) => {
    const {showAddForm,isUpdate}=useSelector(contactSelector);
const dispatch=useDispatch();
  return createPortal(
    <>
      {(showAddForm || isUpdate) && (
        <div className="absolute top-0 z-1000 grid h-screen w-screen place-items-center backdrop-blur ">
          <div className="relative z-50 m-auto min-h-[200px] min-w-[50%] bg-gradient-to-t from-green-900 to-yellow-500 p-4 rounded-3xl shadow-lg shadow-slate-900">
            <div className="flex justify-end">
              <AiOutlineClose onClick={()=>dispatch(isUpdate?contactActions.setShowUpdateForm():contactActions.setShowAddForm())} className="self-end text-2xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;