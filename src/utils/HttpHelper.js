import constants from "./constants";

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
        // The HttpOnly cookie is automatically included in the request headers
      },
      body: JSON.stringify(payload)
    });
  
  export default HttpHelper;

  