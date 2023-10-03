import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export interface AuthenticateAction {
    type: typeof AUTHENTICATE;
    userId: string;
    token: string;
  }
  
  export interface SetDidTryALAction {
    type: typeof SET_DID_TRY_AL;
  }
  
  export interface LogoutAction {
    type: typeof LOGOUT;
  }
  
// This type is a union of all your action types.
export type AuthActionTypes = AuthenticateAction | SetDidTryALAction | LogoutAction;
  

export const setDidTryAL = () => {
  return { type: typeof SET_DID_TRY_AL };
};

export const authenticate = (userId: string, token: string): AuthenticateAction => {
  return { type: AUTHENTICATE, userId, token };
};

export const signup = (email: string, fullname: string, phoneNumber: string, address: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
    
        dispatch(authenticate('1', 'token'));
    
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
        dispatch(authenticate('1', 'token'));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: typeof LOGOUT };
};

const saveDataToStorage = async (token: string, userId: string) => {
  const jsonValue = JSON.stringify({
    token: token,
    userId: userId,
  });
  await AsyncStorage.setItem('userData', jsonValue);
};
