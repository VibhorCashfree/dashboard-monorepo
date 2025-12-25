import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  toast,
  Paper,
  Button,
  Space,
  Text,
  Image,
  Loader,
  CustomAccordion,
} from '@cashfree-intl/coherent';
import moment from 'moment';

// Images
import canaraImg from 'images/banks/canara.svg';
import auImg from 'images/banks/au.svg';

// Components
import Alert from 'components/Alert';
import StatusLabel from 'components/StatusLabel';
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Icon from 'components/Icon';
import DropdownButton from 'components/DropdownButton';
import Modals from './components/Modals';

// Actions
import fetchFundSourcesAction from 'redux/actions/fetchFundSources';

// Utils
import getQuery from 'utils/getQuery';
import { emitUserValidation } from 'utils/common';

// Constants
import { FORMATS } from 'constants/date';
import { ALERT_BY_STATUS, LABEL_BY_STATUS, STATUS } from 'constants/status';
import {
  CONNECTED_BANK,
  labelByBank,
} from 'containers/BankAccountSelfServe/constants';
import { MENU, LABEL_BY_MENU, PATH_BY_MENU } from 'constants/menuItems';
import { addOptions, MODAL_TYPE } from './constants';

// Services
import {
  getRefreshAccessTokenForCanara,
  getFundSourceStatusAtBank,
  reactivateFundSource,
  processBankCallBack,
} from 'services/fundSources';

// Styled
import { Divider } from 'styled/common';

// Types
import type { ERPProps } from './types';

