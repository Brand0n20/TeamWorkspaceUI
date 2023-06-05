import React, {useState} from "react";
import { Button } from "react-bootstrap";
import styles from "./Employees.module.css";
import { createEmployee } from "./EmployeeService";
import { useNavigate } from "react-router-dom";

const initialState = {
    firstName: null,
    lastName: null,
    email: null,
    jobTitle: null,
    department: null
};

export const CreateEmployee = () => {
    const [employee, setEmployee] = useState(initialState);
    const [apiError, setApiError] = useState(false);
    let navigate = useNavigate();

    const handleChange = (event) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    };

    const submitEmployee = () => {
        createEmployee(employee, setApiError);
        navigate('/employees');
    }

    return (
        <div>
            <form className={styles.form}>
            <div className="form-group">
                <label>First Name: 
                <input
                className="form-control"
                type="text" 
                name="firstName" 
                value={employee.firstName || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <div className="form-group">
                <label>Last Name: 
                <input
                className="form-control" 
                type="text" 
                name="lastName" 
                value={employee.lastName || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <div className="form-group">
                <label>Email: 
                <input
                className="form-control" 
                type="text" 
                name="email" 
                value={employee.email || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <div className="form-group">
                <label>Job title: 
                <input
                className="form-control" 
                type="text" 
                name="jobTitle" 
                value={employee.jobTitle || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <div className="form-group">
                <label>Department: 
                <input
                className="form-control" 
                type="text" 
                name="department" 
                value={employee.department || ''} 
                onChange={handleChange}
                />
                </label>
            </div>
            <Button
            style={{ margin: "10px 10px"}}
            onClick={submitEmployee}
            >Submit</Button>
            <Button className="btn btn-danger">Cancel</Button>
            </form>
        </div>

    )
}