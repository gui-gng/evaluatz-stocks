const userReducerDefaultState = {
    token: '',
    isLogged: false
  };
  
  
 export default (state = userReducerDefaultState, action) => {
   console.log("Reducers user");
   console.log(action);
    switch (action.type) {
      case 'GET_USER':
        return {
          ...state,
          isLogged: true,
          token: action.token
        };
        case 'SET_USER':
          return {
            ...state,
            isLogged: true,
            token: action.user.token,
            username: action.user.username,
            name: action.user.name
          };


      default:
        return state;
    }
  };

