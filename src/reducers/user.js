const userReducerDefaultState = {
  token: '',
  isLogged: false
};

export default (state = userReducerDefaultState, action) => {
  console.log("Reducers user");
  console.log(action);
  switch (action.type) {
    case 'CLEAR_USER':
      console.log("Clear user");
      return {
        isLogged: false
      };
    case 'UPDATE_USER_FINISH':
      console.log("Updating user");
      return action.user.isLogged ? action.user : state;
    case 'SET_USER':
      return {
        ...state,
        isLogged: true,
        ...action.user
      };
    default:
      return state;
  }
};

