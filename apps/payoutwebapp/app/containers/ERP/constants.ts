// Constants
import {
  CONNECTED_BANK,
  labelByBank,
} from 'containers/BankAccountSelfServe/constants';

export const REQUIRED_FIELDS = ['ifsc', 'accountHolderName', 'bankAccount'];

export enum MODAL_TYPE {
  ADD = 'ADD',
  EMPTY = 'EMPTY',
}

export const addOptions = [
  {
    text: labelByBank[CONNECTED_BANK.CANARA_CONNECTED],
    value: CONNECTED_BANK.CANARA_CONNECTED,
  },
  {
    text: labelByBank[CONNECTED_BANK.AU_CONNECTED],
    value: CONNECTED_BANK.AU_CONNECTED,
  },
];
