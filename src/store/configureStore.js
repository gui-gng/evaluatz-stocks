import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import navigationReducer from '../reducers/navigation';
import stocksReducer from '../reducers/stocks';
import userReducer from '../reducers/user';

export default () => {
  const store = createStore(
    combineReducers({
        navigation:navigationReducer,
        stocks: stocksReducer,
        filters: filtersReducer,
        user: userReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
