const userReducerDefaultState = {
    token: '',
    isLogged: false
  };
  
  
 export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
      case 'GET_USER':
          let user = findUser(action.token);
          console.log(user);
        return {
          ...state,
          isLogged: true,
          token: action.token,
          username: user.username,
          name: user.name
        };
      default:
        return state;
    }
  };



  function findUser(token){


    return {
        username: "guigng", 
        name: "Guilherme"
    }
  }