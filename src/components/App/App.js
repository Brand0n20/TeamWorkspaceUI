import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TasksPage from '../Tasks/Tasks';
import HomePage from '../home-page/home-page';
import Header from '../header/Header';
import { EmployeesPage } from '../employees/EmployeesPage';
import { CreateEmployee } from '../employees/CreateEmployee';
import { CreateTask } from '../Tasks/CreateTask';
import { Login } from '../LoginPage/Login';
import { SignUp } from '../LoginPage/SignUp';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route exact path="/" element={<HomePage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/sign-up" element={<SignUp />} />
      <Route exact path="/tasks" element={<TasksPage />} /> 
      <Route exact path='/tasks/createTask' element={<CreateTask />} />
      <Route exact path='/employees' element={<EmployeesPage />} />
      <Route exact path='/employees/createEmployee' element={<CreateEmployee />} />
  
    </Routes>
    </BrowserRouter>
  )
}

export default App;
