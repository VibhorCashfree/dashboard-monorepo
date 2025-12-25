export const checkList = [
  'Max no. of records: 10000',
  'Max file size: 5MB',
  'File type: .csv, .xls',
];

export const DATE_OPTIONS = [
  { key: 1, text: '3 Days', addToCurrentDate: 3 },
  { key: 2, text: '7 Days', addToCurrentDate: 7 },
  { key: 3, text: '2 Weeks', addToCurrentDate: 14 },
  { key: 4, text: '30 Days', addToCurrentDate: 30 },
];

export const CHANNELS = [
  {
    key: 'email',
    text: 'Email',
  },
  {
    key: 'sms',
    text: 'SMS',
  },
  {
    key: 'whatsapp',
    text: 'WhatsApp',
  },
];

export const SEND_JOURNEY_INITIAL_FORM_STATE = {
  journeyName: null,
  journeyId: null,
  dateOptions: '',
  channels: [],
  file: '',
};
