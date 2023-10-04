import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware, Action, Dispatch } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from './store/reducer/auth';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = Dispatch<Action<string>> & ThunkDispatch<RootState, unknown, Action<string>>;
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  );
}
