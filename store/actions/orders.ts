import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../App'; // Assume RootState is your combined reducer type
import { Action } from 'redux';
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export interface CartItem {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  sum: number;
}

export interface AddOrderAction {
  type: typeof ADD_ORDER;
  orderData: {
    id: string;
    items: CartItem[];
    amount: number;
    date: Date;
  };
}

export interface SetOrdersAction {
  type: typeof SET_ORDERS;
  orders: Order[];
}

export type OrderActions = AddOrderAction | SetOrdersAction;

export const fetchOrders = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const loadedOrders: Order[] = [];

    try {
      dispatch({ type: SET_ORDERS, orders: loadedOrders});
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems: CartItem[], totalAmount: number): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const date = new Date();

    let newId = '';


    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: newId,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
