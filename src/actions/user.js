const url = "https://api.evaluatz.com/user/";

export const clearUser = (token = '') => ({
  type: 'CLEAR_USER'
});

export const setUser = (user = { isLogged: false }) => ({
  type: 'SET_USER',
  user
});

export const updateUser = (token, callbackOnSuccess, callbackOnFail) => {
  return dispatch => {
    dispatch(updateUserStarted());
    
    let rtUser = { token, isLogged: false };

    fetch(url,
      {
        method: "GET",
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(result => {
        console.log("RESULT!!");
        if (result.Error) {
          callbackOnFail();
        } else {
          rtUser = { ...result, isLogged: true, token };
        }
        callbackOnSuccess();
        dispatch(updateUserFinish(rtUser));

      }, error => {
        callbackOnFail();
        console.log(error);
      });
  }
};



const updateUserFinish = user => ({
  type: "UPDATE_USER_FINISH",
  user
});

const updateUserStarted = () => ({
  type: "UPDATE_USER_STARTED"
});

