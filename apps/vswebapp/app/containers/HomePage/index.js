import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ShellV2 } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Actions
import fetchFreeCreditsAction from 'redux/actions/fetchFreeCredits';
import fetchFavouriteProductsAction from 'redux/actions/fetchFavouriteProducts';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';
import { TourProvider } from 'providers/TourProvider';

// Factories
import PageFactory from 'factories/PageFactory';

// Components
import ErrorBoundary from 'components/ErrorBoundary';

// Utils
import Emitter from 'utils/emitter';
import { getMenuItems } from './utils';

const HomePage = ({
  fetchFreeCredits,
  fetchFavouriteProducts,
  favouriteProducts,
}) => {
  const { activationDetails } = useContext(MerchantContext);

  const [, setError] = useState(false);
  const [, setTry] = useState();

  const { activePageId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchFreeCredits();
    fetchFavouriteProducts();
  }, []);

  useEffect(() => {
    Emitter.on('PAGE_ERROR', setError);

    return () => {
      Emitter.off('PAGE_ERROR');
    };
  });

  const menuItems = getMenuItems(activationDetails, favouriteProducts);

  const isDevelopers = _get(window, 'location.pathname', '')
    .split('/')
    .includes('developers');

  const activeItem = _get(window, 'location.pathname', '')
    .split('/')
    .slice(2, isDevelopers ? 4 : 3)
    .join('/');

  const isSettingsPage =
    _get(window, 'location.pathname', '').split('/')[2] === 'settings';

  if (!activePageId) {
    return null;
  }

  return (
    <TourProvider>
      {!isSettingsPage && (
        <ShellV2.MainLayout.Sidebar
          activeItem={activeItem}
          sidebarItems={menuItems}
          onMenuItemClick={menuSelected => {
            navigate(`/${menuSelected}`);
          }}
        />
      )}
      <ShellV2.MainLayout.MainContent>
        <ErrorBoundary>
          <PageFactory componentName={activePageId} />
        </ErrorBoundary>
      </ShellV2.MainLayout.MainContent>
    </TourProvider>
  );
};

HomePage.propTypes = {
  fetchFreeCredits: PropTypes.func.isRequired,
};

const mapStateToProps = ({ favouriteProducts }) => ({
  favouriteProducts,
});

const mapDispatchToProps = dispatch => ({
  fetchFreeCredits: () => dispatch(fetchFreeCreditsAction()),
  fetchFavouriteProducts: () => dispatch(fetchFavouriteProductsAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(HomePage);
