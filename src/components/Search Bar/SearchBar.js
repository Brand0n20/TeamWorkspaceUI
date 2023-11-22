import React, { useEffect, useState } from "react"
import "./SearchBar.module.css";
import { useLocation } from "react-router-dom";


export const SearcBar = ({ employees, setEmployees, setNoInput, tasks, setTasks }) => {
    const [input, setInput] = useState("");
    const location = useLocation();
    const { pathname } = location;

    const handleChange = (value) => {
        setInput(value);

        if (pathname.includes('employees')) {
        // searching if employee names contain the letters in the search bar value
        const results = employees.filter((employee) => {
          return value && employee && employee.name && employee.name.toLowerCase().includes(value.toLowerCase());
        });

        if (value === "") {
            setNoInput(true);
            setEmployees(employees); // You might want to reset it to the initial state
          } else {
            setNoInput(false);
            setEmployees(results);
          }

        } else if (pathname.includes('tasks')) {
            const results = tasks.filter((task) => {
                return value && task && task.employeeEmail && task.employeeEmail.toLowerCase().includes(value.toLowerCase());
            })
            if (value === "") {
                setNoInput(true);
                setTasks(tasks);
              } else {
                setNoInput(false);
                setTasks(results);
              }
        }
      };
    
      return (
        <div className="input-wrapper">
            {pathname.includes('employees') ? <input
            placeholder="Search by employee name"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          /> : <input
          placeholder="Search by employee email"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />}
        </div>
      );
}