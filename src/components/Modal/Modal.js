import ReactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modal.module.css";

const Backdrop = ({ show, close }) => {
  return <div onClick={close} className={`${styles.backDrop} ${show ? styles.showBackDrop : null}`}></div>;
};

const Overlay = ({ show, close, children }) => {
  return (
    <>
    <div className={`${styles.overlay} ${show ? styles.showOverLay : null}`}>
      <div className={styles.modalContent}>
        <FontAwesomeIcon icon={faXmark} size="lg" border style={{ cursor: "pointer" , marginBottom:"5px" , color:"red"}}  onClick={close} />
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
    </>
  );
};

const Modal = ({ show, closeModal, children }) => {
  return (
    <>
      {ReactDom.createPortal(
        <>
          <Backdrop show={show} close={closeModal} />
          <Overlay show={show} close={closeModal}>
            {children}
          </Overlay>
        </>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
