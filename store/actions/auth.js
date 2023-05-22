export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
let timer;
import AsyncStorage from "@react-native-async-storage/async-storage";
export const setDidTryAl = ()=>{
    return {type: SET_DID_TRY_AL}
  }

export const authenticate = (token, userId,role, expiryTime) => {
  return async (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: LOGIN, token: token, userId: userId , role:role});
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
   
      const response = await fetch(
        "https://coffee-cart-node-api.herokuapp.com/signup",
        // "http://192.168.137.1:3000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      if (response.status === 400) {
        const errorResData = await response.json();
        const errorId = errorResData.error;
        let message = "Something Went Wrong!";
        if (errorId === "EMAIL_ALREADY_IN_USE") {
          message = "The email address is already in use by another account.";
        }
        if (errorId === "PASSWORD_IS_INVALID") {
          message = "Password is invalid. Please enter valid password";
        }
        throw new Error(message);
      }
      // if (!response.ok) {
      //   const errorResData = await response.json();
      //   const errorId = errorResData.error.message;
      //   let message = "Something Went Wrong!";
      //   if (errorId === "EMAIL_EXISTS") {
      //     message = "The email address is already in use by another account.";
      //   }
      //   if (errorId === "OPERATION_NOT_ALLOWED") {
      //     message = "Password sign-in is disabled for this project.";
      //   }
      //   if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
      //     message =
      //       "We have blocked all requests from this device due to unusual activity. Try again later.";
      //   }
      //   throw new Error(message);
      // }
   

    const resData = await response.json();
 
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    dispatch({type: LOGIN , token : resData.token, userId :resData.user._id, role: resData.user.role});

    dispatch(
      authenticate(
        resData.token,
        resData.user._id,
        resData.user.role,
        parseInt(resData.expiresIn) * 1000
      )
    );

    storeDataToStorage(resData.token, resData.user._id, resData.user.role, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    try{
    const response = await fetch(
      "https://coffee-cart-node-api.herokuapp.com/login",
      // "http://192.168.137.1:3000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
      if (response.status === 400) {
        const errorResData = await response.json();
        const errorId = errorResData.error;
        let message = "Something Went Wrong!";
        if (errorId === "UNABLE_TO_LOGIN") {
          message = "Please enter correct Username or Password.";
        }
        
        throw new Error(message);
      }
      // if (!response.ok) {
      //   const errorResData = await response.json();
      //   const errorId = errorResData.error.message;
       
      //   let message = "Something Went Wrong!";
      //   if (errorId === "EMAIL_NOT_FOUND") {
      //     message = "Please enter correct Username or Password.";
      //   }
      //   if (errorId === "INVALID_PASSWORD") {
      //     message = "Please enter correct Username or Password.";
      //   }
      //   if (errorId === "USER_DISABLED") {
      //     message = " The user account has been disabled by an administrator.";
      //   }
      //   throw new Error(message);
      // }
      
      const resData = await response.json();
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn)*1000
        );
        
      // dispatch(authenticate(resData.idToken, resData.localId, expirationDate));
      dispatch({type: LOGIN , token : resData.token, userId :resData.user._id, role: resData.user.role});
      dispatch(authenticate(resData.token, resData.user._id, resData.user.role, parseInt(resData.expiresIn)*1000))
      storeDataToStorage(resData.token, resData.user._id, resData.user.role, expirationDate);

    }catch(e){
      console.log(e)

    }
  };
};

const storeDataToStorage = (token, userId, role, expirationDate) => {
  AsyncStorage.setItem(
    "userCreds",
    JSON.stringify({
      token: token,
      userId: userId,
      role: role,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const logout = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userCreds");
    const transformedData = JSON.parse(userData);
    const { token, userId, expiryDate } = transformedData;
    const response = await fetch(
      "https://coffee-cart-node-api.herokuapp.com/users/logout",
      // "http://192.168.137.1:3000/users/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
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




/*
        // "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTBpQ_c4afdk3wjbZRLBsaxf7Pta_eTLQ",
*/