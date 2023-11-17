import React, {useState} from "react";
import { Button } from "react-bootstrap";
import styles from "../employees/Employees.module.css"
import { useNavigate } from "react-router-dom";
import { login } from "./AuthService";
import { LoginFormSchema, ValidateLoginForm } from "../../utils/ValidateForm";

const initialState = {
    username: null,
    password: null
}

export const Login = () => {

    const [employee, setEmployee] = useState(initialState);
    let [apiError, setApiError] = useState(false);
    let navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);

    const handleChange = (event)=> {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = async () => {
        try {
            await login(employee, setApiError);
            navigate('/');

        } catch (error) {
            setApiError(true);
            console.log(apiError);
    }
}


    return (
        <form className={styles.form}>
        <div className="form-group">
            <label>Email:</label>
            <input
            className="form-control" 
            type="text" 
            name="username" 
            value={employee.username || ''} 
            onChange={handleChange}
            />
             {validationErrors.username && <span className="text-danger">{validationErrors.username}</span>}
        </div>
        <div className="form-group">
            <label>Password: </label>
            <input
            className="form-control" 
            type="password" 
            name="password" 
            value={employee.password || ''}
            onChange={handleChange} 
            />
            {validationErrors.password && <span className="text-danger">{validationErrors.password}</span>}
        </div>
        <Button onClick={handleLogin}>Log In</Button>
        </form>
    );
}