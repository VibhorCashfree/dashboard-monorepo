import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import Icon from 'components/Icon';
import PreferenceList from './PreferenceList';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { LABEL_BY_PREFERENCE_TYPE } from '../constants';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Styled
import { BackButtonWrapper } from 'styled/common';

const Preferences: React.FC = () => {
  const { preferences } = useAccount();

  const navigate = useNavigate();

  return (
    <>
      <PageHeader embedKey="SETTINGS">
        <span>{LABEL_BY_MENU[MENU.SETTINGS]} - </span>{' '}
        {LABEL_BY_SUBMENU[SUBMENU.PREFERENCES]}
      </PageHeader>

      <MetaTags
        title={`${LABEL_BY_MENU[MENU.SETTINGS]} – ${
          LABEL_BY_SUBMENU[SUBMENU.PREFERENCES]
        }`}
      />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      {Object.values(LABEL_BY_PREFERENCE_TYPE)
        .filter((preferenceType: string) => {
          if (
            preferenceType === LABEL_BY_PREFERENCE_TYPE.CASHGRAM &&
            !preferences.cashgrams.activated
          ) {
            return false;
          }

          return true;
        })
        .map((preferenceType: string) => (
          <PreferenceList
            key={preferenceType}
            preferenceType={preferenceType}
          />
        ))}
    </>
  );
};

export default withErrorBoundary(
  withReadPermission(Preferences, {
    code: 22006,
    description: `access ${LABEL_BY_SUBMENU[SUBMENU.PREFERENCES]}`,
  }),
);
