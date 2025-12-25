// Services
import { getFavouriteProducts } from 'services/accounts';

export const FETCH_FAVOURITE_PRODUCTS = 'FETCH_FAVOURITE_PRODUCTS';

const fetchFavouriteProducts = () =>
  async function thunk(dispatch) {
    const payload = await getFavouriteProducts();

    if (!payload.error) {
      dispatch({
        type: FETCH_FAVOURITE_PRODUCTS,
        payload,
      });
    }
  };

export default fetchFavouriteProducts;
