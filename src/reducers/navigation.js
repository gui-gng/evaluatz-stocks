const navReducerDefaultState = {
    isAuth: false,
    isShowLogin:false,
    apiSrc: "localhost:5000"
};

export default (state = navReducerDefaultState, action) => {
  console.log("Reducers Navigation")
    switch (action.type) {
      case 'TOGGLE_IS_SHOW_LOGIN':
          return {
            ...state,
            isShowLogin: !state.isShowLogin
          };
      default:
        return state;
    }
  };