import React from "react";
import styles from "./Employees.module.css";

export const EmployeeCard = ({ employee }) => (
        <div className={styles.content}>
         <div className={styles.employee}>
        <h4>{employee.firstName} {employee.lastName}</h4>
        <li>
            {employee.email}
        </li>
        <li>
            {employee.jobTitle}
        </li>
        <li>
            Department: {employee.department}
        </li>
        </div>
    </div>
)