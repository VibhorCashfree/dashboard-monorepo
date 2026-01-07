import _identity from 'lodash/identity';

export const ip = (value: string) => {
  const splits = value.split('.');

  if (splits.length !== 4 || splits.filter(_identity).length !== 4) {
    return false;
  }

  const isPrivate =
    /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/.test(
      value,
    );

  return (
    digits(splits.join('')) &&
    !(
      (splits[0] === '224' && splits[1] === '0' && splits[2] === '0') ||
      (splits[0] === '169' && splits[1] === '254') ||
      splits[0] === '127' ||
      isPrivate
    )
  );
};

export const alphaNumeric = (value: string) => /^[a-zA-Z0-9]*$/.test(value);
export const alphaNumericWithWhitespaces = (value: string) =>
  /^[a-zA-Z0-9 ]*$/.test(value);
export const alphabetsWithWhitespaces = (value: string) => /^[a-zA-Z ]*$/.test(value);
export const alphaNumericWithUnderscores = (value: string) => /^\w*$/.test(value);
export const alphaNumericWithUnderscoresAndHyphnes = (value: string) =>
  /^[A-Za-z0-9_-]*$/.test(value);
export const alphaNumericWithDotHyphen = (value: string) =>
  /^[a-zA-Z0-9/&\s.-]+$/.test(value);
export const alphaNumericWithWhitespacesUnderscoresAndHyphnes = (value: string) =>
  /^[ A-Za-z0-9_-]*$/.test(value);

export const digits = (value: string) => /^\d*$/.test(value);
export const digitsAndDecimal = (value: string) => /^-?[0-9]+(\.[0-9]+)?$/.test(value);

export const email = (value: string) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value.toLowerCase());
};

export const url = (value: string) =>
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i.test(
    value,
  );

export const accountName = (value: string) => /^[a-zA-Z0-9 &./-]*$/.test(value);

export const registrationCertificate = (value: string) =>
  /^([A-Z]|[a-z]){2}( |-)*[0-9]{1,2}(?:( |-)*([A-Z]|[a-z]))?(?:( |-)*([A-Z]|[a-z])*)?( |-)*[0-9]{4}$|^[0-9]{2}BH[0-9]{4}[A-HJ-NP-Z]{1,2}$|^([A-Z]{2}\d{2}[A-Z]{1,2}\d{4}|[A-Z]{2}\d{6,8}|[A-Z]{2}[0-9]{1,2}[0-9]{3}|[A-Z]{2}[A-Z]{1,2}\d{3}|[0-9]{1,4}[A-Z]{1,2}\d{1,4})$/.test(
    value,
  );

export const drivingLicense = (value: string) => /^[a-zA-Z0-9\-\s]+$/.test(value);
export const voterId = (value: string) =>
  /^([a-zA-Z]{3}[0-9]{7}|[A-Z]{2}\/\d{1,3}\/\d{1,4}\/\d{1,7})$/.test(value);
export const journeyName = (value: string) => /^[A-Za-z][A-Za-z0-9._-]*$/.test(value);
export const ifsc = (value: string) => /^[A-Z|a-z]{4}[0][A-Z|a-z|0-9]{6}$/.test(value);
export const cin = (value: string) =>
  /^([LlUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/.test(
    value,
  );

export const pan = (value: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
export const gstIn = (value: string) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
export const iban = (value: string) => /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,36}$/.test(value);

export const vpa = (value: string) =>
  /^[\w\.\-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$)[\w\.]+$/.test(value);

export const beneId = (value: string) => new RegExp('^[\\|\\w\\d._]+$').test(value);

export const formatDocumentInfo = (data: string[]) => {
  const formatList = data.map(doc => doc.replace(/_/g, ' ')).join(', ');
  return formatList;
};
