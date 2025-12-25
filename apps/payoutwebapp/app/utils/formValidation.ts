import moment from 'moment';
import { translate } from '@cashfree-intl/coherent';
import _trim from 'lodash/trim';
import _identity from 'lodash/identity';
import _inRange from 'lodash/inRange';
import _get from 'lodash/get';

// Utils
import Region from 'utils/region';
import { getCardCompany, formatAmount } from './common';
import Regex from './regex';

// Constants
import { MAX_IP_COUNT } from 'containers/TwoFactorAuth/constants';
import {
  PHONE_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  IBAN_FORMAT_BY_COUNTRY,
} from 'constants/common';

export const emptyErrorMessage = 'This field cannot be blank.';

export const requiredValidation = (value: string) => {
  if (!value) {
    return emptyErrorMessage;
  }

  return null;
};

export const amountValidation = (value: string, limit?: string) => {
  const emptyError = requiredValidation(value);

  if (emptyError) {
    return emptyError;
  }

  if (!Regex.digitsAndDecimal(value)) {
    return `${translate('enter_valid_amount')}`;
  }

  if (Number.isNaN(Number(value))) {
    return `${translate('enter_valid_amount')}`;
  }

  if (Number(value) < 1) {
    return `${translate('amount_entered_is_less_than_1_rupee')}`;
  }

  if (value.indexOf('.') !== -1) {
    if (value.split('.')[1].length > 2) {
      return `${translate('only_two_decimals_are_allowed')}`;
    }
  }

  if (Number(value) > Number(limit)) {
    const formattedAmt = formatAmount(limit);
    return `${translate(
      'amount_should_be_equal_to_or_lesser_than_formatted_amt_write_to_care_cashfree_com_to_increase_the_limit',
      { formattedAmt: formattedAmt },
    )}`;
  }

  return null;
};

export const payoutTypeValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 20) {
    return `${translate('payout_type_can_include_a_maximum_of_20_characters')}`;
  }

  if (!Regex.alphabetsWithWhitespaces(value)) {
    return `${translate(
      'payout_type_can_include_alphabets_and_whitespaces_only',
    )}`;
  }

  return null;
};

export const nameValidation = (
  type: string,
  value: string,
  optional = false,
) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 100) {
    return `${translate('name_can_include_a_maximum_of_100_characters')}`;
  }

  if (!Regex.alphabetsWithWhitespaces(value)) {
    return `${translate('type_can_include_alphabets_and_whitespaces_only', {
      type: type,
    })}`;
  }

  return null;
};

export const panNameValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 100) {
    return `${translate('name_can_include_a_maximum_of_100_characters')}`;
  }

  if (!Regex.alphaNumericWithWhitespaces(value)) {
    return `${translate('pan_name_cannot_include_special_characters')}`;
  }

  return null;
};

export const remarksValidation = (
  type: string,
  value: string,
  maxLength = 100,
  optional = false,
) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > maxLength) {
    return `${translate('type_can_include_a_maximum_of_max_length_characters', {
      type: type,
      maxLength: maxLength,
    })}`;
  }

  if (!Regex.alphaNumericWithWhitespaces(value)) {
    return `${translate('type_cannot_include_special_characters', {
      type: type,
    })}`;
  }

  return null;
};

export const accountNameValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 100) {
    return `${translate('name_can_include_a_maximum_of_100_characters')}`;
  }

  if (!Regex.accountName(value)) {
    return `${translate(
      'account_holder_name_can_include_alphabets_numbers_and_characters_and_space_only',
    )}`;
  }

  return null;
};

export const lengthValidation = (
  type: string,
  value: string,
  maxLength = 100,
  optional = false,
) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > maxLength) {
    return `${translate('type_can_include_a_maximum_of_max_length_characters', {
      type: type,
      maxLength: maxLength,
    })}`;
  }

  if (!_trim(value).length) {
    return `${translate('invalid_type', { type: type })}`;
  }

  return null;
};

export const accountNumberValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length < 9) {
    return `${translate(
      'account_number_should_include_a_minimum_9_characters',
    )}`;
  }

  if (value.length > 25) {
    return `${translate(
      'account_number_can_include_a_maximum_of_25_characters',
    )}`;
  }

  if (!Regex.alphaNumeric(value)) {
    return `${translate(
      'bank_account_number_can_include_numbers_and_alphabets_only',
    )}`;
  }

  return null;
};

export const ifscValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length !== 11) {
    return `${translate('ifsc_should_include_11_characters')}`;
  }

  if (Number(value[4]) !== 0) {
    return `${translate('the_5th_character_of_ifsc_should_always_be_0')}`;
  }

  if (!Regex.alphaNumeric(value)) {
    return `${translate('special_characters_are_not_allowed_in_ifsc')}`;
  }

  return null;
};

export const phoneNumberValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  const region = Region.get();

  if (
    !_inRange(
      value.length,
      PHONE_MIN_LENGTH[region],
      PHONE_MAX_LENGTH[region] + 1,
    )
  ) {
    return `${translate(
      'phone_number_should_include_specified_digits_in_' + region,
    )}`;
  }

  if (!Regex.digits(value)) {
    return `${translate('only_numbers_are_allowed')}`;
  }

  return null;
};

export const transferIdValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 40) {
    return `${translate('transfer_id_can_include_a_maximum_of_40_characters')}`;
  }

  if (!Regex.alphaNumericWithUnderscoresAndHyphnes(value)) {
    return `${translate(
      'transfer_id_can_include_alphabets_numbers_hyphens_and_underscores_only',
    )}`;
  }

  return null;
};

