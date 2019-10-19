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


export const getTransactions = (token, callbackOnSuccess = () => null, callbackOnFail = () => null) => {
  return dispatch => {
    fetch(process.env.REACT_APP_PATH_API + "/user/transactions",
    {
      method: "GET",
      headers: {
        "Authorization": token
      }
    })
    .then(res => res.json())
    .then(result => {
      if (result.Error) {
        console.log(result);
      } else {
        console.log("RETURN TRANSACTIONS")
        const transactions = result;
        dispatch(updateUserFinish({transactions}));
        console.log(result);
      }

    }, error => {
      console.log(error);
    });
  }
};

const updateUserFinish = user => ({
  type: "UPDATE_USER_FINISH",
  user
});