const ERP: React.FC<ERPProps> = ({ fundSources, fetchFundSources }) => {
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [selectedBank, setSelectedBank] = useState<
    CONNECTED_BANK.CANARA_CONNECTED | CONNECTED_BANK.AU_CONNECTED | undefined
  >();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const query = getQuery();

  const body = {
    code: query.get('code'),
    scope: query.get('scope'),
    state: query.get('state'),
  };

  useEffect(() => {
    if (query.size === 0) {
      return;
    }

    navigate(`/${PATH_BY_MENU[MENU.ERP]}`, { replace: true });

    (async function fetchData() {
      const fundSourceId = Number(body.state);

      await processBankCallBack(fundSourceId, body);

      toast.success(
        'Consent initiated successfully. Please reach out to the bank for further assistance.',
      );
    })();
  }, []);

  const handleCreate = (
    value: CONNECTED_BANK.CANARA_CONNECTED | CONNECTED_BANK.AU_CONNECTED,
  ) => {
    emitUserValidation(() => {
      setSelectedBank(value);
      setModalType(MODAL_TYPE.ADD);
    });
  };

  const handleRefresh = async (fundSource: AnyObject) => {
    setLoading(true);

    if (fundSource.connBankName === CONNECTED_BANK.CANARA_CONNECTED) {
      if (fundSource.status === 'CONSENT_APPROVAL_PENDING') {
        await getFundSourceStatusAtBank(fundSource.fundSourceId);
      } else {
        await getRefreshAccessTokenForCanara(fundSource.fundSourceId);
      }
    } else if (fundSource.connBankName === CONNECTED_BANK.AU_CONNECTED) {
      await processBankCallBack(fundSource.fundSourceId, body);

      toast.success(
        'Consent initiated successfully. Please reach out to the bank for further assistance.',
      );
    }

    setLoading(false);
    fetchFundSources();
  };

  const handleReactivate = async (fundSourceId: number) => {
    setLoading(true);
    await reactivateFundSource(fundSourceId);

    toast.success('Fund source reactivated successfully.');

    setLoading(false);
    fetchFundSources();
  };

  const filteredFundSources = fundSources.filter((fundSource) =>
    [CONNECTED_BANK.CANARA_CONNECTED, CONNECTED_BANK.AU_CONNECTED].includes(
      fundSource.connBankName,
    ),
  );

  const showStartPage = filteredFundSources.length === 0;

  if (loading) {
    return <Loader active />;
  }

  return (
    <>
      <PageHeader>{LABEL_BY_MENU[MENU.ERP]}</PageHeader>
      <MetaTags title={LABEL_BY_MENU[MENU.ERP]} />
      <Text color="bodyLight" className="mb-4">
        Connect your bank to enable seamless ERP payouts
      </Text>

      {showStartPage ? (
        <>
          <Text variant="h16" className="mb-2">
            Select Your Bank
          </Text>

          <Space gap={4} className="mb-4 text-center">
            <Paper style={{ width: 326 }}>
              <Image
                inline
                className="mb-2"
                style={{ height: 50, borderRadius: 8 }}
                src={canaraImg}
              />
              <Text variant="h16" className="mb-2">
                {labelByBank[CONNECTED_BANK.CANARA_CONNECTED]}
              </Text>
              <Button
                primary
                size="small"
                onClick={() => handleCreate(CONNECTED_BANK.CANARA_CONNECTED)}
              >
                Connect
              </Button>
            </Paper>
            <Paper style={{ width: 326 }}>
              <Image
                inline
                className="mb-2"
                style={{ height: 50, borderRadius: 8 }}
                src={auImg}
              />
              <Text variant="h16" className="mb-2">
                {labelByBank[CONNECTED_BANK.AU_CONNECTED]}
              </Text>
              <Button
                primary
                size="small"
                onClick={() => handleCreate(CONNECTED_BANK.AU_CONNECTED)}
              >
                Connect
              </Button>
            </Paper>
          </Space>
        </>
      ) : (
        <div style={{ maxWidth: 676 }} className="mb-4">
          <Space
            justifyContent="space-between"
            alignItems="center"
            className="mb-3"
          >
            <Text variant="h16">Connected Bank Account</Text>
            <DropdownButton options={addOptions} onClick={handleCreate}>
              {(open: boolean) => (
                <Button
                  data-event-name="Primary_Button"
                  primary
                  size="small"
                  iconPosition="right"
                  icon={
                    <Icon
                      name={open ? 'chevron-up' : 'chevron-down'}
                      fill="white"
                      className="ml-1"
                    />
                  }
                >
                  + Add New Account
                </Button>
              )}
            </DropdownButton>
          </Space>

          <Space direction="column" gap={3}>
            {filteredFundSources.map((fundSource) => (
              <div key={fundSource.fundSourceId}>
                <Paper>
                  <Space justifyContent="space-between" className="mb-2">
                    <div>
                      <Text variant="h16">
                        {labelByBank[fundSource.connBankName as CONNECTED_BANK]}
                      </Text>
                      <Text color="bodyLight">
                        {moment(fundSource.addedOn).format(FORMATS.TIMESTAMP)}
                      </Text>
                    </div>
                    <div>
                      <StatusLabel filled>{fundSource.status}</StatusLabel>
                    </div>
                  </Space>

                  <Space gap={2}>
                    <div>
                      <Text strong>Account Number</Text>
                      <Text color="bodyLight">{fundSource.bankAccount}</Text>
                    </div>
                    <div>
                      <Text strong>IFSC Code</Text>
                      <Text color="bodyLight">{fundSource.ifsc}</Text>
                    </div>
                    <div>
                      <Text strong>Account Holder Name</Text>
                      <Text color="bodyLight">
                        {fundSource.accountHolderName}
                      </Text>
                    </div>
                  </Space>

                  {![
                    STATUS.ACTIVE,
                    STATUS.EXPIRED,
                    STATUS.DEACTIVATED,
                  ].includes(fundSource.status) && (
                    <>
                      <Divider />
                      <Alert
                        type={ALERT_BY_STATUS[fundSource.status as STATUS]}
                        bordered
                        rounded
                      >
                        <Alert.Content size="md">
                          <Text variant="h16">
                            Verification is{' '}
                            {LABEL_BY_STATUS[fundSource.status as STATUS]}
                          </Text>
                          <Text color="bodyLight">
                            Your account is being verified by{' '}
                            {
                              labelByBank[
                                fundSource.connBankName as CONNECTED_BANK
                              ]
                            }
                            , might take a few hours
                          </Text>
                        </Alert.Content>
                        <Alert.Actions>
                          <Button
                            primary
                            size="small"
                            loading={loading}
                            onClick={() => handleRefresh(fundSource)}
                          >
                            Refresh
                          </Button>
                        </Alert.Actions>
                      </Alert>
                    </>
                  )}

                  {/* {[STATUS.EXPIRED, STATUS.DEACTIVATED].includes(
                    fundSource.status,
                  ) && ( */}
                  <>
                    <Divider />
                    <Alert type="info" bordered rounded>
                      <Alert.Content size="md">
                        <Text variant="h16">Connection Issues?</Text>
                        <Text color="bodyLight">
                          Restart bank connection to resume payout operations.
                        </Text>
                      </Alert.Content>
                      <Alert.Actions>
                        <Button
                          secondary
                          size="small"
                          loading={loading}
                          onClick={() =>
                            handleReactivate(fundSource.fundSourceId)
                          }
                        >
                          Reactivate
                        </Button>
                      </Alert.Actions>
                    </Alert>
                  </>
                  {/* )} */}
                </Paper>
                <Text color="bodyLight" className="mt-1">
                  If there are any issues with payouts{' '}
                  <a
                    href={`./${PATH_BY_MENU[MENU.ERP]}`}
                    rel="noopener noreferrer"
                  >
                    refresh now
                  </a>
                </Text>
              </div>
            ))}
          </Space>
        </div>
      )}

      <CustomAccordion
        title={
          <Text variant="h16" color="primary">
            Frequently asked questions
          </Text>
        }
        contents={[
          {
            index: 1,
            title: 'When can I start using the plugin for payouts?',
            content: (
              <Text>
                You can use the plugin only after the Fund Source (FS) is
                active. This typically happens right after both Maker and
                Checker approve the consent.
              </Text>
            ),
          },
          {
            index: 2,
            title:
              'What should I do if the Fund Source status remains pending after consent approval in Canara bank?',
            content: (
              <Text>
                If the FS status remains pending, please contact Canara Bank
                support directly to ensure the consent has been properly
                processed. The Tally plugin will not function until the FS is
                active.
              </Text>
            ),
          },
          {
            index: 3,
            title: 'I clicked the URL but nothing happened. What should I do?',
            content: (
              <Text>
                Ensure pop-ups are allowed in your browser. If the issue
                persists, try using a different browser or contact
                <a href="mailto:care@cashfree.com">care@cashfree.com</a>
              </Text>
            ),
          },
          {
            index: 4,
            title:
              'What do I need to approve consent on the Canara Bank portal?',
            content: (
              <Text>
                To approve consent on the Canara Bank portal, you&apos;ll need:
                <br />
                ✅ A valid Canara Bank Netbanking login
                <br />✅ Access as both Maker and Checker (two separate
                roles/logins) <br />✅ Ability to receive OTP on the
                Checker&apos;s registered mobile number
              </Text>
            ),
          },
          {
            index: 5,
            title: 'Which banks are supported for payouts?',
            content: (
              <Text>
                Currently, the Consent Approval and token generation process is
                only required for Canara Bank and AU bank. Cashfree supports all
                major private and public banks for payouts. Please write to
                <a href="mailto:care@cashfree.com">care@cashfree.com</a> for
                using other banks for payouts
              </Text>
            ),
          },
        ]}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          selectedBank={selectedBank}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchFundSources: () => dispatch(fetchFundSourcesAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(ERP);
