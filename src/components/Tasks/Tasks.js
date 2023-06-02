import React, { useEffect, useState} from "react"
import fetchAllTasks from "./TaskService";
import constants from "../../utils/constants";
import styles from './Tasks.module.css';
import TaskCard from './TaskCard'

/**
 * A page where the tasks will be displayed
 */
const TasksPage = () => {
    const [apiError, setApiError] = useState();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchAllTasks(setTasks, setApiError);
    }, []);
    console.log(tasks);

    return (
        <div>
            {apiError && (
                <p>
                    {constants.API_ERROR}
                </p>
            )}
            <h1 style={{ marginLeft: 15}}>Total Tasks</h1>
            <div>
                {tasks.map(task => (
                    <div key={task.id} className={styles.tasks}>
                        <TaskCard data-testid="task" task={task} />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TasksPage;