const navReducerDefaultState = {
  isShowLogin: false,
  isShowUserInfo: false,
  isLoading: false,
  index_subpage: "Dashboard"
};

export default (state = navReducerDefaultState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "DONE":
      return {
        ...state,
        isLoading: false
      };
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