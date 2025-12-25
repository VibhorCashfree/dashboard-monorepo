import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AlertModal } from '@cashfree-intl/coherent';

// Actions
import withdrawBalanceAction from 'redux/actions/withdrawBalance';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import SelfWithdrawalModal from './SelfWithdrawalModal';

export const Modals = ({
  modalType,
  setModalType,
  data,
  setData,
  withdrawBalance,
}) => {
  const handleResponse = (data, amount) => {
    setData(() => ({
      amount,
      addedOn: data.addedOn,
      utr: data.utr,
      status: data.withdrawalStatus,
    }));

    switch (data.withdrawalStatus) {
      case 'FAILURE':
        setModalType(MODAL_TYPES.FAILED);
        break;

      default:
        withdrawBalance(amount);
        setModalType(MODAL_TYPES.SUCCESS);
    }
  };

  switch (modalType) {
    case MODAL_TYPES.WITHDRAW:
      return (
        <SelfWithdrawalModal
          onClose={() => setModalType()}
          onResponse={handleResponse}
        />
      );

    case MODAL_TYPES.SUCCESS:
      return (
        <AlertModal
          type="success"
          title={`Withdrawal of ₹ ${data.amount} was initiated successfully`}
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title={`Withdrawal of ₹ ${data.amount} failed`}
          onClose={() => setModalType()}
        />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  withdrawBalance: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  withdrawBalance: val => dispatch(withdrawBalanceAction(val)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(Modals);
