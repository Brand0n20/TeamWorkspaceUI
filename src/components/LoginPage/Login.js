import React, {useState} from "react";
import { Button } from "react-bootstrap";
import styles from "../employees/Employees.module.css"
import { useNavigate } from "react-router-dom";
import { login } from "./AuthService";
import constants from "../../utils/constants";

const initialState = {
    username: null,
    password: null
}

export const Login = () => {

    const [employee, setEmployee] = useState(initialState);
    let [apiError, setApiError] = useState(false);
    let navigate = useNavigate();

    const handleChange = (event)=> {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = async () => {
        await login(employee, setApiError);
        navigate('/');
    }

    return (
        <div>
            {apiError && (
                <p>
                    {constants.API_ERROR}
                </p>
            )}
        <form className={styles.form}>
        <div className="form-group">
            <label>Email: 
            <input
            className="form-control" 
            type="text" 
            name="username" 
            value={employee.username || ''} 
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
    );
}