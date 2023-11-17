import './App.css';
import React, { useState } from 'react';
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

function App() {

  let role = getCurrentUserRole();
  role = role.slice(1, role.length-1);

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route exact path="/" element={<HomePage />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path="/tasks" element={<TasksPage />} /> 
      <Route exact path='/tasks/create' element={<CreateTask />} />
      <Route exact path='/employees' element={<EmployeesPage role={role}/>} />
      <Route exact path='/employees/:email' element={<EmployeeDetails role={role}/>} />
      <Route exact path='/employees/create' element={<CreateEmployee role={role}/>} />
  
    </Routes>
    </BrowserRouter>
  )
}

export default App;
