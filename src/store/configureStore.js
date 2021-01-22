import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import filtersReducer from '../reducers/filters';
import navigationReducer from '../reducers/navigation';
import stocksReducer from '../reducers/stocks';
import userReducer from '../reducers/user';

export default () => {
  const store = createStore(
    combineReducers({
        navigation: navigationReducer,
        stocks: stocksReducer,
        filters: filtersReducer,
        user: userReducer
    }),
    applyMiddleware(thunk)
  );

  return store;
};
