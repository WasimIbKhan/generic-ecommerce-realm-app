import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

interface State {
  orders: Order[];
}

interface Action {
  type: string;
  orders?: Order[];
  orderData?: {
    id: string;
    items: any[];  // Replace with your item type
    amount: number;
    date: Date;
  };
}

const initialState: State = {
  orders: []
};

const ordersReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders!
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData!.id,
        action.orderData!.items,
        action.orderData!.amount,
        action.orderData!.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    default:
      return state;
  }
};

export default ordersReducer;
