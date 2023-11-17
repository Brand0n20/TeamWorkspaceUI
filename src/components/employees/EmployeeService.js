import constants from "../../utils/constants";
import HttpHelper from "../../utils/HttpHelper";

export const fetchAllEmployees = async(setEmployees, setApiError) => {
    await fetch(`${constants.BASE_URL_API}/employees`, {
      method: 'GET',
      credentials: "include"  // include credentials for when using cookies

    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      console.log(Request.credentials);
      throw new Error(constants.API_ERROR);
    }).then(setEmployees).catch(() => setApiError(true));
};

export const fetchEmployeeByEmail = async(email, setEmployee, setApiError) => {
  await HttpHelper(`/employees/${email}`, 'GET')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(constants.API_ERROR);
  }).then(setEmployee).catch(() => setApiError(true));
}

export const fetchEmployeeTasks = async(email, setTasks, setApiError) => {
  await HttpHelper(`/employees/${email}/tasks`, 'GET')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(constants.API_ERROR);
  }).then(setTasks).catch(() => setApiError(true));
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

export const updateEmployee = async(email, employeeData, setApiError) => {
  await HttpHelper(`/employees/${email}`, 'PUT', employeeData)
  .then((response) => {
    if (response.ok) {
        return response.json();
    }
    throw new Error(constants.API_ERROR);
  }).catch(() => setApiError);
}

export const deleteEmployee = async (email, employee, setApiError) => {
    await HttpHelper(`/employees/${email}`, 'DELETE', employee)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(constants.API_ERROR);
    }).catch((error) => {
      console.log(error);
      setApiError(true)
    });
};