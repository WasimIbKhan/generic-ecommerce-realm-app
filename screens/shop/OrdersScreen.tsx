import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import { AppDispatch } from '../../App';

interface Order {
  id: string;
  totalAmount: number;
  readableDate: string;
  items: any[]; // Define a type for items based on its structure
}

const OrdersScreen = (props: any) => { // Define a type for props if possible
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector((state: any) => state.orders.orders); // Define a type for state
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders())
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No order found, maybe start ordering some products?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item: Order) => item.id}
      renderItem={({item}: {item: Order}) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          items={item.items}
        />
      )}
    />
  );
};

export const screenOptions = (navData: any) => { // Define a type for navData
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrdersScreen;
