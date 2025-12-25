const keyByCode = {
  CSP: 'summary',
  CG: 'cashgrams',
};

export const getProductRoute = (productCode: string | null) => {
  if (!productCode) {
    return window.location.pathname;
  }

  let productKey = 'summary';

  if (productCode in keyByCode) {
    productKey = keyByCode[productCode as keyof typeof keyByCode];
  }

  return `${process.env.PUBLIC_PATH}${productKey}`;
};
