import React from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CancelModal.module.css";

const DeleteModal = ({ onClose, show, handleDelete }) => {
    // We will handle show/hide by props.show value so we have 2 use cases
    // we will pass the show prop wherever we call the CancelModal

    const navigate = useNavigate();
    const location = useLocation(); // used to retrieve current URL pathname
    // getting the first part of pathname. Ex. employees/createEmployee -> employees
    const firstPath = location.pathname.split('/')[1];  
    const confirmDelete = () => {
        handleDelete();
        onClose();
    }

    if (!show) {
        return null;
    }
    return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <h4>Is this task completed?</h4>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button className="btn btn-success" onClick={confirmDelete}>Yes</Button>
            <Button className="btn btn-warning" onClick={onClose}>No</Button>
        </div>
        </div>  
    </div>
    )
};

export default DeleteModal;