import { json } from "react-router-dom";
import constants from "../../utils/constants";
import HttpHelper from "../../utils/HttpHelper";

export const fetchAllEmployees = async(setEmployees, setApiError) => {
    await fetch(`${constants.BASE_URL_API}/employees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setEmployees)
        
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    }).then(setEmployees).catch(() => setApiError(true));
};

export const getEmployee = async(id, setEmployee, setApiError) => {
  await HttpHelper(`/employees/${id}`, 'GET')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(constants.API_ERROR);
  }).then(setEmployee).catch(() => setApiError(true));
}

export const createEmployee = async(employeeData, setApiError) => {
    await HttpHelper(`/employees`, "POST", employeeData)
    .then((response) => {
      console.log(response);
        if (response.ok) {
            return response.json();
          }
          throw new Error(constants.API_ERROR);
        }).catch(() => setApiError);
};

export const deleteEmployee = async (id, employee, setApiError) => {
    await HttpHelper(`/employees/${id}`, 'DELETE', employee)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(constants.API_ERROR);
    }).catch(() => setApiError(true));
};