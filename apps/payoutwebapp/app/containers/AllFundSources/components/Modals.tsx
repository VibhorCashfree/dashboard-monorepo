import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toast,
  Image,
  Space,
  Button,
  Text,
  AlertModal,
  ConfirmModal,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _noop from 'lodash/noop';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Images
import screenshot1Icon from 'images/icici/screenshot-1.svg';
import screenshot2Icon from 'images/icici/screenshot-2.svg';

// Services
import { updateWeightage, deactivate } from 'services/fundSources';

// Actions
import fetchFundSourcesAction from 'redux/actions/fetchFundSources';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Utils
import getAlertIcon from 'utils/getAlertIcon';
import Analytics from 'utils/analytics';

// Containers
import BankAccountSelfServe from 'containers/BankAccountSelfServe';
import PayoutAggregator from 'containers/PayoutAggregator';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';
import { ICICI_LOGIN } from 'constants/urls';
import {
  MODAL_TYPE,
  YES_BUSINESS_TYPE,
  YES_BUSINESS_URL_BY_TYPE,
} from '../constants';

// Components
import Copy from 'components/Copy';
import Drawer from 'components/Drawer';
import UpdateWeightageModal from './UpdateWeightageModal';
import AddBalanceModal from './AddBalanceModal';
import UpdateDetailsModal from './UpdateDetailsModal';

