import React, { Fragment } from "react";
import "./Modal.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Modal = (props) => {
  const value = props.name2;
  const flag = true;
  if (value === null) {
    flag = false;
  }

  return (
    <Fragment>
      <div className="modal">
        <FontAwesomeIcon icon={faXmark} className="closeButton" />
        <div className="modalInfo">
          <span>{props.name}</span>
          <br />
          {flag && <span>{value}</span>}
          {flag && <br />}
          <button className="modalButton" style={{ marginRight: "10px" }}>
            예
          </button>
          <button className="modalButton" style={{ marginLeft: "10px" }}>
            아니오
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
