// Constants
import { MODAL_TYPE } from './constants';

export const getApprovalMessages = (modalType: MODAL_TYPE, count: number) => ({
  title: `${modalType === MODAL_TYPE.VERIFY ? 'Approve' : 'Reject'} Transfer${
    count > 1 ? 's' : ''
  }`,
  description: `Are you sure you want to ${
    modalType === MODAL_TYPE.VERIFY ? 'approve' : 'reject'
  } the selected transfer${count > 1 ? 's' : ''}?`,
  success: `Transfer${count > 1 ? 's' : ''} Approved Successfully`,
  danger: `Transfer${count > 1 ? 's' : ''} Rejected`,
});