// Styled
import { BtnContainer, CodeWrapper } from 'styled/common';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  selectedRow,
  setSelectedRow = _noop,
  modalData,
  setModalData,
  fundSources,
  fetchFundSources,
}) => {
  const { yesBusinessType, accountInfo } = useAccount();
  const navigate = useNavigate();

  const handleWeightageSubmit = async (
    data: Weightage[],
    loadingCallback: () => void,
  ) => {
    const body = {
      fundsources: data.map(({ id, weightage }) => ({
        id,
        weightage: +weightage,
      })),
    };

    Analytics.track('Update_Weightage_API_Trigger');

    const response = await updateWeightage(body);

    loadingCallback();

    if (!('error' in response)) {
      Analytics.track('Update_Weightage_API_Success');

      toast.success('Fund Source weightage updated successfully');

      setModalType(MODAL_TYPE.EMPTY);
      fetchFundSources();
    }
  };

  const handleDeactivate = async () => {
    const response = await deactivate(selectedRow!.fundSourceId!);
    if (!('error' in response)) {
      window.location.reload();
    }
  };

  const handleClose = () => {
    if (_get(modalData, 'lead')) {
      navigate(
        `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${PATH_BY_SUBMENU[SUBMENU.LEADS]}`,
      );
      return;
    }

    setModalType(MODAL_TYPE.EMPTY);
    setModalData(undefined);
    setSelectedRow();

    if (process.env.NODE_ENV !== 'test') {
      fetchFundSources();
    }
  };

  switch (modalType) {
    case MODAL_TYPE.UPDATE_WEIGHTAGE:
      return (
        <UpdateWeightageModal
          onSubmit={handleWeightageSubmit}
          onClose={handleClose}
        />
      );

    case MODAL_TYPE.ADD_BALANCE:
      return (
        <AddBalanceModal
          paymentInstrumentId={selectedRow!.paymentInstrumentId}
          onClose={handleClose}
        />
      );

    case MODAL_TYPE.UPDATE_DETAILS:
      return (
        <UpdateDetailsModal
          selectedRow={selectedRow}
          onResponse={() => window.location.reload()}
          onClose={handleClose}
        />
      );

    case MODAL_TYPE.DEACTIVATE:
      return (
        <ConfirmModal
          danger
          title="Deactivate Fund Source"
          confirmText="Deactivate"
          confirmBtnEvent="Primary_Deactivate_Fundsource"
          closeBtnEvent="Secondary_Deactivate_Fundsource"
          closeCrossEvent="Close_Icon_Deactivate_Fundsource"
          onConfirm={handleDeactivate}
          onClose={handleClose}
        >
          <Text variant="p14">
            You will not be able to use this fund source for making payout
            transfers. Are you sure you want to deactivate fund source?
          </Text>
        </ConfirmModal>
      );

    case MODAL_TYPE.CREATE_BANK_ACCOUNT:
      return (
        <BankAccountSelfServe
          selectedRow={selectedRow}
          fundSources={fundSources}
          fetchFundSources={fetchFundSources}
          setModalType={setModalType}
          modalData={modalData}
          setModalData={setModalData}
          handleClose={handleClose}
        />
      );

    case MODAL_TYPE.CREATE_ROUTER_BANK_ACCOUNT:
      return (
        <BankAccountSelfServe
          selectedRow={selectedRow}
          fundSources={fundSources}
          fetchFundSources={fetchFundSources}
          setModalType={setModalType}
          modalData={modalData}
          setModalData={setModalData}
          handleClose={handleClose}
          isRouter
        />
      );

    case MODAL_TYPE.CREATE_AGGREGATOR:
      return (
        <PayoutAggregator
          selectedRow={selectedRow}
          fundSources={fundSources}
          fetchFundSources={fetchFundSources}
          setModalType={setModalType}
          modalData={modalData}
          setModalData={setModalData}
          handleClose={handleClose}
        />
      );

    case MODAL_TYPE.SUCCESS:
      return (
        <Drawer>
          <Drawer.AlertBody>
            <div
              style={{
                width: 600,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <Image inline src={getAlertIcon('success')} />
              <Text variant="h28" className="my-1">
                Fund Source Activated
              </Text>

              <Text variant="p14" color="bodyLight" className="mb-4">
                You can start using this fund source to make transfers directly
                using your bank account
              </Text>

              <div className="text-center">
                <Button
                  data-event-name="Primary_Button_Fundsource_Activated"
                  secondary
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </Drawer.AlertBody>
        </Drawer>
      );

    case MODAL_TYPE.AGGREGATOR_SUCCESS:
      return (
        <Drawer>
          <Drawer.AlertBody>
            <div
              style={{
                width: 600,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <Image inline src={getAlertIcon('success')} />
              <Text variant="h28" className="my-1">
                Payout Aggregator Added Successfully
              </Text>

              <Text variant="p14" color="bodyLight" className="mb-4">
                You can now go ahead and configure the transfer routing
                behaviour under “Configurations” section.
              </Text>

              <div className="text-center">
                <Button
                  data-event-name="Primary_Button_Aggregator_Activated"
                  secondary
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Link
                  to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                    PATH_BY_SUBMENU[SUBMENU.CONFIGURATIONS]
                  }`}
                  onClick={handleClose}
                >
                  <Button
                    data-event-name="Primary_Button_Aggregator_Activated"
                    primary
                    className="ml-4"
                  >
                    Configure Router
                  </Button>
                </Link>
              </div>
            </div>
          </Drawer.AlertBody>
        </Drawer>
      );

    case MODAL_TYPE.APPROVE_ICIC:
      return (
        <Drawer>
          <Drawer.AlertBody>
            <div
              style={{
                width: 600,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <Image inline src={getAlertIcon('success')} />
              <Text variant="h28" className="my-1">
                Approval Request Sent To ICICI
              </Text>

              <Text variant="p14" color="bodyLight" className="mb-4">
                An approval request has been sent to your ICICI Corporate
                Banking portal. Follow the steps below to approve the request.
              </Text>

              <Space gap={3} direction="column">
                <Text variant="p14" color="bodyLight" className="text-left">
                  1. Access{' '}
                  <a
                    href={ICICI_LOGIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event-name="Link"
                  >
                    ICICI Corporate Banking
                  </a>{' '}
                  portal and login using your bank credentials.
                </Text>

                <div>
                  <Text
                    variant="p14"
                    color="bodyLight"
                    className="pb-2 text-left"
                  >
                    2. After logging in to your profile, go to{' '}
                    <b>Connected Banking</b> &#62;{' '}
                    <b>Connected Banking Approvals</b>, as shown in the image
                    below. Select the checkbox against Cashfree and click
                    APPROVE.
                  </Text>
                  <Image inline src={screenshot1Icon} />
                </div>

                <div>
                  <Text
                    variant="p14"
                    color="bodyLight"
                    className="pb-2 text-left"
                  >
                    3. Enter the one time password and click CONFIRM to connect
                    your account with Cashfree Payments.
                  </Text>
                  <Image inline src={screenshot2Icon} />
                </div>
              </Space>
              <BtnContainer textAlign="center">
                <Button
                  data-event-name="Secondary_Button_Approve_ICICI"
                  secondary
                  onClick={handleClose}
                >
                  I will do it later
                </Button>
                <Button
                  data-event-name="Primary_Button_Approve_ICICI"
                  primary
                  type="submit"
                  className="ml-4"
                  onClick={() => window.open(ICICI_LOGIN, '_blank')}
                >
                  Access ICICI Portal
                </Button>
              </BtnContainer>
            </div>
          </Drawer.AlertBody>
        </Drawer>
      );

    case MODAL_TYPE.APPROVE_YESB: {
      let body;

      const businessUrl = _get(YES_BUSINESS_URL_BY_TYPE, [
        yesBusinessType.businessType,
      ]);

      switch (yesBusinessType.businessType) {
        case YES_BUSINESS_TYPE.PROPRIETORSHIP:
          body = (
            <>
              <Text variant="p14" className="py-3 text-left">
                Follow the steps below to connect your YES bank account with
                Cashfree Payments.
              </Text>

              <Space gap={2} direction="column">
                <Text variant="p14" color="bodyLight" className="text-left">
                  1. Log in to your{' '}
                  <a
                    href="https://yesconnect.yesbank.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event-name="Link"
                  >
                    YES bank account
                  </a>{' '}
                  and follow the steps shown in the video{' '}
                  <a
                    href="https://www.youtube.com/watch?v=-Q8MJCj0nuw"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event-name="Link"
                  >
                    here
                  </a>
                  .
                </Text>

                <Text variant="p14" color="bodyLight" className="text-left">
                  2. After you complete the steps in the video, go to the{' '}
                  <b>Fund Source</b> screen in the Payouts Dashboard and click{' '}
                  <b>Connect</b> to activate the fund source.
                </Text>
              </Space>
            </>
          );
          break;

        case YES_BUSINESS_TYPE.PRIVATE:
        case YES_BUSINESS_TYPE.PARTNERSHIP:
          body = (
            <>
              <Text variant="p14" className="py-3 text-left">
                We have sent your details to YES bank representatives to assist
                you in activating the fund source.
              </Text>

              <Space gap={2} direction="column">
                <Text variant="p14" color="bodyLight" className="text-left">
                  1. Download the{' '}
                  <a
                    href={businessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event-name="Link"
                  >
                    file
                  </a>{' '}
                  and fill in the details to share with the bank for faster
                  processing. They will contact you on
                  <b>{accountInfo.email}</b> or phone on{' '}
                  <b>{accountInfo.phone}</b> within 2 working days. Be sure not
                  to miss the calls/emails from them.
                </Text>

                <Text variant="p14" color="bodyLight" className="text-left">
                  2. After completing the above steps go to the{' '}
                  <b>Fund Source</b>
                  screen in the Payouts Dashboard and click <b>Connect</b> to
                  activate the fund source.
                </Text>
              </Space>

              <Text variant="p14" color="bodyLight" className="pt-3 text-left">
                To change the existing email ID, go to the{' '}
                <a
                  href={`${process.env.DASHBOARD_URL}/${process.env.COMMON_APP_BASE_PATH}/profile/my-information`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-name="Link"
                >
                  Profile
                </a>{' '}
                section in the dashboard and update it. Contact{' '}
                <a href="mailto:care@cashfree.com">care@cashfree.com</a> to
                update the phone number.
              </Text>
            </>
          );
          break;
      }

      const type = modalData!.type === 'positive' ? 'success' : 'warning';
      const title =
        modalData!.type === 'positive'
          ? 'Fund Source Verified & Added'
          : 'Unable To Connect To Your Yes Bank Account';

      return (
        <AlertModal
          maxWidth="600"
          type={type}
          title={title}
          confirmText="Ok, got it"
          eventNameOnConfirm={`Primary_${title}_${type}`}
          eventNameOnClose={`Secondary_${title}_${type}`}
          onConfirm={handleClose}
          onClose={handleClose}
        >
          {body}
        </AlertModal>
      );
    }

    case MODAL_TYPE.INVALID_ACCOUNT_YESB: {
      const request = JSON.stringify(
        JSON.parse(modalData!.rawBankData!.request),
        null,
        2,
      );
      const response = JSON.stringify(
        JSON.parse(modalData!.rawBankData!.response),
        null,
        2,
      );

      return (
        <AlertModal
          maxWidth="480"
          type="warning"
          title="Invalid Account Credentials"
          eventNameOnConfirm="Primary_Invalid_Account_Credentials"
          eventNameOnClose="Secondary_Invalid_Account_Credentials"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text color="bodyLight" className="text-left">
            The credentials added for the above Yes Bank Account are invalid and
            hence, we are not able to connect your account to Cashfree.
          </Text>

          <Text color="bodyLight" className="mt-2 text-left">
            But, you shouldn&apos;t worry. Please copy the Request Body and
            Response Body as below and mail it to{' '}
            <a href="mailto:connected@cashfree.com">connected@cashfree.com</a>{' '}
            with your Account Manger in loop. We shall get this sorted with the
            bank.
          </Text>

          <Space justifyContent="space-between" className="mb-1 mt-2">
            <Text variant="b12" color="bodyLight">
              Request:
            </Text>
            <Copy value={request} />
          </Space>

          <CodeWrapper>
            <pre style={{ maxHeight: '100px' }}>{request}</pre>
          </CodeWrapper>

          <Space justifyContent="space-between" className="mb-1 mt-2">
            <Text variant="b12" color="bodyLight">
              Response:
            </Text>
            <Copy value={response} />
          </Space>

          <CodeWrapper>
            <pre style={{ maxHeight: '100px' }}>{response}</pre>
          </CodeWrapper>
        </AlertModal>
      );
    }

    default:
      return null;
  }
};

const mapStateToProps = ({ fundSources }: { fundSources: any[] }) => ({
  fundSources,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchFundSources: () => dispatch(fetchFundSourcesAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withErrorBoundary(withConnect(Modals));
