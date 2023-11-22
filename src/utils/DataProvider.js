import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllEmployees } from '../components/employees/EmployeeService';
import { fetchAllTasks } from '../components/Tasks/TaskService';
import { getCurrentUser } from '../components/LoginPage/AuthService';

// using 'React Context'
const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const user = getCurrentUser();
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (currentUser) {
        fetchAllEmployees(setEmployees, setApiError);
        fetchAllTasks(setTasks, setApiError);
    }
  }, [currentUser]);

  return (
    <DataContext.Provider value={{ employees, setEmployees, tasks, setTasks, currentUser, setCurrentUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
