import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware, Action, Dispatch } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from './store/reducer/auth';
import productsReducer from './store/reducer/products';
import cartReducer from './store/reducer/cart';
import AppNavigator from './navigation/AppNavigator';
import ordersReducer from './store/reducer/orders';
import { LogBox } from 'react-native';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = Dispatch<Action<string>> & ThunkDispatch<RootState, unknown, Action<string>>;
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  LogBox.ignoreAllLogs(true)
  return (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  );
}
