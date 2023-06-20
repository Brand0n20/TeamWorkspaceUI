import React, { useState } from "react";
import { createTask } from "./TaskService";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CancelModal from "../CancelModal";

export const CreateTask = () => {

    let initialState = {
        description: null,
        employeeID: null,
        dueDate: null
    }

    const [newTask, setNewTask] = useState(initialState);
    const [apiError, setApiError] = useState(false);
    let navigate = useNavigate();
    const [show, setShow] = useState();

    const handleChange = (event) => {
        setNewTask({...newTask, [event.target.name]: event.target.value}); 
    }

    const submitTask = async() => {
        await createTask(newTask, setApiError);
        navigate("/tasks");
    }


    return (
        <div>
             <div className="form-group">
                <label>Description: 
                <input
                className="form-control"
                type="text" 
                name="description" 
                value={newTask.description || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <div className="form-group">
                <label>Employee ID: 
                <input
                className="form-control" 
                type="text" 
                name="employeeID" 
                value={newTask.employeeID || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <div className="form-group">
                <label>Due Date: 
                <input
                className="form-control" 
                type="text" 
                name="dueDate" 
                value={newTask.dueDate || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <Button onClick={submitTask}>Create Task</Button>
            <Button className="btn btn-danger"
            onClick={() => setShow(true)}
            >Cancel</Button>
            <CancelModal onClose={() => setShow(false)} show={show} />
        </div>
    )
}