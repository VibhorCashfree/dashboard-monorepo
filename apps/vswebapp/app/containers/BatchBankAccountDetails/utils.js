import _pick from 'lodash/pick';
import _filter from 'lodash/filter';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import {
  allTableHeadings,
  STATUSES,
  APPROVE_STATUSES,
  MODAL_TYPES,
  COLUMN_ID,
} from './constants';

export const getTableHeadings = status => {
  if (status === 'PROCESSED') {
    return COLUMN_ID.filter(heading => heading.accessorKey !== 'phone');
  }

  return COLUMN_ID.filter(
    heading =>
      !['processedOn', 'verificationId', 'nameAtBank'].includes(
        heading.accessorKey,
      ),
  );
};

export const getFilterMap = (isApproved, hasApprovalPreference) => {
  let statuses;

  if (hasApprovalPreference) {
    statuses = isApproved ? APPROVE_STATUSES : STATUSES;
  } else {
    statuses = _filter(
      STATUSES,
      status =>
        ![
          'PARTIALLY_APPROVED',
          'APPROVAL_PENDING',
          'MANUALLY_REJECTED',
        ].includes(status),
    );
  }

  const labelByStatus = _pick(LABEL_BY_STATUS, statuses);

  const filtersConfig = {
    Status: {
      columns: 2,
      items: Object.keys(labelByStatus),
    },
  };

  return {
    labelByStatus,
    filtersConfig,
  };
};

export const getApprovalMessages = modalType => ({
  title: `${
    modalType === MODAL_TYPES.APPROVE ? 'Approve' : 'Reject'
  } Batch BAV File`,
  description: `Are you sure you want to ${
    modalType === MODAL_TYPES.APPROVE ? 'approve' : 'reject'
  } the below .csv file?`,
  success: 'File Approved Successfully',
  danger: 'File Rejected',
});
