import { loading, done } from './navigation';
const url = process.env.REACT_APP_PATH_API;


export const clearUser = (token = '') => ({
  type: 'CLEAR_USER'
});

export const setUser = (user = { isLogged: false }) => ({
  type: 'SET_USER',
  user
});

export const getUser = (token, callbackOnSuccess, callbackOnFail) => {
  return dispatch => {
    dispatch(loading());
    let rtUser = { isLogged: false };
    fetch(`${url}/user/`,
      {
        method: "GET",
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(result => {
        if (result.Error) {
          callbackOnFail();
        } else {
          callbackOnSuccess();
          rtUser = { ...result, isLogged: true, token };
        }
        dispatch(updateUserFinish(rtUser));
        dispatch(done());
      }, error => {
        dispatch(done());
        callbackOnFail();
      });
  }
};

export const authUser = (username, password, callbackOnSuccess, callbackOnFail) => {
  return dispatch => {
    dispatch(loading());
    const urlLogin = `${url}/auth/classic?username=${username}&password=${password}`;
    fetch(urlLogin)
      .then(res => res.json())
      .then(result => {
        if (result.token) {
          const token = result.token;
          document.cookie = "token=" + token;
          dispatch(getUser(token, callbackOnSuccess, callbackOnFail));
        } else {
          const error = result[0].msg;
          dispatch(updateUserFinish({ error }));
          callbackOnFail();
        }
      }, error => {
        console.log(error);
        callbackOnFail();
        dispatch(done());
      });
  }
};

const updateUserFinish = user => ({
  type: "UPDATE_USER_FINISH",
  user
});


export const getTransactions = (token,page_num = 0,page_length = 10, callbackOnSuccess = () => null, callbackOnFail = (error) => console.log(error)) => {
  return dispatch => {
    dispatch(updateTransactionsStart());
    fetch(process.env.REACT_APP_PATH_API + `/user/transactions?page_num=${page_num}&page_length=${page_length}`,
    {
      method: "GET",
      headers: {
        "Authorization": token
      }
    })
    .then(res => res.json())
    .then(result => {
      if (result.Error) {
        // dispatch(done());
        callbackOnFail(result.Error);
      } else {
        const transactions = result;
        dispatch(updateTransactionsFinish({transactions}));
        callbackOnSuccess();
        // dispatch(done());
      }

    }, error => {
      // dispatch(done());
      callbackOnFail(error);
    });
  }
};


const updateTransactionsFinish = user => ({
  type: "UPDATE_TRANSACTIONS_FINISH",
  user
});

const updateTransactionsStart = user => ({
  type: "UPDATE_TRANSACTIONS_START"
});

