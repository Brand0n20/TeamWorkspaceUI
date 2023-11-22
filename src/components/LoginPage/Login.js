import React, {useState} from "react";
import { Button } from "react-bootstrap";
import styles from "../employees/Employees.module.css"
import { useNavigate } from "react-router-dom";
import { login } from "./AuthService";
import { LoginFormSchema, ValidateLoginForm } from "../../utils/ValidateForm";
import { useData } from "../../utils/DataProvider";

const initialState = {
    username: null,
    password: null
}

export const Login = () => {

    const [employee, setEmployee] = useState(initialState);
    let [apiError, setApiError] = useState(false);
    let navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);
    const { currentUser, setCurrentUser } = useData();

    let usernameValidationError = validationErrors.find(e => e.field === 'username');
    let passwordValidationError = validationErrors.find(e => e.field === 'password');

    let displayApiError = 'User credentials are incorrect';

    const handleChange = (event)=> {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = async () => {
        try {
            await LoginFormSchema.validate(employee, {abortEarly: false});
            const response = await login(employee, setApiError);
            if (response.ok) {
                navigate('/');
                setCurrentUser(employee);
            } else if (response.status === 403) {
                // Handle the 403 status accordingly, for example, show an error message.
                console.log('Employee not found');
                displayApiError('Employee not found');
                setApiError(true);
            } else {
                // Handle other error statuses if needed.
                console.log('Something went wrong with the request');
            }
        } catch (error) {
            let errors = [];
            if (error instanceof TypeError) {
                setValidationErrors([]);
                setApiError(true);
                console.log("No employee found");
            } else {
            console.log(error);
            error.inner.forEach((e) => {
                errors.push({ field: e.path, message: e.message });
            });
            setValidationErrors(errors);
            }
        }
    }


    return (
        <div>
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
             {usernameValidationError && <span className="text-danger">{usernameValidationError.message}</span>}
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
            {passwordValidationError && <span className="text-danger">{passwordValidationError.message}</span>}
        </div>
        {apiError && (
                <p style={{color: "red"}}>
                    {displayApiError}
                </p>
            )}
        <Button onClick={handleLogin}>Log In</Button>
        </form>
        </div>
    );
}