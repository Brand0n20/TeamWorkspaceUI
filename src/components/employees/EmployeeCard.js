import React, { useState } from "react";
import styles from "./Employees.module.css";
import { Button } from "react-bootstrap";
import { deleteEmployee } from "./EmployeeService";

export const EmployeeCard = ({ employee, onDelete }) => {

    let [apiError, setApiError] = useState();
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
        <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
    </div>
    )
};