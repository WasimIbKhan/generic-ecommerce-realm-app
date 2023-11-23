import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import Product from '../../models/product';


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

  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch recommended products when the component is loaded
    axios.post('http://10.0.2.2:5000/get_recommendations', { product_id: productId })
      .then(response => {
        const rawData = response.data;

        // Transform the data to match the expected structure using the Product model
        const structuredProducts = rawData.map(prod => {
          // Remove ₹, divide by 100, and round to get an integer for discounted_price
        const discountedPrice = parseFloat(prod.discounted_price.replace('₹', ''));

        // Remove ₹, divide by 100, and round to get an integer for actual_price
        const actualPrice = parseFloat(prod.actual_price.replace('₹', ''));

          return new Product(
            prod.product_id,
            prod.user_id, // Assuming user_id is the ownerId
            prod.product_name,
            prod.img_link,
            prod.about_product,
            discountedPrice, // Convert the integer back to string for the Product model
            prod.product_id,
            prod.weighted_rating,
            prod.category,
            discountedPrice,
            actualPrice,
            prod.discount_percentage,
            prod.rating,
            prod.rating_count,
            prod.about_product,
            prod.user_id,
            prod.user_name,
            prod.review_id,
            prod.review_title,
            prod.review_content,
            prod.product_link
          );
        });

        console.log(structuredProducts);
        setRecommendedProducts(structuredProducts);
      })
      .catch(error => {
        console.error("Error fetching recommendations:", error);
      });
  }, [productId]);

  
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
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Recommended Products:</Text>
        {recommendedProducts.map(product => (
          <View key={product.id} style={{ marginVertical: 10 }}>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <Text>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
        ))}
      </View>
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
