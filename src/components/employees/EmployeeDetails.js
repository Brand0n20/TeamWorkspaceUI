import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import styles from "./Employees.module.css";
import { createEmployee, fetchEmployeeByEmail, updateEmployee } from "./EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import CancelModal from "../CancelModal";

let regularJobs = ["Software Engineer", "Data Engineer", "Business Systems Analyst", "Quality Assurance Engineer"];
let adminJobs = ["Scrum Master", "Product Owner", "Senior Architect"];
let allJobs = regularJobs.concat(adminJobs);

export const EmployeeDetails = () => {
    let { email } = useParams();
    const [employee, setEmployee] = useState([]);
    const [apiError, setApiError] = useState(false);
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchEmployeeByEmail(email, setEmployee, setApiError);
    }, [email])

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

    const submitUpdate = async () => {
        await updateEmployee(email, employee, setApiError);
        navigate('/employees');
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
                </label>
            </div>
            <Button
            style={{ margin: "10px 10px"}}
            onClick={submitUpdate}
            >Update</Button>
            <Button className="btn btn-danger" onClick={() => setShow(true)}>Cancel</Button>
            <CancelModal onClose={() => setShow(false)} show={show} />
            </form>
        </div>

    )
}