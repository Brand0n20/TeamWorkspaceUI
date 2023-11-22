import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Tasks.module.css";
import { fetchSingleTask, updateTask } from "./TaskService";
import CancelModal from "../CancelModal";
import { Button } from "react-bootstrap";
import { fetchAllEmployees } from "../employees/EmployeeService";
import { isFutureDate } from "../../utils/ValidateForm";
import { TaskFormSchema } from "../../utils/ValidateForm";

export const TaskDetails = () => {
    let { id } = useParams();
    const [task, setTask] = useState([]);
    const [employees, setEmployees]= useState([]);
    const [apiError, setApiError] = useState(false);
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    let descriptionErrorObject = validationErrors.find(e => e.field === 'name');
    let dueDateErrorObject = validationErrors.find(e => e.field === 'dueDate')
    let employeeErrorObject = validationErrors.find(e => e.field == 'employeeEmail')
    let futureDate = isFutureDate(task);

    useEffect(() => {
        fetchSingleTask(id, setTask, setApiError);
        fetchAllEmployees(setEmployees, setApiError)
    }, [id])

    const handleChange = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value
        });
    };

    const submitUpdate = async () => {
        try {
        await TaskFormSchema.validate(task, {abortEarly: false});
        if (id == task.id) {
        await updateTask(id, task, setApiError);
        }
        navigate('/tasks');
        } catch (error) {
            const errors = [];
            error.inner.forEach((e) => {
                errors.push({ field: e.path, message: e.message });
            });
            setValidationErrors(errors);
        }
    };

    return (
        <div>
        <form className={styles.form}>
         <div className="form-group">
            <label>Short Description:
            <textarea
            className="form-control"
            type="text" 
            name="name" 
            value={task.name || ''} 
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
            value={task.dueDate || ''} 
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
            value={task.employeeEmail || ''} 
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
        <Button onClick={submitUpdate}>Update Task</Button>
        <Button className="btn btn-danger"
        onClick={() => setShow(true)}
        >Cancel</Button>
        <CancelModal onClose={() => setShow(false)} show={show} />
    </form>
    </div>
    )
}