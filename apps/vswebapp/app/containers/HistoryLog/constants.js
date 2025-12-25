export const TYPE_MAP = {
  API_KEYS: 'api-keys',
  PUBLIC_KEYS: 'public-keys',
  IP_ADDRESSES: 'ip-addresses',
};

export const HISTORY_LOG = {
  [TYPE_MAP.API_KEYS]: {
    value: 'API Key',
    title: 'API Keys',
    columnDisplayName: 'Client ID',
  },
  [TYPE_MAP.PUBLIC_KEYS]: {
    value: 'Public Key',
    title: 'Public Keys',
    columnDisplayName: 'Public Key',
  },
  [TYPE_MAP.IP_ADDRESSES]: {
    value: 'IP Address',
    title: 'IP Addresses',
    columnDisplayName: 'IP Address',
  },
};

export const options = [{ text: 'Client ID', value: 'value' }];
