import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toast } from '@cashfree-intl/coherent';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';
import { useDetails } from 'containers/FundSourceDetails/providers';

// Services
import {
  connect as connectFn,
  getServiceChargesCount,
} from 'services/fundSources';

// Actions
import fetchFundSourcesAction from 'redux/actions/fetchFundSources';

// Utils
import Banks from 'utils/banks';
import { emitUserValidation } from 'utils/common';

// Constants
import { FORMATS } from 'constants/date';
import { BANK_CODE } from 'constants/banks';
import { FS_DISPLAY_TYPE, AGGREGATOR } from 'constants/fundSources';
import { PATH_BY_MENU, MENU } from 'constants/menuItems';
import {
  STATUS,
  ACTION_TYPE,
  MODAL_TYPE,
} from 'containers/AllFundSources/constants';

// Helpers
import { getActions } from './helpers';

// Components
import Alert from 'components/Alert';
import ExtendedDropdown from 'components/ExtendedDropdown';
import Modals from 'containers/AllFundSources/components/Modals';
import ICICI from './components/ICICI';
import YesBank from './components/YesBank';
import OtherBanks from './components/OtherBanks';
import CashfreeWallet from './components/CashfreeWallet';
import ConnectedWallet from './components/ConnectedWallet';
import Aggregator from './components/Aggregator';

// Types
import type { OverviewProps } from './types';

const Overview: React.FC<OverviewProps> = ({ fetchFundSources }) => {
  const { merchantDetails, restrictionCodes } = useMerchant();
  const { preferences } = useAccount();
  const { details } = useDetails();

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [modalData, setModalData] = useState<AnyObject>();
  const [collectedAmount, setCollectedAmount] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    (async function fetchData() {
      const queryObj = {
        startDate: moment().startOf('month').format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
      };

      const response = await getServiceChargesCount(
        details.fundSourceId,
        queryObj,
      );

      if (!('error' in response)) {
        setCollectedAmount(response.totalAmount);
      }
    })();
  }, [details.fundSourceId]);

  const bankCode: string = Banks.getCode(details.ifsc);

  const handleAction = async (itemSelected: ACTION_TYPE) => {
    switch (itemSelected) {
      case ACTION_TYPE.CONNECT:
        if (details.connBankName === AGGREGATOR.RAZORPAY) {
          setModalType(MODAL_TYPE.CREATE_AGGREGATOR);
        } else if (preferences.enableRouter) {
          setModalType(MODAL_TYPE.CREATE_ROUTER_BANK_ACCOUNT);
        } else {
          setModalType(MODAL_TYPE.CREATE_BANK_ACCOUNT);
        }
        break;

      case ACTION_TYPE.ADD_BALANCE:
        emitUserValidation(() => setModalType(MODAL_TYPE.ADD_BALANCE));
        break;

      case ACTION_TYPE.UPDATE_DETAILS:
        setModalType(MODAL_TYPE.UPDATE_DETAILS);
        break;

      case ACTION_TYPE.DEACTIVATE:
        emitUserValidation(() => setModalType(MODAL_TYPE.DEACTIVATE));
        break;

      case ACTION_TYPE.APPROVE:
        switch (bankCode) {
          case BANK_CODE.ICIC:
            setModalType(MODAL_TYPE.APPROVE_ICIC);
            break;

          case BANK_CODE.YESB:
            {
              const response = await connectFn(details.fundSourceId);

              if (!('error' in response)) {
                if (response.status === STATUS.ACTIVE) {
                  fetchFundSources();
                  toast.success('Yes bank connection is successful');
                } else if (response.rawBankData) {
                  setModalData({
                    rawBankData: response.rawBankData,
                  });

                  setModalType(MODAL_TYPE.INVALID_ACCOUNT_YESB);
                }
              } else {
                setModalData({
                  url: (response.error as { title: string }).title,
                });

                setModalType(MODAL_TYPE.APPROVE_YESB);
              }
            }
            break;
        }

        break;
    }
  };

  const getContent = () => {
    const basePath = `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
      details.fundSourceId
    }/details`;

    const to = `${basePath}/service-charges?startDate=${+moment()
      .startOf('month')
      .toDate()}&endDate=${+moment().toDate()}`;

    switch (true) {
      case details.fsDisplayType === FS_DISPLAY_TYPE.CASHFREE_WALLET:
        return <CashfreeWallet />;

      case details.fsDisplayType === FS_DISPLAY_TYPE.CONNECTED_WALLET:
        return <ConnectedWallet />;

      case details.connBankName === AGGREGATOR.RAZORPAY:
        return <Aggregator />;

      case bankCode === BANK_CODE.ICIC:
        return <ICICI collectedAmount={collectedAmount} to={to} />;

      case bankCode === BANK_CODE.YESB:
        return <YesBank collectedAmount={collectedAmount} to={to} />;

      default:
        return <OtherBanks collectedAmount={collectedAmount} to={to} />;
    }
  };

  const actions = getActions(
    details,
    restrictionCodes,
    merchantDetails.userType,
    preferences,
  );

  return (
    <>
      {details.fsDisplayType === FS_DISPLAY_TYPE.CASHFREE_WALLET && (
        <Alert className="mt-3" type="warning" bordered rounded>
          <Alert.Content size="md">
            Please note, any additional funds parked in your wallet will be
            sweeped out to your account on a weekly basis. Please write to 
            <a href="mailto:care@cashfree.com">care@cashfree.com</a>  for more
            details.
          </Alert.Content>
        </Alert>
      )}

      <div className="text-right my-3">
        <ExtendedDropdown actions={actions} onClick={handleAction} />
      </div>

      {getContent()}

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          selectedRow={details}
          modalData={modalData}
          setModalData={setModalData}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchFundSources: () => dispatch(fetchFundSourcesAction()),
});

const withConnect = connect(null, mapDispatchToProps);

export default withConnect(Overview);
