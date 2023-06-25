import React from "react";
import { Button } from "react-bootstrap";
import styles from "./CancelModal";

const DeleteModal = ({ show, handleDelete, onClose }) => {

    if (!show) {
        return null;
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                <h4>Are You Sure You Want to Delete?</h4>
                </div>
             <div className="modalBody">
             Yes, I want to delete
            </div>   
            <div className="modalFooter">
                <Button style={{marginRight: "10px"}} onClick={onClose}>Go Back</Button>
                <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
            </div>
            </div>  
        </div>
        )
};

export default DeleteModal;