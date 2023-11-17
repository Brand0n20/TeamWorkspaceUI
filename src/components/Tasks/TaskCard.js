import { React, useEffect, useState } from "react";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import styles from './Tasks.module.css'
import { getEmployee } from "../employees/EmployeeService";
import { deleteTask } from "./TaskService";
import { Button } from "react-bootstrap";
import CancelModal from "../CancelModal";
import DeleteModal from "../DeleteModal";

const TaskCard = ( { task, onDelete }) => {
   const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [show, setShow] = useState(false);

    let keys = Object.keys(task);
   
    const handleDelete = async() => {
        await deleteTask(task.id, employee, setApiError);
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
        <h4>Task #{task.id}</h4>
       <li>
        Description: {task.name}
       </li>
       <li>
        Due Date: {task.dueDate}
       </li>
       <li>
        Assigned to: <b>{task.employeeEmail}</b>
       </li>
        </div>
        <Button className="btn btn-danger"
            onClick={() => setShow(true)}
            >Delete</Button>
            <DeleteModal onClose={() => setShow(false)} show={show} handleDelete={handleDelete}/>
        <Button>Update</Button>
    </div>
   )

    
}

export default TaskCard;