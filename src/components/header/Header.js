import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import {NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../LoginPage/AuthService";

// We use links instead of anchor tags because Anchor tags will reload the page and re-render all the components
// while <Link> and <NavLink> will only re-render updated components matched with the URL path of the Route without reloading.
// It helps the Single-Page Applications to work faster while routing
// A <NavLink> is a special kind of <Link> that knows whether or not it is “active”

const Header = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();
  const firstPath = location.pathname.split('/')[1]; 
  const [apiError, setApiError] = useState(false);
  const user = getCurrentUser();
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);


  const logOut = async () => {
    await logout(setApiError);
    setCurrentUser(undefined);
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("username");
    console.log(sessionStorage.length);
    navigate('/');
  }

  return (
  <Nav className="navbar navbar-expand-lg navbar-light bg-light">

    <ul className="navbar-brand">To-Do Workpace</ul>
    <ul>
    <CustomLink to="/" className="nav-item nav-link" >Home</CustomLink>
    </ul>
    {currentUser && (
      <>
      <div className="collapse navbar-collapse">
        <ul>
        <CustomLink to="/tasks" className="nav-item nav-link">Tasks</CustomLink>
        </ul>
        <ul>
          <CustomLink to="/employees" className="nav-item nav-link">Employees</CustomLink>
        </ul>
          <span className="navbar-text">
          <Button className="btn btn-danger"
            onClick={logOut}
            >Log Out</Button> 
          </span>
          </div>
          </>
    )}
  
  </Nav>
  );
}

const CustomLink = ({to, children, ...props}) => {
  return (
    <div style={{ margin: '10px' }}>
    <NavLink to={to} {...props} style={({ isActive }) => ({
      color: isActive? 'blue' : 'black' })}>
    {children}
      </NavLink>
    </div>
  )
}

export default Header