import React, { useState, useEffect } from "react";
import { fetchAllEmployees } from "./EmployeeService";
import constants from "../../utils/constants";
import { EmployeeCard } from "./EmployeeCard";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearcBar } from "../Search Bar/SearchBar";

export const EmployeesPage = ({role}) => {
    let [employees, setEmployees] = useState([]);
    let [apiError, setApiError] = useState();
    let navigate = useNavigate();
    let [employeeToDelete, setEmployeeToDelete] = useState([]);
    let [noInput, setNoInput] = useState(true);

    const onDelete = (deletedEmployee) => {
        setEmployeeToDelete({...employeeToDelete, deletedEmployee});
    }

    useEffect(() => {
        if (noInput) {
        fetchAllEmployees(setEmployees, setApiError);
        }
    }, [employeeToDelete, noInput]);
    
    return (
    <div>
        {apiError && (
                <p>
                    {constants.API_ERROR}
                </p>
            )}
        <h1>Team Members</h1>
        <span>
            <SearcBar employees={employees} setEmployees={setEmployees} setNoInput={setNoInput}/>
        </span>
        <div className="d-grid gap-3">
            {employees.map((employee) => (
                <div key={employee.id}>
                    <EmployeeCard employee={employee} onDelete={onDelete} employeeRole={role}/>
                </div>
            ))}
        </div>
        <div>
            {role === 'ADMIN' && <Button style={{marginLeft: '10px'}}
            onClick={() => navigate('/employees/create')}> New Employee</Button>}
        </div>
    </div>
    )
};