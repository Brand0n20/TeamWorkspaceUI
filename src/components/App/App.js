import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TasksPage from '../Tasks/Tasks';
import HomePage from '../home-page/home-page';
import Header from '../header/Header';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route exact path="/" element={<HomePage />} />
      <Route exact path="/tasks" element={<TasksPage />} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App;
