import React from "react";
import HttpHelper from "../../utils/HttpHelper";
import constants from "../../utils/constants";

export const logout = () => {
    localStorage.removeItem("user")
}

// Send a POST request to the login endpoint
export const login = async(loginData, setApiError, setUser) => {
    const formData = new URLSearchParams();     // this is to url-encode the credentials. Ex. username=example&password=examplePassword
    formData.append("username", loginData.username);
    formData.append("password", loginData.password);

    // Use try-catch so you can pull response.json() asynchoronously
    /* By using await before response.json(), you ensure that the Promise is awaited
    and you can access the JSON data once it's resolved. 
    This should resolve the issue of response.json() returning a pending Promise. */
    try {
        const response = await fetch(`${constants.BASE_URL_API}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });
    
        if (response.ok) {
          // Wait for the JSON data to be resolved from the Promise
          const jsonResponse = await response.json();
          const { access_token, refresh_token } = jsonResponse;
          const { user } = jsonResponse
    
          // Store tokens in localStorage
          console.log(refresh_token);
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
    
          // Perform any other actions needed
          setUser(user);
        } else {
          throw new Error(constants.API_ERROR);
        }
      } catch (error) {
        console.error('Error:', error);
        setApiError(true);
      }
}
