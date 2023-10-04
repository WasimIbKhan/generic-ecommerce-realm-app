import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

interface Product {
  id: string;
  imageUrl: string;
  price: number;
  description: string;
}

interface RouteParams {
  productId: string;
  productTitle?: string;
}

interface Props {
  route: {
    params: RouteParams;
  };
  navigation: any; // You may want to define a type for navigation
}

const ProductDetailScreen = (props: Props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state: any) =>
    state.products.availableProducts.find((prod: Product) => prod.id === productId)
  )!;
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData: { route: { params: RouteParams } }) => {
  return {
    headerTitle: navData.route.params.productTitle
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;
