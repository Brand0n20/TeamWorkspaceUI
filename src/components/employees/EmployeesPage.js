import React, { useState, useEffect } from "react";
import { fetchAllEmployees } from "./EmployeeService";
import constants from "../../utils/constants";
import { EmployeeCard } from "./EmployeeCard";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearcBar } from "../Search Bar/SearchBar";
import { getCurrentUserRole } from "../LoginPage/AuthService";

export const EmployeesPage = () => {
    let [employees, setEmployees] = useState([]);
    let [apiError, setApiError] = useState();
    let navigate = useNavigate();
    let [employeeToDelete, setEmployeeToDelete] = useState([]);
    let [noInput, setNoInput] = useState(true);
    let [results, setResults] = useState([]); 
    const [currentUserRole, setCurrentUserRole] = useState(undefined);
    const role = getCurrentUserRole();

    useEffect(() => {
        if (role) {
          setCurrentUserRole(role);
        }
      }, [role]);

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
            <SearcBar employees={employees} setNoInput={setNoInput} setResults={setResults} />
        </span>
        {results.length > 0 ? (<><div>{results.map((result) => (
                <div key={result.id}>
                    {employees
                        .filter((employee) => employee.id === result.id)
                        .map((filteredEmployee) => (
                            <div key={filteredEmployee.id}>
                                {/* Render EmployeeCard for the filtered employee */}
                                <EmployeeCard
                                    employee={filteredEmployee}
                                    onDelete={onDelete}
                                    employeeRole={role} />
                            </div>

                        ))}
                </div>
            ))}</div><div>{role === '[ADMIN]' && <Button style={{ marginLeft: '10px' }}
            onClick={() => navigate('/employees/create')}> New Employee</Button>}</div></>
        ) : (
        <><div className="d-grid gap-3">
                    {employees.map((employee) => (
                        <div key={employee.id}>
                            <EmployeeCard employee={employee} onDelete={onDelete} employeeRole={role} />
                        </div>
                    ))}
                </div><div>
                        {role === '[ADMIN]' && <Button style={{ marginLeft: '10px' }}
                            onClick={() => navigate('/employees/create')}> New Employee</Button>}
                    </div></>
             )
        }
    </div>
    )
};