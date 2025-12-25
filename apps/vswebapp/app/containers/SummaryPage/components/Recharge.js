import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {
  Space,
  Text,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  Cross,
  RadioButton,
  Image,
  Conditional,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';

// Actions
import fetchRechargeAccountsAction from 'redux/actions/fetchRechargeAccounts';

// Constants
import { BANK_CODES } from 'constants/banks';

// Components
import Loader from 'components/Loader';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import Banks from 'utils/banks';

// Services
import { getRegisteredBankAccounts } from 'services/accounts';

// Styled
import { Divider } from 'styled/common';
import {
  StyledLabel,
  StyledFooter,
  StyledAccount,
  StyledAlert,
} from '../styled';

const Recharge = ({ onClose, rechargeAccounts, fetchRechargeAccounts }) => {
  const { accountInfo, fundSourceDetails } = useContext(AccountContext);

  const [isNext, setIsNext] = useState(false);
  const [selected, setSelected] = useState('registered_0');
  const [regAcc, setRegAccount] = useState();

  useEffect(() => {
    fetchRechargeAccounts(_get(fundSourceDetails, 'fundSourceId'));
    (async function fetchData() {
      const response = await getRegisteredBankAccounts();

      if (!response.error) {
        const data = [
          {
            name: accountInfo.name,
            bankAccount: accountInfo.bankAccount,
            ifsc: accountInfo.ifsc,
            bankName: accountInfo.bankname,
          },
        ].concat(response.entries);

        setRegAccount(_uniqBy(data, 'bankAccount'));
      } else {
        setRegAccount([]);
      }
    })();
  }, []);

  if (!regAcc) {
    return <Loader />;
  }

  return (
    <Modal open style={{ width: '376px' }}>
      <ModalHeader>
        <Space gap={2} alignItems="center">
          <Text variant="h20">Recharge</Text>
          <StyledLabel>
            <Text variant="b12" color="white">
              Step {isNext ? 2 : 1} /2
            </Text>
          </StyledLabel>
        </Space>
        <Cross
          onClick={onClose}
          data-event-name="Form_UploadBatchForm_Icon_Close"
        />
      </ModalHeader>
      <ModalContent className="px-3 pt-2">
        <Conditional if={!isNext}>
          <Text variant="b14" className="mb-3">
            1. Select a bank account registered with Cashfree Payments to
            recharge the wallet.
          </Text>
          {regAcc.map((acc, key) => (
            <StyledAccount
              direction="column"
              gap={1.2}
              selected={`registered_${key}` === selected}
              className="mb-2 pointer"
              onClick={() => setSelected(`registered_${key}`)}
            >
              <Space gap={1.2} alignItems="center">
                <RadioButton checked={`registered_${key}` === selected} />
                <Image width="85" src={Banks.getIcon(acc.ifsc)} inline />
              </Space>
              <Divider contain className="m-0" />
              <Space justifyContent="space-between">
                <Text color="bodyLight" variant="p14">
                  A/c Holder’s Name
                </Text>
                <Text variant="b14">{acc.name}</Text>
              </Space>
              <Space justifyContent="space-between">
                <Text color="bodyLight" variant="p14">
                  A/c Number
                </Text>
                <Text variant="b14">{acc.bankAccount}</Text>
              </Space>
              <Space justifyContent="space-between">
                <Text color="bodyLight" variant="p14">
                  IFSC
                </Text>
                <Text variant="b14">{acc.ifsc}</Text>
              </Space>
            </StyledAccount>
          ))}

          <StyledAccount
            direction="column"
            gap={1.2}
            selected={'notRegistered' === selected}
            onClick={() => setSelected('notRegistered')}
            className="pointer"
          >
            <Space gap={1.2} alignItems="center">
              <RadioButton checked={'notRegistered' === selected} />
              <Text variant="b14" color="bodyLight">
                Recharge from a bank account that is not registered with
                Cashfree Payments.
              </Text>
            </Space>
          </StyledAccount>
        </Conditional>

        <Conditional if={isNext}>
          <Text variant="b14" className="mb-3">
            2. To recharge the wallet, transfer funds via RTGS/NEFT/IMPS to
            either of the accounts below.{' '}
          </Text>

          <Space direction="column" gap={2}>
            {rechargeAccounts.map(acc => {
              const code = Banks.getCode(acc.ifsc);

              const idfcCheck =
                code === BANK_CODES.IDFB &&
                acc.accountNumber.startsWith('909110');

              const axisCheck = code === BANK_CODES.UTIB;

              const newTag = idfcCheck || axisCheck;

              if (!newTag) {
                return;
              }

              return (
                <StyledAccount direction="column" gap={1.2} static>
                  <Space justifyContent="space-between" alignItems="center">
                    <Text color="bodyLight" variant="p14">
                      Bank Name
                    </Text>
                    <Image width="85" src={Banks.getIcon(acc.ifsc)} inline />
                  </Space>
                  <Space justifyContent="space-between">
                    <Text color="bodyLight" variant="p14">
                      A/c Holder’s Name
                    </Text>
                    <Text variant="b14">Cashfree</Text>
                  </Space>
                  <Space justifyContent="space-between">
                    <Text color="bodyLight" variant="p14">
                      A/c Number
                    </Text>
                    <Text variant="b14">{acc.accountNumber}</Text>
                  </Space>
                  <Space justifyContent="space-between">
                    <Text color="bodyLight" variant="p14">
                      IFSC
                    </Text>
                    <Text variant="b14">{acc.ifsc}</Text>
                  </Space>
                </StyledAccount>
              );
            })}
          </Space>

          <Conditional if={'notRegistered' === selected}>
            <StyledAlert className="mt-2">
              <Text color="warning" variant="p14">
                When you recharge from an unregistered bank account, ensure the
                name matches with the name registered with Cashfree Payments.
              </Text>
            </StyledAlert>
          </Conditional>
        </Conditional>
      </ModalContent>

      <StyledFooter>
        <Space
          justifyContent="space-between"
          textAlign="center"
          className="p-3"
          fullWidth
        >
          <div>
            <Conditional if={isNext}>
              <Button secondary onClick={() => setIsNext(false)}>
                Previous
              </Button>
            </Conditional>
          </div>

          <div>
            {isNext ? (
              <Button primary onClick={onClose}>
                Okay, Got It
              </Button>
            ) : (
              <Button primary onClick={() => setIsNext(true)}>
                Next
              </Button>
            )}
          </div>
        </Space>
      </StyledFooter>
    </Modal>
  );
};

const mapStateToProps = ({ rechargeAccounts }) => ({
  rechargeAccounts,
});

const mapDispatchToProps = dispatch => ({
  fetchRechargeAccounts: id => dispatch(fetchRechargeAccountsAction(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(Recharge);
