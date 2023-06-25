import { json } from "react-router-dom";
import constants from "../../utils/constants";
import HttpHelper from "../../utils/HttpHelper";

export const fetchAllEmployees = async(setEmployees, setApiError) => {
    await HttpHelper("/employees", "GET")
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(constants.API_ERROR);
    }).then(json => setEmployees(json)).catch(() => setApiError(true));
};

export const getEmployee = async(id, setEmployee, setApiError) => {
  console.log("Getting request ")
  await HttpHelper(`/employees/${id}`, "GET")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(constants.API_ERROR);
  }).then(json => setEmployee(json)).catch(() => setApiError(true));
}

export const createEmployee = async(employeeData, setApiError) => {
    await HttpHelper("/employees", "POST", employeeData)
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