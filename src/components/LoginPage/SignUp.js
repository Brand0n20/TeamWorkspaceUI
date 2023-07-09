import React, {useState, useEffect} from "react";
import { fetchAllEmployees } from "../employees/EmployeeService";
import { Button } from "react-bootstrap";
import styles from "../employees/Employees.module.css"

const initialState = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    jobTitle: null,
    department: null
}

export const SignUp = () => {
    let [employeesInfo, setEmployeesInfo] = useState([]);
    const [newUser, setNewUser] = useState("");
    let [apiError, setApiError] = useState(false);
    useEffect(() => {
        fetchAllEmployees(setEmployeesInfo, setApiError);
    }, []);
    
    const handleChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        })
    };

    return (
        <div>
        <form className={styles.form}>
        <div className="form-group">
            <label>First Name: 
            <input
            className="form-control"
            type="text" 
            name="firstName" 
            value={newUser.firstName || ''}
            onChange={(e) => setNewUser({[e.target.name]: e.target.value})} // diff way to do it
            />
            </label>
        </div>
        <div className="form-group">
            <label>Last Name: 
            <input
            className="form-control" 
            type="text" 
            name="lastName" 
            value={newUser.lastName || ''}
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
            value={newUser.email || ''} 
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
            value={newUser.jobTitle || ''}
            onChange={handleChange}  
            />
            </label>
        </div>
        <Button>Sign Up</Button>
        </form>
    </div>
    )

}
