const navReducerDefaultState = {
    isShowLogin:false,
    isShowUserInfo:false
};

export default (state = navReducerDefaultState, action) => {
  console.log("Reducers Navigation")
    switch (action.type) {
      case 'TOGGLE_IS_SHOW_LOGIN':
          return {
            ...state,
            isShowLogin: !state.isShowLogin
          };
          case 'TOGGLE_IS_SHOW_USERINFO':
              return {
                ...state,
                isShowUserInfo: !state.isShowUserInfo
              };
      default:
        return state;
    }
  };