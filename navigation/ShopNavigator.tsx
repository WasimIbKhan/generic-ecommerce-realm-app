import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import CartScreen, {
  screenOptions as cartScreenOptions,
} from '../screens/shop/CartScreen';
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from '../screens/shop/OrdersScreen';
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator: React.FC = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator: React.FC = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator: React.FC = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator: React.FC = () => {
  const dispatch = useDispatch();

  const drawerContent = (props: DrawerContentComponentProps) => {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SafeAreaView>
          <DrawerItemList {...props} />
          <Button
            title="Logout"
            color={Colors.primary}
            onPress={() => {
              dispatch(authActions.logout());
            }}
          />
        </SafeAreaView>
      </View>
    );
  };

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => drawerContent(props)}
      screenOptions={{
        drawerActiveTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          headerShown: false,
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          headerShown: false,
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          headerShown: false,
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};
