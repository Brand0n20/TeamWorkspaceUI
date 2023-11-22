import './App.css';
import React from 'react';
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
import { getCurrentUserRole } from '../LoginPage/AuthService';
import { TaskDetails } from '../Tasks/TaskDetails';
import { DataProvider } from '../../utils/DataProvider';

function App() {

  let role = getCurrentUserRole();
  if (role !== null) {
    role = role.slice(1, role.length - 1);
    console.log(role);
  } else {
    // Handle the case where role is null, e.g., provide a default value or log an error.
    console.error("Role is null. Handle this case appropriately.");
  }

  return (
    <BrowserRouter>
    <DataProvider>
    <Header/>
    <Routes>
    <Route exact path="/" element={<HomePage />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path="/tasks" element={<TasksPage />} /> 
      <Route exact path='/tasks/:id' element={<TaskDetails />} />
      <Route exact path='/tasks/create' element={<CreateTask />} />
      <Route exact path='/employees' element={<EmployeesPage role={role}/>} />
      <Route exact path='/employees/:email' element={<EmployeeDetails role={role}/>} />
      <Route exact path='/employees/create' element={<CreateEmployee role={role}/>} />
    </Routes>
    </DataProvider>
    </BrowserRouter>
  )
}

export default App;
