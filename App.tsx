import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware, Action, Dispatch } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from './store/reducer/auth';
import AppNavigator from './navigation/AppNavigator';
import { RealmProvider } from '@realm/react';

const rootReducer = combineReducers({
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = Dispatch<Action<string>> & ThunkDispatch<RootState, unknown, Action<string>>;
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const UserSchema = {
    name: 'User',
    properties: {
      email: 'string',
      password: 'string'
    }
  };
  return (
    <Provider store={store}>
      <RealmProvider schema={[UserSchema]}>
        <AppNavigator />
      </RealmProvider>
    </Provider>
  );
}