export const referenceIdValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 40) {
    return `${translate(
      'reference_id_can_include_a_maximum_of_40_characters',
    )}`;
  }

  if (!Regex.alphaNumericWithUnderscoresAndHyphnes(value)) {
    return `${translate(
      'reference_id_can_include_alphabets_numbers_hyphens_and_underscores_only',
    )}`;
  }

  return null;
};

export const beneIdValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 50) {
    return `${translate(
      'beneficiary_id_can_include_a_maximum_of_50_characters',
    )}`;
  }

  if (!Regex.beneId(value)) {
    return `${translate('please_provide_a_valid_beneficiary_id')}`;
  }

  return null;
};

export const cashgramIdValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 36) {
    return `${translate('cashgram_id_can_include_a_maximum_of_36_characters')}`;
  }

  if (!Regex.alphaNumericWithUnderscoresAndHyphnes(value)) {
    return `${translate(
      'cashgram_id_can_include_alphabets_numbers_hyphens_and_underscores_only',
    )}`;
  }

  return null;
};

export const emailValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (!Regex.email(value.trim())) {
    return `${translate('enter_valid_email_id')}`;
  }

  return null;
};

export const vpaValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length < 3) {
    return `${translate('upi_vpa_should_include_a_minimum_of_3_characters')}`;
  }

  if (value.length > 100) {
    return `${translate('upi_vpa_can_include_a_maximum_of_100_characters')}`;
  }

  if (!Regex.vpa(value)) {
    return `${translate('invalid_upi_vpa')}`;
  }

  return null;
};

export const cardNumberValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length < 12) {
    return `${translate('card_number_should_include_a_minimum_12_digits')}`;
  }

  if (!getCardCompany(value)) {
    return `${translate('invalid_card_number')}`;
  }

  return null;
};

export const expiryValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (!value.includes('/')) {
    return `${translate('invalid_expiry')}`;
  }

  const [expiryMM, expiryYY] = value.split('/');

  if (expiryMM.length !== 2 || !Regex.digits(expiryMM)) {
    return `${translate('expiry_month_should_include_2_digits')}`;
  }

  if (expiryYY.length !== 2 || !Regex.digits(expiryYY)) {
    return `${translate('expiry_year_should_include_2_digits')}`;
  }

  if (
    !_inRange(Number(expiryMM), 1, 13) ||
    !_inRange(Number(expiryYY), 22, 100) ||
    moment()
      .set(`${translate('month')}` as any, +expiryMM - 1)
      .set(`${translate('year')}` as any, +expiryYY + 2000) < moment()
  ) {
    return `${translate('invalid_expiry')}`;
  }

  return null;
};

export const cvvValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length !== 3 || !Regex.digits(value)) {
    return `${translate('cvv_should_include_3_digits')}`;
  }

  return null;
};

export const fundSourceNameValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (value.length > 40) {
    return `${translate(
      'fund_source_name_can_include_a_maximum_of_40_characters',
    )}`;
  }

  if (!Regex.alphaNumericWithWhitespacesUnderscoresAndHyphnes(value)) {
    return `${translate(
      'fund_source_name_can_include_alphabets_numbers_spaces_hyphens_and_underscores_only',
    )}`;
  }

  return null;
};

export const digitsValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (!Regex.digits(value)) {
    return `${translate('only_numbers_are_allowed')}`;
  }

  return null;
};

export const panValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (!Regex.pan(value)) {
    return `${translate('invalid_pan_number')}`;
  }

  return null;
};

export const gstInValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  if (!Regex.gstIn(value)) {
    return `${translate('invalid_gstin_number')}`;
  }

  return null;
};

export const proportionValidation = (value: string) => {
  const emptyError = requiredValidation(value);

  if (emptyError) {
    return emptyError;
  }

  if (Number.isNaN(Number(value))) {
    return `${translate('enter_valid_proportion')}`;
  }

  if (Number(value) > 100) {
    return `${translate('proportion_should_be_less_than_100')}`;
  }

  if (Number(value) <= 0) {
    return `${translate('proportion_should_be_greater_than_0')}`;
  }

  return null;
};

export const ipsValidation = (value: string) => {
  const emptyError = requiredValidation(value);

  if (emptyError) {
    return emptyError;
  }

  const ips = value.split(',');

  if (ips.length >= MAX_IP_COUNT) {
    return `${translate('ip_address_count_can_be_a_maximum_of_max_ip_count', {
      MAX_IP_COUNT: MAX_IP_COUNT,
    })}`;
  }

  for (let index = 0; index < ips.length; index++) {
    const ip = ips[index];

    const splits = ip.split('.');

    if (splits.length !== 4 || splits.filter(_identity).length !== 4) {
      return `${translate('enter_a_valid_ip_address_ip', { ip: ip })}`;
    }

    if (!Regex.ip(ip)) {
      return `${translate('enter_a_public_ip_address_ip', { ip: ip })}`;
    }
  }

  return null;
};

export const ibanValidation = (value: string, optional = false) => {
  if (!value) {
    if (!optional) {
      return emptyErrorMessage;
    }

    return null;
  }

  const countryCode = value.slice(0, 2);
  const length = _get(IBAN_FORMAT_BY_COUNTRY[countryCode], 'length');

  if (
    !IBAN_FORMAT_BY_COUNTRY[countryCode] ||
    length !== value.length ||
    !Regex.iban(value)
  ) {
    return `${translate('invalid_iban_number')}`;
  }

  return null;
};
