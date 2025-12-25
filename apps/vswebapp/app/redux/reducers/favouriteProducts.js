// Action types
import { FETCH_FAVOURITE_PRODUCTS } from 'redux/actions/fetchFavouriteProducts';

const favouriteProductsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_FAVOURITE_PRODUCTS:
      return action.payload;

    default:
      return state;
  }
};

export default favouriteProductsReducer;
