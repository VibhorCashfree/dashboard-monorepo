// Constants
import { MODAL_TYPE } from './constants';

export const getApprovalMessages = (modalType: MODAL_TYPE, count: number) => ({
  title: `${modalType === MODAL_TYPE.VERIFY ? 'Verify' : 'Reject'} Cashgram${
    count > 1 ? 's' : ''
  }`,
  description: `Are you sure you want to ${
    modalType === MODAL_TYPE.VERIFY ? 'verify' : 'reject'
  } the selected cashgram${count > 1 ? 's' : ''}?`,
  success: `Cashgram${count > 1 ? 's' : ''} Verified Successfully`,
  danger: `Cashgram${count > 1 ? 's' : ''} Rejected`,
});
