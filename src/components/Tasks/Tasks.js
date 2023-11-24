import React, { useEffect, useState} from "react"
import { fetchAllTasks } from "./TaskService";
import constants from "../../utils/constants";
import styles from './Tasks.module.css';
import TaskCard from './TaskCard'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { SearcBar } from "../Search Bar/SearchBar";

/**
 * A page where the tasks will be displayed
 */
const TasksPage = () => {
    const [apiError, setApiError] = useState();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [deletedTask, setDeletedTask] = useState([]);
    let [noInput, setNoInput] = useState(true);

    const onDelete = (taskToDelete) => {
        setDeletedTask({...deletedTask, taskToDelete});
        //deleted.push(taskToDelete)
    }

    useEffect(() => {
        if (noInput) {
        fetchAllTasks(setTasks, setApiError);
        }
    }, [deletedTask, noInput]); 

    return (
        <div>
            {apiError && (
                <p>
                    {constants.API_ERROR}
                </p>
            )}
            <h1 style={{ marginLeft: 15}}>Total Tasks</h1>
            <span>
            <SearcBar tasks={tasks} setTasks={setTasks} setNoInput={setNoInput} setApiError={setApiError}/>
        </span>
            <div>
                {tasks.map(task => (
                    <div key={task.id} className={styles.tasks}>
                        <TaskCard data-testid="task" task={task} onDelete={onDelete}/>
                    </div>
                ))}
            </div>
            <div>
            <Button style={{marginLeft: '10px'}}
            onClick={() => navigate('/tasks/create')}> New Task</Button>
        </div>
        </div>
    )
};

export default TasksPage;