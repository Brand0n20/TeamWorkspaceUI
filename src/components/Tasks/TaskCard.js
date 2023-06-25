import { React, useEffect, useState } from "react";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import styles from './Tasks.module.css'
import { getEmployee } from "../employees/EmployeeService";

const TaskCard = ( { task }) => {
   const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [apiError, setApiError] = useState();


        useEffect(() => {
                let id = task.employeeID;
                getEmployee(id, setEmployee, setApiError);
            
        }, [task]);
   

    console.log(employee);
   return (
    <div className={styles.content}>
        {apiError && (
                <p>
                    {constants.API_ERROR}
                </p>
            )}
         <div className={styles.task}>
        <h4>Task {task.id}</h4>
        <li>
            {task.description}
        </li>
        <li>
            Employee ID:{task.employeeID}
        </li>
        <li>
            Employee Email: {employee.email}
        </li>
        <li>
            Due Date:{task.dueDate}
        </li>
        </div>
    </div>
   )

    
}

export default TaskCard;