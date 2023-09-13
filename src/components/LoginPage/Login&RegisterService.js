import React from "react";
import HttpHelper from "../../utils/HttpHelper";
import constants from "../../utils/constants";

export const logout = () => {
    localStorage.removeItem("user")
}

// Send a POST request to the login endpoint
export const login = async(loginData, setApiError) => {
    const formData = new URLSearchParams();     // this is to url-encode the credentials. Ex. username=example&password=examplePassword
    formData.append("username", loginData.username);
    formData.append("password", loginData.password);
    await fetch(`${constants.BASE_URL_API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(), // Convert the form data to a string
    })
    .then((response) => {
        console.log(response);
        if (response.ok) {
            return response.json();
          }
          throw new Error(constants.API_ERROR);
        }).catch(() => setApiError);
    
}
