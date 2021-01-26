//REDUX
const stocksReducerDefaultState = {
  isLoading: false,
  listAllStocks: [],
  filtered: [],
  selectedStock: {}
};

export default (state = stocksReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_ALL_STOCKS':
      return {
        ...state,
        listAllStocks: action.listAllStocks
      };
    case 'SET_SELECTED_STOCK':
      return {
        ...state,
        selectedStock: action.stock
      }
    case 'LOADING_STOCKS':
      return {
        ...state,
        isLoading: true
      };
    case 'DONE_STOCKS':
      return {
        ...state,
        isLoading: false
      };
    case 'FILTER':
      const filtered = state.listAllStocks.filter(s => s.symbol.includes(action.str.toUpperCase()) || s.company_name.toUpperCase().includes(action.str.toUpperCase())).slice(0, 10);
      return {
        ...state,
        filtered
      };
    default:
      return state;
  }
};