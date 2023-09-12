import React, {useState, useEffect} from "react";
import { fetchAllEmployees } from "../employees/EmployeeService";
import { Button } from "react-bootstrap";
import styles from "../employees/Employees.module.css"
import { useNavigate } from "react-router-dom";
import { login, register } from "./Login&RegisterService";

const initialState = {
    email: null,
    password: null
}

export const Login = () => {
    let [employeesInfo, setEmployeesInfo] = useState([]);
    const [employee, setEmployee] = useState(initialState);
    let [apiError, setApiError] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        fetchAllEmployees(setEmployeesInfo, setApiError);
    }, []);

    const handleChange = (event)=> {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = async () => {
        login(employee, setApiError);
    }

    const handleRegister = async() => {
        await register(employee, setApiError);
    }

    return (
        <div>
        <form className={styles.form}>
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
            <label>Password: 
            <input
            className="form-control" 
            type="password" 
            name="password" 
            value={employee.password || ''}
            onChange={handleChange} 
            />
            </label>
        </div>
        <Button onClick={handleLogin}>Log In</Button>
        </form>
    </div>
    )

}