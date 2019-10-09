// SET_TEXT_FILTER
export const getUser = (token = '') => ({
    type: 'GET_USER',
    token
  });
  
  export const setUser = (user = {isLogged: false}) => ({
    type: 'SET_USER',
    user
  });