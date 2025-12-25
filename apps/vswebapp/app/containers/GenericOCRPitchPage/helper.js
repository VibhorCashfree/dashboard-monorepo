import _isNull from 'lodash/isNull';

export const getFraudCheckValues = value => {
  const isNull = _isNull(value);

  if (isNull) {
    return '–';
  }

  return value ? 'Yes' : 'No';
};
