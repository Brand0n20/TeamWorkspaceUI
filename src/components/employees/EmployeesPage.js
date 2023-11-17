import React, { useState, useEffect } from "react";
import { fetchAllEmployees } from "./EmployeeService";
import constants from "../../utils/constants";
import { EmployeeCard } from "./EmployeeCard";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCurrentUserRole } from "../LoginPage/AuthService";

export const EmployeesPage = ({role}) => {
    let [employees, setEmployees] = useState([]);
    let [apiError, setApiError] = useState();
    let navigate = useNavigate();
    let [employeeToDelete, setEmployeeToDelete] = useState([]);

    const onDelete = (deletedEmployee) => {
        setEmployeeToDelete({...employeeToDelete, deletedEmployee});
    }

    useEffect(() => {
        fetchAllEmployees(setEmployees, setApiError);
    }, [employeeToDelete]);
    
    return (
    <div>
        {apiError && (
                <p>
                    {constants.API_ERROR}
                </p>
            )}
        <h1>Team Members</h1>
        <div>
            {employees.map((employee) => (
                <div key={employee.id} className="">
                    <EmployeeCard employee={employee} onDelete={onDelete} employeeRole={role}/>
                </div>
            ))}
        </div>
        <div>
            {role === 'ADMIN' && <Button className="btn btn-info" style={{marginLeft: '10px'}}
            onClick={() => navigate('/employees/create')}> New Employee</Button>}
        </div>
    </div>
    )
};