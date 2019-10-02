const navReducerDefaultState = {
    isAuth: false,
    isShowLogin:false,
    apiSrc: "localhost:5000"
};

export default (state = navReducerDefaultState, action) => {
    switch (action.type) {
      case 'UPDATE':
        return state;
      default:
        return state;
    }
  };