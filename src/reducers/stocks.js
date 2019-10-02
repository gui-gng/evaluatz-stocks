//REDUX
const stocksReducerDefaultState = [];

export default (state = stocksReducerDefaultState, action) => {
    switch (action.type) {
      case 'UPDATE':
        return state;
      default:
        return state;
    }
  };