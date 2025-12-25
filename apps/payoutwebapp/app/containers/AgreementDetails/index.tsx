import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Text } from '@cashfree-intl/coherent';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Icon from 'components/Icon';
import Tabs from './components/Tabs';

// Providers
import { ListProvider } from 'providers/ListProvider';

// Styled
import { BackButtonWrapper } from 'styled/common';

const AgreementDetails: React.FC = () => {
  const navigate: (path: string) => void = useNavigate();

  return (
    <ListProvider>
      <PageHeader>
        {LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS]}{' '}
        {LABEL_BY_SUBMENU[SUBMENU.DETAILS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS]} ${
          LABEL_BY_SUBMENU[SUBMENU.DETAILS]
        }`}
      />

      <BackButtonWrapper
        onClick={() =>
          navigate(
            `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
              PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]
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
          element={
            <Navigate to={`${PATH_BY_SUBMENU[SUBMENU.OVERVIEW]}`} replace />
          }
        />
      </Routes>
    </ListProvider>
  );
};

export default AgreementDetails;
