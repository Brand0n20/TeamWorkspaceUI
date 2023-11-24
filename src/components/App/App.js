import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TasksPage from '../Tasks/Tasks';
import HomePage from '../home-page/home-page';
import Header from '../header/Header';
import { EmployeesPage } from '../employees/EmployeesPage';
import { CreateTask } from '../Tasks/CreateTask';
import { Login } from '../LoginPage/Login';
import { CreateEmployee } from '../employees/CreateEmployee';
import { EmployeeDetails } from '../employees/EmployeeDetails';
import { getCurrentUserRole, login, logout } from '../LoginPage/AuthService';
import { TaskDetails } from '../Tasks/TaskDetails';
import { DataProvider } from '../../utils/DataProvider';

function App() {

  const [role, setRole] = useState(undefined);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await getCurrentUserRole();
        setRole(userRole);
      } catch (error) {
        // Handle errors if necessary
        console.error(error);
      }
    };

    fetchUserRole();
  }, []); 

  useEffect(() => {
    // This effect will run whenever the role state changes
    console.log("User Role changed:", role);
  }, [role]);


  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route exact path="/" element={<HomePage />} />
      <Route exact path='/login' element={<Login role={role}/>} />
      <Route exact path="/tasks" element={<TasksPage />} /> 
      <Route exact path='/tasks/:id' element={<TaskDetails />} />
      <Route exact path='/tasks/create' element={<CreateTask />} />
      <Route exact path='/employees' element={<EmployeesPage/>} />
      <Route exact path='/employees/:email' element={<EmployeeDetails role={role}/>} />
      <Route exact path='/employees/create' element={<CreateEmployee role={role}/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
