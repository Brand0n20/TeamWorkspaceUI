import React, { useEffect, useState } from "react";
import { createTask } from "./TaskService";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CancelModal from "../CancelModal";
import { TaskFormSchema, isFutureDate } from "../../utils/ValidateForm";
import { fetchAllEmployees } from "../employees/EmployeeService";
import styles from "./Tasks.module.css";


export const CreateTask = () => {

    let initialState = {
        name: null,
        dueDate: null,
        employeeEmail: null
    }


    const [newTask, setNewTask] = useState(initialState);
    const [apiError, setApiError] = useState(false);
    let navigate = useNavigate();
    const [show, setShow] = useState();
    const [validationErrors, setValidationErrors] = useState([]);
    const [employees, setEmployees] = useState([]);

    let descriptionErrorObject = validationErrors.find(e => e.field === 'name');
    let dueDateErrorObject = validationErrors.find(e => e.field === 'dueDate')
    let employeeErrorObject = validationErrors.find(e => e.field == 'employeeEmail')
    let futureDate = isFutureDate(newTask);

    const handleChange = (event) => {
        setNewTask({...newTask, [event.target.name]: event.target.value}); 
    }

    useEffect(() => {
        fetchAllEmployees(setEmployees, setApiError)
    }, []);

    const submitTask = async() => {
        try {
            await TaskFormSchema.validate(newTask, {abortEarly: false});
            await createTask(newTask, setApiError);
            navigate("/tasks");
        }  catch (error) {
            const errors = [];
            error.inner.forEach((e) => {
                errors.push({ field: e.path, message: e.message });
            });
            setValidationErrors(errors);
        }
       
    }


    return (
        <div>
            <form className={styles.form}>
             <div className="form-group">
                <label>Short Description:
                <textarea
                className="form-control"
                type="text" 
                name="name" 
                value={newTask.name || ''} 
                onChange={handleChange}
                />
            {descriptionErrorObject && <span className="text-danger">{descriptionErrorObject.message}</span>}
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
            {dueDateErrorObject && <span className="text-danger">{dueDateErrorObject.message}</span>}
            </label>
            </div>
            <div className="form-group">
                <label>Employee:
                <select
                className="form-control" 
                type="dropdown" 
                name="employeeEmail" 
                value={newTask.employeeEmail || ''} 
                onChange={handleChange}
                >
                <option value="">--None--</option>
                {employees.map(employee => (
                    <option key={employee.email} value={employee.email}>
                        {employee.name}
                    </option>
                )
                )}
                </select>
                {employeeErrorObject && <span className="text-danger">{employeeErrorObject.message}</span>}
                </label>
            </div>
            <Button onClick={submitTask}>Create Task</Button>
            <Button className="btn btn-danger"
            onClick={() => setShow(true)}
            >Cancel</Button>
            <CancelModal onClose={() => setShow(false)} show={show} />
        </form>
        </div>
    )
}