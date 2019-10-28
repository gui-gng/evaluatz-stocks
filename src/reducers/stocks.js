//REDUX
const stocksReducerDefaultState = {
  isLoading: false,
  listAllStocks: require('./list.json'),
  filtered: []
};

export default (state = stocksReducerDefaultState, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          isLoading: false
        };
        case 'DONE':
        return {
          ...state,
          isLoading: true
        };
        case 'FILTER':
          
        return {
          ...state,
          filtered: state.listAllStocks.filter(s => s.symbol.includes(action.str.toUpperCase()) || s.company_name.toUpperCase().includes(action.str.toUpperCase())).slice(0, 10)
        };
      default:
        return state;
    }
  };