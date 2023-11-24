import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import TasksPage from '../Tasks/Tasks';
import HomePage from '../home-page/home-page';
import Header from '../header/Header';
import { EmployeesPage } from '../employees/EmployeesPage';
import { CreateTask } from '../Tasks/CreateTask';
import { Login } from '../LoginPage/Login';
import { CreateEmployee } from '../employees/CreateEmployee';
import { EmployeeDetails } from '../employees/EmployeeDetails';
import { getCurrentUser, getCurrentUserRole, logout } from '../LoginPage/AuthService';
import { TaskDetails } from '../Tasks/TaskDetails';

function App() {


  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route exact path="/" element={<HomePage />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path="/tasks" element={<TasksPage />} /> 
      <Route exact path='/tasks/:id' element={<TaskDetails />} />
      <Route exact path='/tasks/create' element={<CreateTask />} />
      <Route exact path='/employees' element={<EmployeesPage/>} />
      {sessionStorage.length > 0 && sessionStorage.getItem('roles').includes('ADMIN') ? (
          <>
            <Route exact path='/employees/:email' element={<EmployeeDetails />} />
            <Route exact path='/employees/create' element={<CreateEmployee />} />
          </>
        ) : (
          // Redirect to the home page if the user is not an ADMIN
          <>
          <Route path='/employees/:email' element={<Navigate to="/" />} />
          <Route path='/employees/create' element={<Navigate to="/" />} />
          </>
        )}
    </Routes>
    </BrowserRouter>
  )
}

export default App;
