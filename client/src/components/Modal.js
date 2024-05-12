import React from "react";

function Modal(props) {
  const msgModal = props.dataModal.msgModal;
  const titleModal = props.dataModal.titleModal;
  const colorModalBtn = props.dataModal.colorModalBtn;
  const textModalBtn = props.dataModal.textModalBtn;
  const action = props.action;
  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {titleModal}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">{msgModal}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className={`btn ${colorModalBtn} `} onClick={action}>
              {textModalBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
