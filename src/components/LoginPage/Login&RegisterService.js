import React from "react";
import HttpHelper from "../../utils/HttpHelper";
import constants from "../../utils/constants";


export const login = (loginData, setApiError) => {
}

export const logout = () => {
    localStorage.removeItem("user")
}

export const register = async(registerData, setApiError) => {
    await HttpHelper(`${constants.BASE_URL_API}/register`, "POST", registerData)
    .then((response) => {
        console.log(response);
        if (response.ok) {
            return response.json();
          }
          throw new Error(constants.API_ERROR);
        }).catch(() => setApiError);
    
}
