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

export const createEmployee = async(employeeData, setApiError) => {
    await HttpHelper("/employees", "GET", employeeData)
    .then((response) => {
        if (response.ok) {
            return response.json();
          }
          throw new Error(constants.API_ERROR);
        }).catch(() => setApiError);
};