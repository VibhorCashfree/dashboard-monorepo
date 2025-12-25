import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
// Services
import {
  getAccountList,
  getActivationDetails,
  getProductDetails,
} from 'services/accounts';

export const MerchantContext = createContext();

export const MerchantProvider = ({ children }) => {
  const [contextData, setContextData] = useState();

  useEffect(() => {
    (async function fetchData() {
      const [accountList, accountDetails, productDetails] = await Promise.all([
        getAccountList(),
        getActivationDetails(),
        getProductDetails(),
      ]);

      const activationDetails = {
        ..._get(productDetails, 'data', {}),
        userType: _get(accountDetails, 'data.userType', ''),
        authType: _get(accountDetails, 'data.authType', ''),
        merchantId: _get(accountDetails, '.data.merchantId', ''),
      };

      // if (!localStorage.getItem('PITCH_PAGES_TEST')) {
      //   localStorage.setItem(
      //     'PITCH_PAGES_TEST',
      //     JSON.stringify([
      //       'BAV',
      //       'UPI',
      //       'PAN',
      //       'AADHAAR',
      //       'GSTIN',
      //       'IFSC',
      //       'FORMS',
      //     ]),
      //   );
      // }

      // if (!localStorage.getItem('PITCH_PAGES_PROD')) {
      //   localStorage.setItem(
      //     'PITCH_PAGES_PROD',
      //     JSON.stringify([
      //       'BAV',
      //       'UPI',
      //       'PAN',
      //       'AADHAAR',
      //       'GSTIN',
      //       'IFSC',
      //       'FORMS',
      //     ]),
      //   );
      // }

      if (!localStorage.getItem('NOTIFICATION')) {
        localStorage.setItem(
          'NOTIFICATION',
          JSON.stringify(['API_KEY', '2FA']),
        );
      }

      setContextData({
        accountList,
        activationDetails,
      });
    })();
  }, []);

  if (!contextData) {
    return null;
  }

  return (
    <MerchantContext.Provider value={contextData}>
      {children}
    </MerchantContext.Provider>
  );
};

MerchantProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
