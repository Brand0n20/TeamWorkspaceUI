import constants from "../../utils/constants";

// Send a POST request to the login endpoint
export const login = async(loginData, setApiError) => {
    const formData = new URLSearchParams();     // this is to url-encode the credentials. Ex. username=example&password=examplePassword
    formData.append("username", loginData.username);
    formData.append("password", loginData.password);

    // Use try-catch so you can pull response.json() asynchoronously
    /* By using await before response.json(), you ensure that the Promise is awaited
    and you can access the JSON data once it's resolved. 
    This should resolve the issue of response.json() returning a pending Promise. */
    try {
        const response = await fetch(`${constants.BASE_URL_API}/login`, {
          method: 'POST',
          credentials: 'include',   // you need to include credentials for the cookies even before you've logged in
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });
    
        if (response.ok) {
          // Wait for the JSON data to be resolved from the Promise
          const jsonResponse = await response.json();
          const { email } = jsonResponse;
          const { employee_name } = jsonResponse;
          const { roles } = jsonResponse;
          sessionStorage.setItem("username", JSON.stringify(email))
          sessionStorage.setItem("name", JSON.stringify(employee_name));
          sessionStorage.setItem("roles", JSON.stringify(roles));
          
          return response;

        } else if (response.status === 403){
          throw new Error(constants.API_ERROR);
        }
      } catch (error) {
        console.error('Error:', error);
        setApiError(true);
      }
}

export const logout = (setApiError) => {
 fetch(`${constants.BASE_URL_API}/signout`, {
      method: 'POST',
      credentials: 'include'
 })
 .then((response) => {
  console.log(response);
          if (response.ok) {
              return response.json();
            }
            throw new Error(constants.API_ERROR);
 }).catch(() => setApiError(true))
}

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('name'));
};

export const getCurrentUserRole = () => {
  return JSON.parse(sessionStorage.getItem('roles'));
};

