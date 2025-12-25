import _get from 'lodash/get';
import _find from 'lodash/find';

import NewIcons from 'components/CustomIcons/New';

// Utils
import Env from 'utils/env';
import AccountId from 'utils/accountId';

// Constants
import { featureItems, utilitiesItems } from './constants';
import { PRODUCT_MAPPING, PRODUCTS } from 'constants/products';

const showUPI = () => {
  const show = ['50895', '8784', '440201', '51826', '57678'].includes(
    AccountId.get(),
  );

  if (show) {
    return [...PRODUCT_MAPPING['bav'], PRODUCTS.UPIDETAILS_VALIDATION];
  }

  return PRODUCT_MAPPING['bav'];
};

export const getMenuItems = (activationDetails, favouriteProducts = []) => {
  if (Env.isTest()) {
    return {
      features: {
        items: featureItems,
      },
      subProducts: [
        {
          // label: 'BANK ACCOUNT/UPI',
          label: 'BANK ACCOUNT',
          items: PRODUCT_MAPPING['bav'].map(item => ({
            ...item,
            icon: NewIcons[item.icon],
          })),
        },
        {
          label: 'AADHAAR/PAN',
          items: PRODUCT_MAPPING['aadhar-pan'].map(item => ({
            ...item,
            icon: NewIcons[item.icon],
          })),
        },
        {
          label: 'Regulated Digital KYC',
          items: PRODUCT_MAPPING['digital-kyc'].map(item => ({
            ...item,
            icon: NewIcons[item.icon],
          })),
        },
        {
          label: 'Other Official Documents',
          items: PRODUCT_MAPPING['alternate-id'].map(item => ({
            ...item,
            icon: NewIcons[item.icon],
          })),
        },
        {
          label: 'KYB (KNOW YOUR BUSINESS)',
          items: PRODUCT_MAPPING['kyb'].map(item => ({
            ...item,
            icon: NewIcons[item.icon],
          })),
        },
      ],
      utilities: {
        items: utilitiesItems,
      },
    };
  }

  const utilities =
    _get(activationDetails, 'VRS', '') === 'APPROVED' ? utilitiesItems : [];

  const favourites = favouriteProducts.map(code =>
    _find(Object.values(PRODUCTS), { code }),
  );

  const prodItems = {
    features: {
      items: featureItems,
    },
    subProducts: [
      {
        label: 'My Products',
        items: favourites.map(item => ({
          ...item,
          icon: NewIcons[item.icon],
        })),
      },
      {
        label: 'Bank Account',
        items: showUPI().map(item => ({
          ...item,
          icon: NewIcons[item.icon],
        })),
      },
      {
        label: 'Aadhaar/PAN',
        items: PRODUCT_MAPPING['aadhar-pan'].map(item => ({
          ...item,
          icon: NewIcons[item.icon],
        })),
      },
      {
        label: 'Regulated Digital KYC',
        items: PRODUCT_MAPPING['digital-kyc'].map(item => ({
          ...item,
          icon: NewIcons[item.icon],
        })),
      },
      {
        label: 'Other Official Documents',
        items: PRODUCT_MAPPING['alternate-id'].map(item => ({
          ...item,
          icon: NewIcons[item.icon],
        })),
      },
      {
        label: 'KYB (Know your business)',
        items: PRODUCT_MAPPING['kyb'].map(item => ({
          ...item,
          icon: NewIcons[item.icon],
        })),
      },
    ],
    utilities: {
      items: utilities,
    },
  };

  if (favourites.length) {
    return prodItems;
  }

  prodItems.subProducts.shift();

  return prodItems;
};
