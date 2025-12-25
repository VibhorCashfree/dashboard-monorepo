import _identity from 'lodash/identity';

const ip = value => {
  const splits = value.split('.');

  if (splits.length !== 4 || splits.filter(_identity).length !== 4) {
    return false;
  }

  const isPrivate = /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/.test(
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

const alphaNumeric = value => /^[a-zA-Z0-9]*$/.test(value);
const alphaNumericWithWhitespaces = value => /^[a-zA-Z0-9 ]*$/.test(value);
const alphabetsWithWhitespaces = value => /^[a-zA-Z ]*$/.test(value);
const alphaNumericWithUnderscores = value => /^\w*$/.test(value);
const alphaNumericWithUnderscoresAndHyphnes = value =>
  /^[A-Za-z0-9_-]*$/.test(value);
const alphaNumericWithDotHyphen = value => /^[a-zA-Z0-9/&\s.-]+$/.test(value);

const digits = value => /^\d*$/.test(value);

const email = value => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value.toLowerCase());
};

const url = value =>
  /^https:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i.test(
    value,
  );

const accountName = value => /^[a-zA-Z &./-]*$/.test(value);

const registrationCertificate = value =>
  /^([A-Z]|[a-z]){2}( |-)*[0-9]{1,2}(?:( |-)*([A-Z]|[a-z]))?(?:( |-)*([A-Z]|[a-z])*)?( |-)*[0-9]{4}$|^[0-9]{2}BH[0-9]{4}[A-HJ-NP-Z]{1,2}$|^([A-Z]{2}\d{2}[A-Z]{1,2}\d{4}|[A-Z]{2}\d{6,8}|[A-Z]{2}[0-9]{1,2}[0-9]{3}|[A-Z]{2}[A-Z]{1,2}\d{3}|[0-9]{1,4}[A-Z]{1,2}\d{1,4})$/.test(
    value,
  );

const drivingLicense = value => /^[a-zA-Z0-9\-\s]+$/.test(value);
const voterId = value =>
  /^([a-zA-Z]{3}[0-9]{7}|[A-Z]{2}\/\d{1,3}\/\d{1,4}\/\d{1,7})$/.test(value);
const journeyName = value => /^[A-Za-z][A-Za-z0-9._-]*$/.test(value);
const ifsc = value => /^[A-Z|a-z]{4}[0][A-Z|a-z|0-9]{6}$/.test(value);
const vpa = value =>
  /^[\w\.\-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$)[\w\.]+$/.test(value);
const cin = value =>
  /^([LlUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/.test(
    value,
  );

const formatDocumentInfo = data => {
  const formatList = data.map(doc => doc.replace(/_/g, ' ')).join(', ');

  return formatList;
};

const Regex = {
  ip,
  alphaNumeric,
  alphaNumericWithWhitespaces,
  alphabetsWithWhitespaces,
  alphaNumericWithUnderscores,
  alphaNumericWithUnderscoresAndHyphnes,
  alphaNumericWithDotHyphen,
  digits,
  email,
  url,
  accountName,
  registrationCertificate,
  drivingLicense,
  voterId,
  journeyName,
  ifsc,
  vpa,
  cin,
  formatDocumentInfo,
};

export default Regex;
