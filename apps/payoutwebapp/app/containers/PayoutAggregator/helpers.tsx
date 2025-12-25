import React from 'react';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';

// Components
import AccountDetails from './components/AccountDetails';
import VerifyProdCredentials from './components/VerifyProdCredentials';

// Constants
import { MODAL_TYPE } from 'containers/AllFundSources/constants';
import { REQUIRED_FIELDS } from './constants';

// Types
import type { WizardDataState } from './types';

export const getFormWizardItems = ({
  wizardData,
  fundSources,
  setModalType,
}: {
  wizardData: WizardDataState;
  fundSources: AnyObject[];
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
}) => {
  const fundSourceById = _keyBy(fundSources, 'fundSourceId');
  const fundSource = _get(fundSourceById, [wizardData.fundSourceId!], {});

  return [
    {
      label: 'Account Details',
      render: (props: AnyObject) => <AccountDetails {...props} />,
      requiredFields: () => REQUIRED_FIELDS.ACCOUNT_DETAILS,
    },
    {
      label: 'Verify Production API Credentials',
      render: (props: AnyObject) => (
        <VerifyProdCredentials
          fundSource={fundSource}
          setModalType={setModalType}
          {...props}
        />
      ),
      requiredFields: () => REQUIRED_FIELDS.VERIFY_PROD_CREDS,
    },
  ];
};
