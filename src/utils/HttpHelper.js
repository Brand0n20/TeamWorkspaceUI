import constants from "./constants";

/**
 * When retrieving data from server that is protected, we need to set our Authorization header. 
 */
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}

/**
 * @name HttpHelper
 * @description - Utility method for using fetch in a convenient manner
 * @param {string} route address to ping
 * @param {string} method http method
 * @param {Object} payload object to send
 * @return {Promise} - Promise from the fetch call
 */
const HttpHelper = (route, method, payload) => fetch(constants.BASE_URL_API + route,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmFuZG9uYWxmYUAiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2xvZ2luIiwiZXhwIjoxNjk0MzY5NDU3fQ.6gBrksPYJwf4YEYltxJWiuIvbjN588xSarzh-x2dm34`
      },
      body: JSON.stringify(payload)
    });
  
  export default HttpHelper;