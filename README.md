# Team Work Space UI

## Description

This is the front-end of a fully functional application that is a collaborative task management tool designed to help teams organize and prioritize their work efficiently. This project drew inspiration from ServiceNow's existing model to establish an effective process for teams to more efficiently manage their tasks. Within the TeamTaskManager system, user management is structured around distinct roles, primarily Admin and User, each with specific permissions and restrictions. Administrators possess elevated privileges such as: updating employee information, creating a new employee in the system, and deleting employees from the system. On the other hand, regular Users have restricted access, typically limited to task creation, assignment, updates, and completion. By implementing this role-based approach, TeamTaskManager offers a tailored experience for users based on their responsibilities, fostering a secure and efficient collaborative environment. For this front-end part, Javascript and React were used as these as two of the most popular tools for front-end development.

## User Instructions To Install and Run the Project

*Prerequisites
-Node.js and npm installed

1. Clone this projec t locally
2. CD into the new root folder inside the shell of your ideal IDE
3. Then open up the project folder run "npm install" in the root folder to install any required dependencies for the package-lock.json
4. Once that's done, run "npm start" to start off the app. WARNING: This is only the front-end part so the backend servers need to be running for this app to work.

## Technologies and Packages Used

-React
-Yup Validation Library
-Bootstrap
-Jsonwebtoken

## How to Use the Project

Once the app is up and running, there are a couple of things you can do. Firstly, there are already some employees and tasks geneated when the site starts. Since you need to log in when you enter the site, here are the randomly created ADMIN employee credentials for "Jacob Miller": 
    username: MillerLite@com,
    password: Deal

PLEASE REMEMBER THAT THESE CREDENTIALS ARE FAKE AND THIS USER IS ALSO FAKE

Once you are logged in, you can navigate to the employees tab or the tasks tab. When you're on the employees tab, you can see each employee card displayed and its information such as the employee name, email, job title, site role, and current tasks assigned. As the admin, you are given the options to "Update" or "Delete" an employee, as well as creating a new one. When creating a new employee, you must provide a name, email, password, and job title. This same criteria applies when updating an employee. When looking on the tasks page, each task dispays their task id, description, due date, and the email of the user it was assigned to. When creating a new task, all the fields that are displayed on an existing task, must be filled out for when creating a new task, except for the task id. Each task can also be updated or marked as "Complete". These task actions can be done with user rights as well as admin rights. 