import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Text, Form, Paper, Space, Button } from '@cashfree-intl/coherent';
import _find from 'lodash/find';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import TnCModal from 'components/TnCModal';

// Services
import { getBalance, selectInvoicingModel } from 'services/fundSources';

// Utils
import { formatAmount } from 'utils/common';
import { requiredValidation } from 'utils/formValidation';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Constants
import {
  SUBMENU,
  PATH_BY_SUBMENU,
  PATH_BY_MENU,
  MENU,
} from 'constants/menuItems';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { ACTION_TYPE } from 'components/FormWizard/constants';
import {
  INVOICING_TYPE,
  MODAL_TYPE,
} from 'containers/AllFundSources/constants';

// Styled
import { StyledRadioButton } from '../styled';

// Types
import type { MakePaymentProps } from '../types';

const MakePayment: React.FC<MakePaymentProps> = ({
  fundSources,
  fundSource,
  actionType,
  setActionType,
  formObj,
  setFormObj,
  setErrorObj,
  setModalType,
}) => {
  const { preferences } = useAccount();

  const [balance, setBalance] = useState<{ availableBalance?: string }>({});
  const [open, setOpen] = useState(false);

  const cashfreeWallet = _find(fundSources, {
    fsDisplayType: FS_DISPLAY_TYPE.CASHFREE_WALLET,
  });

  const isDeactivated = _get(cashfreeWallet, 'status', '') !== 'ACTIVE';

  const setupFee = Number(fundSource.preferences.FUND_SOURCE_SETUP_FEE);
  const setupFeeWithTax: number = 1.18 * setupFee;

  useEffect(() => {
    (async function fetchBalance() {
      if (!cashfreeWallet) {
        return;
      }

      const response = await getBalance(cashfreeWallet.paymentInstrumentId);

      if (!('error' in response)) {
        setBalance(response);

        if (setupFeeWithTax > 0) {
          if (
            setupFeeWithTax > Number(response.availableBalance) ||
            isDeactivated
          ) {
            setTimeout(() => {
              setErrorObj((prev) => ({ ...prev, invalid: true }));
            }, 0);
          }
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async function handleActionType() {
      switch (actionType) {
        case ACTION_TYPE.SUBMIT:
          await handleSubmit();
          setActionType(ACTION_TYPE.EMPTY);
          break;
      }
    })();
  }, [actionType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'preference':
        error = requiredValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const selectModel = async () => {
    const response = await selectInvoicingModel(
      fundSource.fundSourceId,
      formObj,
    );

    if (!('error' in response)) {
      setModalType(MODAL_TYPE.SUCCESS);
    }
  };

  const handleSubmit = async () => {
    switch (formObj.preference) {
      case INVOICING_TYPE.BANK_ACCOUNT:
        setOpen(true);
        break;

      default:
        selectModel();
        break;
    }
  };

  const handleConfirm = async () => {
    setOpen(false);
    selectModel();
  };

  const deactivatedCashfreeWalletLabel = (
    <label>
      <Text color="bodyLight" className="mb-1">
        From Cashfree Wallet
      </Text>
      <Text variant="b12" color="danger" className="mb-1">
        Wallet is disabled for your account.
      </Text>
      <Text variant="b12" color="danger" className="mb-1">
        Send an e-mail to{' '}
        <a href="mailto:care@cashfree.com">care@cashfree.com</a> from your
        registered email address (or mention your registered email address in
        the mail), and cc your Account Manager.
      </Text>
    </label>
  );

  let label;
  let flag;

  switch (true) {
    case isDeactivated:
      label = deactivatedCashfreeWalletLabel;
      flag = true;
      break;

    case setupFeeWithTax < Number(balance.availableBalance):
      label = (
        <label>
          <Text color="bodyLight" className="mb-1">
            From Cashfree Wallet
          </Text>
          <Text variant="b12" color="bodyLight" className="mb-1">
            Current Bal: {formatAmount(balance.availableBalance)}
          </Text>
        </label>
      );
      flag = true;
      break;

    default:
      label = (
        <label>
          <Text color="bodyLight" className="mb-1">
            From Cashfree Wallet
          </Text>
          <Text variant="b12" color="danger" className="mb-1">
            Current Bal: {formatAmount(balance.availableBalance)}
          </Text>
          <Text variant="b12" color="danger" className="mb-2">
            Insufficient funds. Recharge wallet to enable fund source.
          </Text>

          <Button secondary data-event-name="Secondary_Button_Make_Payment">
            <Link
              // secondary
              to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                cashfreeWallet!.fundSourceId
              }/details/${PATH_BY_SUBMENU[SUBMENU.OVERVIEW]}`}
              target="_blank"
              rel="noopener noreferrer"
              data-event-name="Link"
              className="link"
            >
              Recharge A/c Details
            </Link>
          </Button>
        </label>
      );
      flag = false;
      break;
  }

  return (
    <>
      <Text variant="h28" className="mb-1">
        Setup Preference & Make Payment
      </Text>
      <Text className="mt-1 mb-3" color="bodyLight">
        You will be able to start making payouts using {fundSource.displayName}{' '}
        as soon as you complete the payment.
      </Text>

      <Paper className="mb-2" style={{ width: 616 }}>
        <Space className="mb-2" justifyContent="space-between">
          <Text variant="h16">Pay One-time Setup Fee</Text>
          <div>
            <Text color="success">{formatAmount(setupFee)}</Text>
            {setupFeeWithTax > 0 && (
              <Text variant="b12" color="bodyLight">
                (+18% tax)
              </Text>
            )}
          </div>
        </Space>

        {setupFeeWithTax > 0 && (
          <StyledRadioButton
            className="mb-1"
            name="preference"
            label={label}
            checked
            onChange={handleChange}
          />
        )}
      </Paper>

      <Paper style={{ width: 616 }}>
        <Text variant="h16" className="mb-1">
          Service Charges For transfers through {fundSource.displayName} should
          be withdrawn
        </Text>
        <Text variant="b12" color="bodyLight" className="mb-3">
          You can request your account manager to update this preference later.
        </Text>

        <Form>
          <StyledRadioButton
            className="mb-1"
            name="preference"
            label={
              flag ? (
                label
              ) : (
                <label>
                  <Text color="bodyLight">From Cashfree Wallet</Text>
                </label>
              )
            }
            value={INVOICING_TYPE.WALLET}
            checked={formObj.preference === INVOICING_TYPE.WALLET}
            disabled={isDeactivated || preferences.isPostpaid}
            onChange={handleChange}
          />

          <StyledRadioButton
            className="mb-1"
            name="preference"
            label={
              <label>
                <Text color="bodyLight" className="mb-1">
                  From Bank Account ({fundSource.displayName})
                </Text>
                <Text variant="b12" color="bodyLight">
                  Service charge will be deducted every 7 days.
                </Text>
              </label>
            }
            value={INVOICING_TYPE.BANK_ACCOUNT}
            checked={formObj.preference === INVOICING_TYPE.BANK_ACCOUNT}
            onChange={handleChange}
          />
        </Form>
      </Paper>

      {formObj.preference === INVOICING_TYPE.BANK_ACCOUNT && open && (
        <TnCModal onConfirm={handleConfirm} />
      )}
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(MakePayment));
