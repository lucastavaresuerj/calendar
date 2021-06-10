const INITIAL_STATE = {
  isSignedIn: null,
  userName: "",
  userId: null,
  signOut: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: true, ...action.payload };
    case "SIGN_OUT":
      return { ...state, ...INITIAL_STATE, isSignedIn: false };
    default:
      return state;
  }
}
