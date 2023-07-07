const initialState = {
  user: {},
  error: null,
};
debugger;
const authReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case "SIGNUP_SUCCESS":
    case "PIN_VERIFY_SUCCESS":
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case "SIGNUP_ERROR":
    case "PIN_VERIFY_ERROR":
    case "SIGNIN_ERROR":
    case "SIGNOUT_ERROR":
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case "SIGNOUT_SUCCESS":
      return {
        ...state,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
