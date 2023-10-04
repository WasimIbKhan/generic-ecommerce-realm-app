import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, UPDATE_PRODUCTS, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

interface State {
  availableProducts: Product[];
  userProducts: Product[];
}

interface Action {
  type: string;
  products?: Product[];
  userProducts?: Product[];
  productData?: {
    id: string;
    ownerId: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
  };
  pid?: string;
}

const initialState: State = {
  availableProducts: [],
  userProducts: []
};

const productsReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products!,
        userProducts: action.userProducts!
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData!.id,
        action.productData!.ownerId,
        action.productData!.title,
        action.productData!.imageUrl,
        action.productData!.description,
        action.productData!.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        availableProducts: state.availableProducts.concat(action.products!)
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid!,
        state.userProducts[productIndex].ownerId,
        action.productData!.title,
        action.productData!.imageUrl,
        action.productData!.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
    default:
      return state;
  }
};

export default productsReducer;
