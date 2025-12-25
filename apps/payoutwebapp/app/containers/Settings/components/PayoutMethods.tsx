import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Loader,
  Icon,
  Text,
  Space,
  Tab,
  TabPane,
} from '@cashfree-intl/coherent';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Utils
import FundSourcesUtil from 'utils/fundSources';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import FundSourceCharges from './FundSourceCharges';

// Constants
import { SUBMENU, LABEL_BY_SUBMENU } from 'constants/menuItems';
import { LABEL_BY_MODE } from 'constants/modes';

// Styled
import { BackButtonWrapper } from 'styled/common';

// Types
import type { Preferences, PayoutMethodsProps } from '../types';

const menuConfig = {
  fluid: true,
  vertical: true,
  tabular: true,
};

const PayoutMethods: React.FC<PayoutMethodsProps> = ({ fundSources }) => {
  const { preferences } = useAccount() as {
    preferences: Preferences;
  };

  const navigate = useNavigate();

  const activeFundsources = FundSourcesUtil.getActives(fundSources);

  const enabledModes = Object.keys(preferences.modeByName);

  const panes = enabledModes.map((mode: string) => ({
    menuItem: LABEL_BY_MODE[mode as keyof typeof LABEL_BY_MODE] || mode,
    key: mode,
    render: () => {
      const fundSourcesWithModes = activeFundsources.filter(
        (fundSource: AnyObject) => fundSource.supportedModes.includes(mode),
      );

      if (!_size(fundSources)) {
        return <Loader active />;
      }

      return (
        <TabPane attached={false}>
          {_size(fundSourcesWithModes) > 0 ? (
            <Space gap={2} wrap>
              {fundSourcesWithModes.map((fundSource: AnyObject) => (
                <FundSourceCharges
                  key={fundSource.fundSourceId}
                  mode={mode}
                  fundSource={fundSource}
                />
              ))}
            </Space>
          ) : (
            <Space
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap={4}
              style={{ height: 500 }}
            >
              <Text
                className="text-wrap"
                style={{ textAlign: 'center', width: 500 }}
              >
                This mode is not enabled! <br />
                <br /> Contact your Account Manager or write to us at{' '}
                <a href="mailto:care@cashfree.com">care@cashfree.com</a> if you
                face issues in enabling or wish to disable any payout method.
              </Text>
              <Icon name="noRecordsTableIcon" />
            </Space>
          )}
        </TabPane>
      );
    },
  }));

  return (
    <>
      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <PageHeader>{LABEL_BY_SUBMENU[SUBMENU.PAYOUT_METHODS]}</PageHeader>
      <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.PAYOUT_METHODS]} />

      <Text color="bodyLight" className="mt-1 mb-4">
        Payout methods offered by Cashfree, along with the status, are shown
        here. You can enable more payout methods by requesting for them from
        merchant dashboard. <br /> Contact your Account Manager or write to us
        at <a href="mailto:care@cashfree.com">care@cashfree.com</a> if you face
        issues in enabling or wish to disable any payout method.
      </Text>

      <Tab menu={menuConfig} panes={panes} />
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const connector = connect(mapStateToProps);

export default withErrorBoundary(connector(PayoutMethods));
