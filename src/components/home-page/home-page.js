import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    let navigate = useNavigate();
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        if (sessionStorage.length > 0) {
          setIsUserLoggedIn(true);
        }
      }, []); // Empty dependency array ensures the effect runs once after the initial render
    
    return (
    <div>
        <h1 className="text-center">Welcome to our 'To-Do Workpace' application</h1>
        {!isUserLoggedIn ? (
        <><h1 className="text-center">Please login before navigating elsewhere</h1><div className="text-center">
                    <Button onClick={() => navigate('/login')}>Login</Button>
                    <Button onClick={() => navigate('/register')}>Sign Up</Button>
                </div></> ) : (<h1 className="text-center">Welcome</h1>)}
    </div>
    )
};

export default HomePage;