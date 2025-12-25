import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Text, Image } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Containers
import AllCashgrams from 'containers/AllCashgrams';
import BatchCashgrams from 'containers/BatchCashgrams';
import ApproveBatchCashgrams from 'containers/ApproveBatchCashgrams';
import VerifyBeneficiary from 'containers/VerifyBeneficiary';
import CashgramDetails from 'containers/CashgramDetails';
import BatchCashgramDetails from 'containers/BatchCashgramDetails';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Images
import logoIcon from 'images/pitch-page/logos/cashgram.svg';
import thumbnail from 'images/pitch-page/thumbnails/cashgram-pitch.png';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';
import { descriptions, features } from './constants';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import PitchPage from 'components/PitchPage';

// Utils
import Env from 'utils/env';

const Cashgrams: React.FC = () => {
  const { preferences } = useAccount();

  if (!Env.isTest() && !_get(preferences, 'cashgrams.activated', false)) {
    return (
      <>
        <MetaTags title="Cashgram" />
        <PitchPage
          title={
            <>
              <Image inline className="mr-1 mb-1" src={logoIcon} /> Cashgram -
              Send Payout Links
            </>
          }
          product="Cashgram"
          descriptions={descriptions}
          features={features}
          activationContent={
            <Text variant="p14">
              Cashgram will be activated on the same pricing as Payouts.
            </Text>
          }
          thumbnail={thumbnail}
          embedKey="PITCH_CASHGRAM"
        />
      </>
    );
  }

  return (
    <ListProvider>
      <BatchDetailsProvider>
        <Routes>
          <Route
            path={PATH_BY_SUBMENU[SUBMENU.ALL]}
            element={<AllCashgrams />}
          />
          <Route
            path={PATH_BY_SUBMENU[SUBMENU.BATCH]}
            element={<BatchCashgrams />}
          />
          <Route
            path={PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH]}
            element={<ApproveBatchCashgrams />}
          />
          <Route
            path={PATH_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY]}
            element={<VerifyBeneficiary />}
          />
          <Route
            path={PATH_BY_SUBMENU[SUBMENU.DETAILS]}
            element={<CashgramDetails />}
          />
          <Route
            path={PATH_BY_SUBMENU[SUBMENU.BATCH_DETAILS]}
            element={<BatchCashgramDetails />}
          />
          <Route
            path={PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH_DETAILS]}
            element={<BatchCashgramDetails />}
          />
          <Route
            path="*"
            element={<Navigate to={PATH_BY_SUBMENU[SUBMENU.ALL]} replace />}
          />
        </Routes>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default withReadPermission(Cashgrams, {
  code: 2170,
  description: `access ${LABEL_BY_MENU[MENU.CASHGRAMS]}`,
});
