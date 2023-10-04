import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

import app from '../../realmConfig';

import axios from 'axios';

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
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: SET_DID_TRY_AL });
  }
};

export const authenticate = (userId: string, token: string): AuthenticateAction => {
  return { type: AUTHENTICATE, userId, token };
};

export const signup = (email: string, fullname: string, phoneNumber: string, address: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      // Sign up user in your Express server
      const response = await axios.post('http://10.0.2.2:3000/signup', { email, password, fullname, phoneNumber, address });
      const { token, userId } = response.data;
      console.log(response.data);
      // Authenticate with Realm using email/password
      console.log(email, password)
      
      try {
        await await app.emailPasswordAuth.registerUser({
          email: email,
          password: password,
        });
        // Success handling
    } catch (e) {
        console.error("Registration error", e);
        // Error handling
    }
      // Dispatch an action to update Redux store
      dispatch(authenticate(userId, token));

      // Store token and userId in AsyncStorage
      saveDataToStorage(token, userId);
    } catch (error) {
      // Handle error
    }
  };
};


export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      // Log in user in your Express server
      const response = await axios.post('http://10.0.2.2:3000/login', { email, password });
      const { token, userId } = response.data;

      // Authenticate with Realm using email/password
      const credentials = Realm.Credentials.emailPassword(email, password);
      const realmUser = await app.logIn(credentials);

      // Dispatch an action to update Redux store
      dispatch(authenticate(userId, token));

      // Store token and userId in AsyncStorage
      saveDataToStorage(token, userId);
    } catch (error) {
      // Handle error
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
