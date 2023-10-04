import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import axios from 'axios';
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-native";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductHitItem from "../../components/shop/ProductHitItem";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";
import SearchBox from "../../components/UI/SearchBox";
import InfiniteHits from "../../components/UI/InfininiteHits";
import { AppDispatch } from "../../App";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

interface Props {
  navigation: {
    navigate: (scene: string, params?: any) => void;
    toggleDrawer: () => void;
    addListener: (
      event: string,
      callback: () => void
    ) => { remove: () => void };
  };
  route: {
    params: {
      productId: string;
      productTitle: string;
    };
  };
}

const ProductsOverviewScreen: React.FC<Props> = (props) => {
  const searchClient = algoliasearch(
    "QNMIJGZQVG",
    "78701f3e2c1e8c9d64f822c3f0175eab"
  );

  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const products = useSelector((state: any) => state.products.availableProducts);
  const dispatch = useDispatch<AppDispatch>();

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
    const unsubscribe = props.navigation.addListener("focus", loadProducts);

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


  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const SearchedProductItem = (item: any, navigation: any) => {
    return (
      <ProductHitItem
        hit={item}
        onSelect={() => {
          navigation.navigate("ProductDetail", {
            productId: item.objectID,
            productTitle: item.title,
          });
        }}
      />
    );
  };

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
        <SearchBox
          focus={() => setFocus(!focus)}
          focusState={focus}
          search={() => setFocus(true)}
        />
        {focus && (
          <InfiniteHits
            listItem={SearchedProductItem}
            navigation={props.navigation}
          />
        )}
      </InstantSearch>
      {!focus && (
        <FlatList
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          data={products}
          keyExtractor={(item: Product) => item.id}
          renderItem={(itemData: {item: Product}) => (
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              description={itemData.item.description}
              price={itemData.item.price}
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

export const screenOptions = (navData: any) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
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
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsOverviewScreen;
