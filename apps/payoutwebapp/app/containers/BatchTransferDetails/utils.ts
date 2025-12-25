import _pick from 'lodash/pick';
import _filter from 'lodash/filter';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import { STATUSES, APPROVE_STATUSES, MODAL_TYPE } from './constants';

export const getFilterMap = (
  isApproved: boolean,
  hasApprovalPreference: boolean,
) => {
  let statuses;

  if (hasApprovalPreference) {
    statuses = isApproved ? APPROVE_STATUSES : STATUSES;
  } else {
    statuses = _filter(
      STATUSES,
      (status) =>
        ![
          'PARTIALLY_APPROVED',
          'PENDING_APPROVAL',
          'MANUALLY_REJECTED',
        ].includes(status),
    );
  }

  const labelByStatus = _pick(LABEL_BY_STATUS, statuses);

  const filtersConfig = {
    'Transfer Status': {
      columns: 2,
      items: statuses,
    },
    'Transfer Acknowledgment': {
      columns: 3,
      items: ['Yes', 'No'],
    },
  };

  return {
    labelByStatus,
    filtersConfig,
  };
};

export const getApprovalMessages = (
  hasBatchPreference: boolean,
  modalType: MODAL_TYPE,
  count: number,
) => {
  if (hasBatchPreference) {
    return {
      title: `${
        modalType === MODAL_TYPE.APPROVE ? 'Approve' : 'Reject'
      } Batch Transfer File`,
      description: `Are you sure you want to ${
        modalType === MODAL_TYPE.APPROVE ? 'approve' : 'reject'
      } the below .csv file?`,
      success: 'File Approved Successfully',
      danger: 'File Rejected',
    };
  }

  return {
    title: `${
      modalType === MODAL_TYPE.APPROVE ? 'Approve' : 'Reject'
    } Transfer${count > 1 ? 's' : ''}`,
    description: `Are you sure you want to ${
      modalType === MODAL_TYPE.APPROVE ? 'approve' : 'reject'
    } the selected transfer${count > 1 ? 's' : ''}?`,
    success: `Transfer${count > 1 ? 's' : ''} Approved Successfully`,
    danger: `Transfer${count > 1 ? 's' : ''} Rejected`,
  };
};
