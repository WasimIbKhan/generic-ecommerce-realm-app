import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import { AppDispatch } from '../../App';

// Defining types
interface CartItem {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  sum: number;
}

const CartScreen = (props: any) => { // You might want to replace 'any' with a specific type once you define the type for your props.
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount); // Define a type for your state.
  const cartItems = useSelector((state: any) => { // Define a type for your state.
    const transformedCartItems: CartItem[] = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch<AppDispatch>();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item: CartItem) => item.productId}
        renderItem={({item}: {item: CartItem}) => (
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
