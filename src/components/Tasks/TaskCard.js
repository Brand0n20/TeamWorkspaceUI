import { React, useEffect, useState } from "react";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import styles from './Tasks.module.css'
import { getEmployee } from "../employees/EmployeeService";
import { deleteTask } from "./TaskService";
import { Button } from "react-bootstrap";
import DeleteModal from "../DeleteModal";

const TaskCard = ( { task, onDelete }) => {
   const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [apiError, setApiError] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
                let id = task.employeeID;
                getEmployee(id, setEmployee, setApiError);
            
    }, [task]);
   
    const handleDelete = async() => {
        await deleteTask(task.id, employee, setApiError);
        console.log("Deleting");
        onDelete(task);
    };

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
        <Button className="btn btn-danger" onClick={(() => setShow(true))}>Delete</Button>
        <DeleteModal onClose={() => setShow(false)} show={show} handleDelete={handleDelete} />
        <Button className="btn btn-warning" onClick={() => navigate(`/tasks/${task.id}`)}>Update</Button>
    </div>
   )

    
}

export default TaskCard;