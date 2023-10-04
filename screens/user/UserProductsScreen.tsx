import React from 'react';
import { View, Text, FlatList, Alert, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
import { AppDispatch } from '../../App';

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

const UserProductsScreen = (props: any) => {
  const userProducts = useSelector((state: { products: { userProducts: Product[] } }) => state.products.userProducts);
  const dispatch = useDispatch<AppDispatch>();
  
  const editProductHandler = (id: string) => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item: Product) => item.id}
      renderItem={(itemData: { item: Product }) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          description={itemData.item.description}
          price={itemData.item.price}
          isEdit={true}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}      />
      )}
    />
  );
};

export const screenOptions = (navData: any) => {
  return {
    headerTitle: 'Your Products',
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
