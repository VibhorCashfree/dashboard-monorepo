import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Text } from '@cashfree-intl/coherent';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Icon from 'components/Icon';
import Tabs from './components/Tabs';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { DetailsProvider, DetailsContext } from './providers';

// Styled
import { BackButtonWrapper } from 'styled/common';

const FundSourceDetails: React.FC = () => {
  const { preferences } = useAccount();

  const navigate = useNavigate();

  return (
    <DetailsProvider>
      <DetailsContext.Consumer>
        {(context) =>
          preferences.enableRouter ? (
            <>
              <PageHeader>
                Router – {LABEL_BY_SUBMENU[SUBMENU.AGGREGATORS]} –{' '}
                <span>{context?.details?.displayName}</span>
              </PageHeader>
              <MetaTags
                title={`Router – ${LABEL_BY_SUBMENU[SUBMENU.AGGREGATORS]} – ${
                  context?.details?.displayName
                }`}
              />
            </>
          ) : (
            <>
              <PageHeader>
                {LABEL_BY_MENU[MENU.FUND_SOURCES]} –{' '}
                <span>{context?.details?.displayName}</span>
              </PageHeader>
              <MetaTags
                title={`${LABEL_BY_MENU[MENU.FUND_SOURCES]} – ${
                  context?.details?.displayName
                }`}
              />
            </>
          )
        }
      </DetailsContext.Consumer>

      <BackButtonWrapper
        onClick={() =>
          navigate(
            preferences.enableRouter
              ? `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                  PATH_BY_SUBMENU[SUBMENU.AGGREGATORS]
                }`
              : `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                  PATH_BY_SUBMENU[SUBMENU.ALL]
                }`,
          )
        }
      >
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>
      <Routes>
        <Route path=":tabId" element={<Tabs />} />
        <Route
          path="*"
          element={<Navigate to={PATH_BY_SUBMENU[SUBMENU.OVERVIEW]} replace />}
        />
      </Routes>
    </DetailsProvider>
  );
};

export default FundSourceDetails;
