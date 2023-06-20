import { React, useEffect, useState } from "react";
import { fetchSingleTask } from "./TaskService";
import { useNavigate } from "react-router-dom";
import styles from './Tasks.module.css'

const TaskCard = ( {task }) => {
   const navigate = useNavigate;

   return (
    <div className={styles.content}>
         <div className={styles.task}>
        <h4>Task</h4>
        <li>
            {task.description}
        </li>
        <li>
            Employee ID:{task.employeeID}
        </li>
        <li>
            Due Date:{task.dueDate}
        </li>
        </div>
    </div>
   )

    
}

export default TaskCard;