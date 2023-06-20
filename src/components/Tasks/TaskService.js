import HttpHelper from "../../utils/HttpHelper";
import constants from "../../utils/constants";

const fetchAllTasks = async (setTasks, setApiError) => {
    await HttpHelper("/tasks", 'GET')
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(constants.API_ERROR);
    }).then(setTasks).catch(() => setApiError(true));
};

export const fetchSingleTask = async (id, setTask, setApiError) => {
    await HttpHelper(`tasks/${id}`, "GET")
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(constants.API_ERROR);
    }).then(json => setTask(json)).catch(() => setApiError(true));
};

export const createTask = async(newTask, setApiError) => {
    await HttpHelper('/tasks', "POST", newTask)
    .then((response) => {
        console.log(response);
          if (response.ok) {
              return response.json();
            }
            throw new Error(constants.API_ERROR);
    }).catch(() => setApiError);
}

export default fetchAllTasks;