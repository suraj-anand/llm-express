import { createPortal } from "react-dom"
import { IoMdClose } from "react-icons/io";

const Modal = ({
    title,
    showClose=true,
    closeName="Close",
    closeClass="",
    closeIcon=null,
    saveName="Save",
    saveClass="",
    saveIcon=null,
    handleSave = () => {},
    handleClose = () => {},
    closeRef=null,
    saveRef=null,
    modalId="generic-modal",
    children
}) => {
  
    return createPortal(
    <>
        <div className="modal" tabIndex="-1" id={modalId}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="!bg-slate-800 modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    { showClose && <button type="button" className="ms-auto" data-bs-dismiss="modal" aria-label="Close"><IoMdClose size={24} /></button> }
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" ref={closeRef} className={`btn ${closeClass}`} data-bs-dismiss="modal" onClick={handleClose}>
                        {closeIcon} {closeName}
                    </button>
                    
                    <button type="button" ref={saveRef} className={`btn ${saveClass}`} data-bs-dismiss="modal" onClick={handleSave}>
                        {saveName} {saveIcon}
                    </button>
                </div>
                </div>
            </div>
        </div>
    </>, 
        document.getElementById("modal")
    );   
}

export default Modal