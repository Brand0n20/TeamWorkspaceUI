import React, { useState } from "react";
import styles from "./Employees.module.css";
import { Button } from "react-bootstrap";
import { deleteEmployee } from "./EmployeeService";
import DeleteModal from "../DeleteModal";

export const EmployeeCard = ({ employee, onDelete }) => {

    let [apiError, setApiError] = useState();
    const [show, setShow] = useState(false);

    const handleDelete = async() => {
        await deleteEmployee(employee.id, employee, setApiError);
        console.log("Deleting");
        onDelete(employee);
    };

    return (
        <div className={styles.content}>
             {apiError && (
      <p
        className={styles.errMsg}
        data-testid="errMsg"
      >
        API error
      </p>)}
         <div className={styles.employee}>
        <h4>{employee.firstName} {employee.lastName}</h4>
        <li>
            {employee.email}
        </li>
        <li>
            {employee.jobTitle}
        </li>
        <li>
            Department: {employee.department}
        </li>
        </div>
        <Button className="btn btn-danger" onClick={(() => setShow(true))}>Delete</Button>
        <DeleteModal onClose={() => setShow(true)} show={show} handleDelete={handleDelete}></DeleteModal>
    </div>
    )
};