import React from 'react';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';
import _identity from 'lodash/identity';
import _without from 'lodash/without';

// Components
import AccountDetails from './components/AccountDetails';
import RouterAccountDetails from './components/RouterAccountDetails';
import ICICIBusinessDetails from './components/ICICIBusinessDetails';
import YesBusinessDetails from './components/YesBusinessDetails';
import MakePayment from './components/MakePayment';
import VerifyUATCredentials from './components/VerifyUATCredentials';
import VerifyProdCredentials from './components/VerifyProdCredentials';

// Constants
import { MODAL_TYPE } from 'containers/AllFundSources/constants';
import {
  REQUIRED_FIELDS,
  CONNECTED_BANK,
  ACCOUNT_PREFERENCE,
} from './constants';

// Types
import type { WizardDataState } from 'containers/PayoutAggregator/types';

export const getFormWizardItems = ({
  isRouter,
  wizardData,
  fundSources,
  setModalType,
  modalData,
  setModalData,
}: {
  isRouter?: boolean;
  wizardData: WizardDataState;
  fundSources: AnyObject[];
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  modalData?: AnyObject;
  setModalData: React.Dispatch<React.SetStateAction<AnyObject>>;
}) => {
  const fundSourceById = _keyBy(fundSources, 'fundSourceId');
  const fundSource = _get(fundSourceById, [wizardData.fundSourceId || 0], {});

  const accountDetailsStep = {
    label: 'Account Details',
    render: (props: AnyObject) =>
      isRouter ? (
        <RouterAccountDetails lead={wizardData.lead} {...props} />
      ) : (
        <AccountDetails modalData={modalData} {...props} />
      ),
    requiredFields: ({ formObj }: { formObj: AnyObject }) => {
      switch (true) {
        case formObj.accountPreference === ACCOUNT_PREFERENCE.SECOND:
        case formObj.accountPreference === ACCOUNT_PREFERENCE.THIRD:
          return [];

        case formObj.bankName === CONNECTED_BANK.ICICI_COMP_CONNECTED:
          return REQUIRED_FIELDS.ACCOUNT_DETAILS;

        default:
          return _without(REQUIRED_FIELDS.ACCOUNT_DETAILS, 'supportedModes');
      }
    },
  };

  let wizardItems = [accountDetailsStep];

  switch (wizardData.bankName) {
    case CONNECTED_BANK.ICICI_CONNECTED:
      wizardItems = wizardItems.concat([
        {
          label: 'Business Details',
          render: (props: AnyObject) => (
            <ICICIBusinessDetails
              fundSource={fundSource}
              setModalType={setModalType}
              {...props}
            />
          ),
          requiredFields: () => REQUIRED_FIELDS.BUSINESS_DETAILS.ICICI,
        },
      ]);
      break;

    case CONNECTED_BANK.YES_TSP:
      wizardItems = wizardItems.concat([
        {
          label: 'Business Details',
          render: (props: AnyObject) => (
            <YesBusinessDetails
              fundSource={fundSource}
              setModalType={setModalType}
              setModalData={setModalData}
              {...props}
            />
          ),
          requiredFields: () => REQUIRED_FIELDS.BUSINESS_DETAILS.YES,
        },
      ]);
      break;

    default:
      wizardItems = wizardItems.concat([
        {
          label: 'Verify UAT Credentials',
          render: (props: AnyObject) => (
            <VerifyUATCredentials
              fundSource={fundSource}
              setModalType={setModalType}
              {...props}
            />
          ),
          requiredFields: () => REQUIRED_FIELDS.VERIFY_CREDS.UAT,
        },
        {
          label: 'Verify Production Credentials',
          render: (props: AnyObject) => (
            <VerifyProdCredentials
              fundSource={fundSource}
              setModalType={setModalType}
              {...props}
            />
          ),
          requiredFields: () => REQUIRED_FIELDS.VERIFY_CREDS.PROD,
        },
      ]);
      break;
  }

  wizardItems = wizardItems.concat({
    label: 'Make Payment',
    render: (props: AnyObject) => (
      <MakePayment
        fundSource={fundSource}
        setModalType={setModalType}
        {...props}
      />
    ),
    requiredFields: () => REQUIRED_FIELDS.MAKE_PAYMENT,
  });

  return wizardItems.filter(_identity);
};
