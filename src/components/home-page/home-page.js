
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    let navigate = useNavigate();
    console.log("Home")
    return (
    <div>
        <h1 className="text-center">Welcome to our 'To-Do Workpace' application</h1>
        <h1 className="text-center">Please login before navigating elsewhere</h1>
        <div className="text-center">
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/register')}>Sign Up</Button>
        </div> 
    </div>
    )
};

export default HomePage;