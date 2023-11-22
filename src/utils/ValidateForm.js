import * as yup from 'yup';
import { login } from '../components/LoginPage/AuthService';

const nameRegex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Z]).+$/;
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{4}$/;

export const isFutureDate = (dateString) => {
  const enteredDate = new Date(dateString);
  const currentDate = new Date();
  return enteredDate >= currentDate;
};

//You can use the .transformKeys() function provided by Yup to enforce a specific order for validation.
export const RegisterFormSchema = yup.object().shape({
  name: yup.string().required('Name is required').matches(nameRegex, 'Name must me in valid format: Example Name'),
  email: yup.string().min(4, 'Username is too short - should be 6 characters minimum').required('Email is required').matches(emailRegex, 
  'Email must be in valid format: Example@gmail.com'),
  password: yup.string().required('Password is required').min(4, 'Password is too short - should be 4 characters minimum')
    .matches(passwordRegex, 'Password must contain at least one capital letter'),
  jobTitle: yup.string().required('Job Title is required')
});

export const TaskFormSchema = yup.object().shape({
  name: yup.string().min(10, 'Description has to be over 10 characters').required('Description is required'),
  dueDate: yup.string().required('Due Date is required').matches(dateRegex, 'Due Date must be in format MM/DD/YYYY').test('is-future-date', 
  'Date has to be a future date', isFutureDate),
  employeeEmail: yup.string().required('An employee must be selected')
})

export const LoginFormSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})