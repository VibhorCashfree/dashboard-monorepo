import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Label,
  Form,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Services
import { selfWithdrawals } from 'services/accounts';

// Utils
import { amountValidation } from 'utils/formValidation';
import { formatAmount } from 'utils/common';
import isFormValid from 'utils/isFormValid';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';

// Styled
import { BtnContainer } from 'styled/common';

export const SelfWithdrawalModal = ({ onClose, onResponse, balance }) => {
  const { accountInfo, fundSourceDetails } = useContext(AccountContext);
  const [formObj, setFormObj] = useState({
    paymentInstrumentId: _get(fundSourceDetails, 'paymentInstrumentId', ''),
  });
  const [errorObj, setErrorObj] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await selfWithdrawals(formObj);

    if (!response.error) {
      onResponse(response, formObj.amount);
    } else {
      onClose();
    }
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'amount':
        if (Number(value) > Number(balance)) {
          error = 'Amount can not exceed available balance.';
        } else {
          error = amountValidation(value);
        }
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS);

  return (
    <Modal $maxWidth="400" open>
      <ModalHeader>
        <div>
          <Text variant="h20" className="mb-1">
            Self Withdrawal
          </Text>
          <Text as="span" color="bodyLight">
            {accountInfo.name}
          </Text>
          <Text as="span" variant="h16" className="pl-1">
            {formatAmount(balance)}
          </Text>
        </div>
        <Cross
          onClick={onClose}
          data-event-name="Form_SelfWithdrawl_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text variant="b12" color="bodyLight" className="mb-2">
            Amount will be transferred to your bank a/c{' '}
            <strong>{accountInfo.bankAccount}</strong>.
          </Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field
                control={AmountLabeledInput}
                fluid
                width={12}
                name="amount"
                label="Amount"
                type="number"
                step=".01"
                placeholder="Amount"
                error={errorObj.amount}
                value={formObj.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.TextArea
              name="remarks"
              label={
                <Text color="bodyLight" className="mb-1 mt-2">
                  Remarks <Label size="mini">Optional</Label>
                </Text>
              }
              maxLength="200"
              value={formObj.remarks}
              onChange={handleChange}
              className="mb-0"
            />
            <Text variant="b12" color="bodyLight" className="mt-1 mb-4">
              Maximum 200 characters allowed
            </Text>
            <Text variant="b12" color="bodyLight" className="mb-2">
              * It may take from 30 mins to few hours for amount to be credited
              depending on banking hours.
            </Text>
            <Text variant="b12" color="bodyLight" className="mb-2">
              * You can withdraw Cashfree balance to your bank account maximum
              of three times per day.
            </Text>

            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_SelfWithdrawl_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                data-event-name="Form_SelfWithdrawl_PrimaryButton"
              >
                Withdraw
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

SelfWithdrawalModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onResponse: PropTypes.func,
  balance: PropTypes.string,
};

const mapStateToProps = ({ availableBalance }) => ({
  balance: availableBalance.availableBalance,
});

const withConnect = connect(mapStateToProps);

export default withConnect(SelfWithdrawalModal);
