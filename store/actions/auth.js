export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
let timer;
import AsyncStorage from "@react-native-async-storage/async-storage";
export const setDidTryAl = ()=>{
    return {type: SET_DID_TRY_AL}
  }

export const authenticate = (token, userId, expiryTime) => {
  return async (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: LOGIN, token: token, userId: userId });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
   
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTBpQ_c4afdk3wjbZRLBsaxf7Pta_eTLQ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = "Something Went Wrong!";
        if (errorId === "EMAIL_EXISTS") {
          message = "The email address is already in use by another account.";
        }
        if (errorId === "OPERATION_NOT_ALLOWED") {
          message = "Password sign-in is disabled for this project.";
        }
        if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          message =
            "We have blocked all requests from this device due to unusual activity. Try again later.";
        }
        throw new Error(message);
      }
   

    const resData = await response.json();
 
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    dispatch({type: LOGIN , token : resData.idToken, userId :resData.localId});

    dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn)*1000))

    storeDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTBpQ_c4afdk3wjbZRLBsaxf7Pta_eTLQ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
       
        let message = "Something Went Wrong!";
        if (errorId === "EMAIL_NOT_FOUND") {
          message = "Please enter correct Username or Password.";
        }
        if (errorId === "INVALID_PASSWORD") {
          message = "Please enter correct Username or Password.";
        }
        if (errorId === "USER_DISABLED") {
          message = " The user account has been disabled by an administrator.";
        }
        throw new Error(message);
      }
      

    const resData = await response.json();
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn)*1000
    );

    // dispatch(authenticate(resData.idToken, resData.localId, expirationDate));
    dispatch({type: LOGIN , token : resData.idToken, userId :resData.localId});
    dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn)*1000))
    storeDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const storeDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userCreds",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const logout = () => {
  return async (dispatch) => {
    clearLogoutTimer();
    await AsyncStorage.removeItem("userCreds");
    dispatch({ type: LOGOUT });
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return async (disptach) => {
    timer = setTimeout(() => {
      disptach(logout());
    }, expirationTime);
  };
};
