import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL, AuthActionTypes } from '../actions/auth';

interface AuthState {
  token: string | null;
  userId: string | null;
  didTryAutoLogin: boolean;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};


const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default authReducer;
