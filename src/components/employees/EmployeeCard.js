import React, { useEffect, useState } from "react";
import styles from "./Employees.module.css";
import { Button } from "react-bootstrap";
import { deleteEmployee, fetchEmployeeByEmail, fetchEmployeeEmails } from "./EmployeeService";
import { object } from "yup";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeTasks } from "./EmployeeService";

export const EmployeeCard = ({ employee, onDelete, employeeRole }) => {

    let [apiError, setApiError] = useState();
    let navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    let taskNames = [];
    const handleDelete = async() => {
        await deleteEmployee(employee.email, employee, setApiError);
        onDelete(employee);
    };

    let keys = Object.keys(employee); // NOT NEEDED, this just gets the field names of the object
    let role = employee.role;
    delete role.id;
    const unwantedKeys = ["id", "password"];
    
    useEffect(() => {
      fetchEmployeeTasks(employee.email, setTasks, setApiError);
    }, [])

    // Iterates over tasks array, gets the name of each task and pushes it to the taskNames array
    for (let i=0; i < tasks.length; i++) {
      taskNames.push(tasks[i].name);
    }

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
        <li>
          <strong>Tasks Assigned: </strong>{taskNames.join(', ')}
        </li>
      </ul>
        </div>
        {employeeRole == 'ADMIN' && 
        <><Button className="btn btn-danger" onClick={handleDelete}>Delete</Button><Button className="btn btn-secondary" onClick={() => navigate(`/employees/${employee.email}`)}>Update</Button></>
        }
    </div>
    )
};