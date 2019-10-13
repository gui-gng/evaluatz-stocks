// SET_TEXT_FILTER
export const clearUser = (token = '') => ({
    type: 'CLEAR_USER'
  });
  
  export const setUser = (user = {isLogged: false}) => ({
    type: 'SET_USER',
    user
  });