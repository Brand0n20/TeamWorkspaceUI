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

    let keys = Object.keys(employee); // NOT NEEDED, this just gets the field names of the object
    const unwantedKeys = ["id", "password"]
   

    // DOWN Below, the <strong> element just makes the Bold effect

    return (
        <div className={styles.content}>
             {apiError && (
      <p
        className={styles.errMsg}
        data-testid="errMsg"
      >
        API error
      </p>
      )}
         <div className={styles.employee}>
         <ul>
        {keys.map((key) => (
            // if the current key on the map is not included in the UnwantedKeys array, then display that key
            !unwantedKeys.includes(key) && (   
          <li key={key}>
            <strong>{key}:</strong> {JSON.stringify(employee[key])} 
          </li>
            )
        ))}
      </ul>
        </div>
        <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
    </div>
    )
};