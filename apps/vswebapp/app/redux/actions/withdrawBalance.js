export const WITHDRAW_BALANCE = 'WITHDRAW_BALANCE';

const withdrawBalance = payload => ({
  type: WITHDRAW_BALANCE,
  payload,
});

export default withdrawBalance;
