import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductHitItem from '../../components/shop/ProductHitItem';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-native";
import SearchBox from "../../components/UI/SearchBox";
import InfiniteHits from "../../components/UI/InfiniteHits";

import axios from 'axios';

const MostPopularScreen = props => {
  const searchClient = algoliasearch(
    "QNMIJGZQVG",
    "78701f3e2c1e8c9d64f822c3f0175eab"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [focus, setFocus] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/recommendations')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  const SearchedProductItem = (item, navigation) => {
    return (
      <ProductHitItem hit={item} onSelect={() => {
        navigation.navigate('ProductDetail', {
          productId: item.objectID,
          productTitle: item.title
        });
        
      }}/>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <View>
      <InstantSearch searchClient={searchClient} indexName="products">
        <SearchBox focus={() => setFocus(!focus)} focusState={focus} search={() => setFocus(true)} />
        {focus && (
          <InfiniteHits
            listItem={SearchedProductItem} navigation={props.navigation}
          />
        )}
      </InstantSearch>
      {!focus && (
        <FlatList
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          data={products}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              description={itemData.item.description}
              price={itemData.item.price}
              isEdit={false}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
              onAdd={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          )}
        />
      )}
    </View>

  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Most Popular',
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
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default MostPopularScreen;
