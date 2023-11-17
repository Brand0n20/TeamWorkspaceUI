import React, {useState} from "react";
import { Button } from "react-bootstrap";
import styles from "./Employees.module.css";
import { createEmployee } from "./EmployeeService";
import { useNavigate } from "react-router-dom";
import CancelModal from "../CancelModal";
import { RegisterFormSchema } from "../../utils/ValidateForm";

const initialState = {
    name: null,
    email: null,
    password: null,
    jobTitle: null,
    role: {
        name: null,
    }
};

let regularJobs = ["Software Engineer", "Data Engineer", "Business Systems Analyst", "Quality Assurance Engineer"];
let adminJobs = ["Scrum Master", "Product Owner", "Senior Architect"];
let allJobs = regularJobs.concat(adminJobs);

export const CreateEmployee = () => {
    const [employee, setEmployee] = useState(initialState);
    const [apiError, setApiError] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    let nameValidationError = validationErrors.find(e => e.field === 'name');
    let emailValidationError = validationErrors.find(e => e.field === 'email');
    let passwordValidationError = validationErrors.find(e => e.field === 'password');
    let jobTitleValidationError = validationErrors.find(e => e.field === 'jobTitle');
    
    const handleChange = (event) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    };

    if (regularJobs.includes(employee.jobTitle)) {
        employee.role.name = "USER";
    } else if (adminJobs.includes(employee.jobTitle)) {
        employee.role.name = "ADMIN"
    }

    const submitEmployee = async () => {
        try {
        await RegisterFormSchema.validate(employee, { abortEarly: false});
        await createEmployee(employee, setApiError);
        navigate('/employees');
        } catch (error) {
            let errors = [];
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
                <label>Name: 
                <input
                className="form-control"
                type="text" 
                name="name" 
                value={employee.name || ''} 
                onChange={handleChange}
                />
                {nameValidationError && <span className="text-danger">{nameValidationError.message}</span>}
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
                {emailValidationError && <span className="text-danger">{emailValidationError.message}</span>}
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
                {passwordValidationError && <span className="text-danger">{passwordValidationError.message}</span>}
                </label>
            </div>
            <div className="form-group">
                <label>Job title: 
                <select
                className="form-control" 
                type="dropdown" 
                name="jobTitle" 
                value={employee.jobTitle || ''} 
                onChange={handleChange}
                >
                <option value="">--None--</option>
                {allJobs.map(job => (
                    <option key={job} value={job}>
                        {job}
                    </option>
                )
                )}
                </select>
                {jobTitleValidationError && <span className="text-danger">{jobTitleValidationError.message}</span>}
                </label>
            </div>
            <Button
            style={{ margin: "10px 10px"}}
            onClick={submitEmployee}
            >Submit</Button>
            <Button className="btn btn-danger" onClick={() => setShow(true)}>Cancel</Button>
            <CancelModal onClose={() => setShow(false)} show={show} />
            </form>
        </div>

    )
}