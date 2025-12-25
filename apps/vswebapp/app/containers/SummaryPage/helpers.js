// Constants
import { PRODUCT_MAPPING } from 'constants/products';

export const getProductOptions = () =>
  Object.keys(PRODUCT_MAPPING).reduce((prev, curr) => {
    const sectionProducts = PRODUCT_MAPPING[curr].map(product => ({
      text: product.displayText,
      value: product.code,
    }));

    return [...prev, ...sectionProducts];
  }, []);
