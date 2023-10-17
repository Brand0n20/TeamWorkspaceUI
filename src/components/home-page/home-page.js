import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, login, logout } from "../LoginPage/AuthService";

const HomePage = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(undefined);
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

      useEffect(() => {
        const fetchUser = async () => {
          try {
              const userData = await getCurrentUser();
              setUser(userData);
          } catch (error) {
              // Handle errors if necessary
              console.error(error);
          }
          console.log("Effect triggered. Session storage length: ", sessionStorage.length);
      };

      fetchUser();
      }, [sessionStorage.length, logout]);
    
    return (
    <div>
        {user ? ( <h1 className="text-center">Welcome to our 'Team-Workspace' {user}</h1>
        ) : (<> <h1 className="text-center">Welcome to our 'Team Workpace' application</h1>
        <h1 className="text-center">Please login before navigating elsewhere</h1><div className="text-center">
                 <Button onClick={() => navigate('/login')}>Login</Button>
                 <Button onClick={() => navigate('/register')}>Sign Up</Button>
             </div></>)}
    </div>
    )
    
};

export default HomePage;