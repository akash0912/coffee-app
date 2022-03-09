import { SET_DID_TRY_AL, LOGOUT, LOGIN } from "../actions/auth";
const initialState = {
  token: null,
  userId: null,
  role: null,
  didTryAutoLogin: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      
      return {
        token: action.token,
        userId: action.userId,
        role: action.role,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        initialState,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
  }
  return state;
};
