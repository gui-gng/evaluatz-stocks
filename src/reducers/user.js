const userReducerDefaultState = {
  transactions: [],
  token: '',
  isLogged: false,
  isLoadingTransactions: false
};

export default (state = userReducerDefaultState, action) => {
  console.log(state.isLoadingTransactions);
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
    case "UPDATE_TRANSACTIONS_START":
      return {
        ...state,
        isLoadingTransactions: true
      };
    case 'UPDATE_TRANSACTIONS_FINISH':
      return {
        ...state,
        ...action.user,
        isLoadingTransactions: false
      };
    default:
      return state;
  }
};

