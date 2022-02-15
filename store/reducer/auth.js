import { SET_DID_TRY_AL,  LOGOUT,LOGIN } from "../actions/auth";
const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
        // console.log(action.token)
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return { 
        initialState, 
        didTryAutoLogin: true
     };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
  }
  return state;
};
