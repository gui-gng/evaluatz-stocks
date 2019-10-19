const navReducerDefaultState = {
  isShowLogin: false,
  isShowUserInfo: false,
  index_subpage: "Dashboard"
};

export default (state = navReducerDefaultState, action) => {
  console.log("Reducers Navigation")
  switch (action.type) {
    case 'TOGGLE_IS_SHOW_LOGIN':
      return {
        ...state,
        isShowLogin: !state.isShowLogin
      };
    case 'FALSE_IS_SHOW_LOGIN':
      return {
        ...state,
        isShowLogin: false
      };
    case 'TOGGLE_IS_SHOW_USERINFO':
      return {
        ...state,
        isShowUserInfo: !state.isShowUserInfo
      };
    case 'SET_INDEX_SUBPAGE':
      return {
        ...state,
        index_subpage: action.index_subpage
      };
    default:
      return state;
  }
};