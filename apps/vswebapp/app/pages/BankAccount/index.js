import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Text } from '@cashfree-intl/coherent';
import _last from 'lodash/last';
import _remove from 'lodash/remove';

// Containers
import BankAccountDetails from 'containers/BankAccountDetails';
import BatchBankAccountDetails from 'containers/BatchBankAccountDetails';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Styled
import { StyledLink } from './styled';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import { videoEmbedkeys } from './constants';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import FreeCreditsBanner from 'components/FreeCreditsBanner';
import Tabs from './components/Tabs';
import PitchPage from 'components/PitchPage';

// Utils
import PitchPageConfig from 'utils/pitchPage';

const BankAccount = () => {
  const [show, setShow] = useState(true);

  const location = useLocation();

  const { preferences } = useContext(AccountContext);

  const handleShowDetails = () => {
    setShow(false);
    PitchPageConfig.set(
      _remove(PitchPageConfig.get(), product => product !== 'BAV'),
    );
  };

  const activeTabName = _last(location.pathname.split('/'));

  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader embedKey={videoEmbedkeys[activeTabName]}>
          Bank Account
        </PageHeader>
        <MetaTags title="Secure ID – Bank Account" />
        <Text style={{ marginTop: '-16px' }}>
          You can now view real-time bank downtime updates before BAV initiation
          via the{' '}
          <StyledLink
            as="span"
            onClick={() =>
              window.open('https://status.cashfree.com/payouts', '_blank')
            }
          >
            Secure ID downtime page.
          </StyledLink>
        </Text>

        {PitchPageConfig.get().includes('BAV') && show ? (
          <PitchPage
            productCode="BAV"
            btnText="Try Bank Account Verification"
            onBtnClick={handleShowDetails}
          />
        ) : (
          <>
            <FreeCreditsBanner productLabel="BAV" />
            <Routes>
              <Route
                exact
                path=":id/details"
                element={<BankAccountDetails />}
              />
              <Route
                path="batch/:id/details"
                element={<BatchBankAccountDetails />}
              />
              <Route path=":tabId" element={<Tabs />} />
              <Route path="*" element={<Navigate to="all" replace />} />
            </Routes>
          </>
        )}
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default withReadPermission(BankAccount, {
  code: 20006,
  description: 'access Bank Account',
});
