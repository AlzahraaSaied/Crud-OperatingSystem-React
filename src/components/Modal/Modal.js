import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modal.module.css";

const Backdrop = ({ show, close }) => {
  return <div onClick={close} className={`${styles.backDrop} ${show ? styles.showBackDrop : null}`}></div>;
};

const Overlay = ({ show, close, title, children }) => {
  return (
    <div className={`${styles.overlay} ${show ? styles.showOverLay : null}`}>
      <div className={styles.modalContent}>
        <FontAwesomeIcon icon={faXmark} size="lg" border style={{ cursor: "pointer" , marginBottom:"5px" , color:"red"}}  onClick={close} />
        {title && <h2>{title}</h2>}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

const Modal = ({ show, closeModal, title, children }) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Fragment>
          <Backdrop show={show} close={closeModal} />
          <Overlay show={show} close={closeModal} title={title}>
            {children}
          </Overlay>
        </Fragment>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default Modal;
