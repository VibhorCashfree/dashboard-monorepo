export const options = [
  {
    text: 'IP Whitelist',
    value: 'IP Whitelist',
  },
  {
    text: 'Public Key',
    value: 'Public Key',
  },
];

export enum MODAL_TYPE {
  ADD = 'ADD',
  SWITCH = 'SWITCH',
  GENERATE = 'GENERATE',
  DELETE_IP = 'DELETE_IP',
  DELETE_PUBLIC_KEY = 'DELETE_PUBLIC_KEY',

  EMPTY = '',
}

export const MAX_IP_COUNT = 25;
