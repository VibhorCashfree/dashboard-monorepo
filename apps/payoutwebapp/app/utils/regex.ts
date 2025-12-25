import _identity from 'lodash/identity';

const ip = (value: string) => {
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

const alphaNumeric = (value: string) => /^[a-zA-Z0-9]*$/.test(value);
const alphaNumericWithWhitespaces = (value: string) =>
  /^[a-zA-Z0-9 ]*$/.test(value);
const alphabetsWithWhitespaces = (value: string) => /^[a-zA-Z ]*$/.test(value);
const alphaNumericWithUnderscores = (value: string) => /^\w*$/.test(value);
const alphaNumericWithUnderscoresAndHyphnes = (value: string) =>
  /^[A-Za-z0-9_-]*$/.test(value);

const alphaNumericWithWhitespacesUnderscoresAndHyphnes = (value: string) =>
  /^[ A-Za-z0-9_-]*$/.test(value);

const digits = (value: string) => /^\d*$/.test(value);

const digitsAndDecimal = (value: string) => /^-?[0-9]+(\.[0-9]+)?$/.test(value);

const email = (value: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.toLowerCase());

const url = (value: string) =>
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i.test(
    value,
  );

const accountName = (value: string) => /^[a-zA-Z0-9 &./-]*$/.test(value);
const pan = (value: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
const gstIn = (value: string) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
const iban = (value: string) => /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,36}$/.test(value);

const vpa = (value: string) =>
  /^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$/.test(value);

const beneId = (value: string) => new RegExp('^[\\|\\w\\d._]+$').test(value);

const Regex = {
  ip,
  alphaNumeric,
  alphaNumericWithWhitespaces,
  alphabetsWithWhitespaces,
  alphaNumericWithUnderscores,
  alphaNumericWithUnderscoresAndHyphnes,
  alphaNumericWithWhitespacesUnderscoresAndHyphnes,
  digits,
  email,
  url,
  accountName,
  pan,
  gstIn,
  iban,
  vpa,
  beneId,
  digitsAndDecimal,
};

export default Regex;
