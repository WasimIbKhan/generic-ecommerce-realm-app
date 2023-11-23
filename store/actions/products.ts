import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../App'; // Assume RootState is your combined reducer type
import { Action } from 'redux';
// Assuming required imports from firebase/firestore

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

// Define action types

import PRODUCTS from '../../data/dummy-data';
import axios from 'axios';
import Product from '../../models/product';

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  pid: string;
}

interface CreateProductAction {
  type: typeof CREATE_PRODUCT;
  productData: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    ownerId: string;
  };
}

interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  pid: string;
  productData: {
    title: string;
    description: string;
    imageUrl: string;
  };
}

interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  products: any[]; // Make sure to define a proper type for products
  userProducts: any[]; // Make sure to define a proper type for userProducts
}

interface UpdateProductsAction {
  type: typeof UPDATE_PRODUCTS;
  products: any[]; // Make sure to define a proper type for products
}

export type ProductActions =
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction
  | SetProductsAction
  | UpdateProductsAction;

// Define action creators

export const fetchProducts = (page: number): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await axios.get(`http://10.0.2.2:3000/products?page=${page}`);
      if (!response.data) {
        throw new Error('Something went wrong!');
      }

      const products = await response.data;

      const loadedProducts = products.map(prod => {
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


      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    // Assuming `getFirestore()` has been imported and initialized properly
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let newId = ''; // Define logic to generate/obtain new ID
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: newId,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};

export const updateProducts = (
  products: any[] // Ensure to define a proper type for products
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: products
    });
  };
};
