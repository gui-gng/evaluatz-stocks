const userReducerDefaultState = {
  transactions: [],
  token: '',
  isLogged: false
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'CLEAR_USER':
      return { userReducerDefaultState };
    case 'UPDATE_USER_FINISH':
      return {
        ...state,
        ...action.user
      };
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

