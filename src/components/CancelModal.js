import React from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CancelModal.module.css";

const CancelModal = ({ onClose, show }) => {
    // We will handle show/hide by props.show value so we have 2 use cases
    // we will pass the show prop wherever we call the CancelModal

    const navigate = useNavigate();
    const location = useLocation(); // used to retrieve current URL pathname
    // getting the first part of pathname. Ex. employees/createEmployee -> employees
    const firstPath = location.pathname.split('/')[1];  
    const cancel = () => {
        onClose();
        navigate(`/${firstPath}`);  //dynamic way to go back to URL page path without the endpoint
    }

    if (!show) {
        return null;
    }
    return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
            <h4>Are You Sure You Want to Cancel?</h4>
            </div>
        <div className="modalFooter">
            <Button onClick={onClose}>No</Button>
            <Button className="btn btn-danger" onClick={cancel}>Yes</Button>
        </div>
        </div>  
    </div>
    )
};

export default CancelModal;