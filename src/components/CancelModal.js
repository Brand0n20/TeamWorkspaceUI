import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CancelModal.module.css";

const CancelModal = ({ onClose, show }) => {
    // We will handle show/hide by props.show value so we have 2 use cases
    // we will pass the show prop wherever we call the CancelModal

    // this line means that the cancelModal won't show nothing if the show is set to false
    const navigate = useNavigate();
    const location = useLocation(); // used to retrieve current URL pathname
    // getting the first part of pathname. Ex. employees/createEmployee -> employees
    const firstPath = location.pathname.split('/')[1];  
    console.log(firstPath);
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
         <div className="modalBody">
         Yes, I want to cancel
        </div>   
        <div className="modalFooter">
            <Button style={{marginRight: "10px"}} onClick={onClose}>Go Back to Form</Button>
            <Button className="btn btn-danger" onClick={cancel}>Cancel</Button>
        </div>
        </div>  
    </div>
    )
};

export default CancelModal;