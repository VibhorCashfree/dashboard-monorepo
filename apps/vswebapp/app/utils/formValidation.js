import _isNaN from 'lodash/isNaN';

// Utils
import Regex from './regex';
import { translate } from '@cashfree-intl/coherent';
import { formatAmount } from './common';

// Regular expression to validate alphanumeric characters with spaces, dots, underscores, and hyphens
const regex = /^[a-zA-Z0-9 ._\-]+$/;

// export const `This field cannot be blank.` = `This field cannot be blank.`;

/**
 * @description Validation function to check if a value is provided and matches a specific regex pattern
 * @param {*} value
 * @returns
 */
export const requiredValidation = value => {
  // Check if the value is empty or undefined
  if (!value) {
    return `${translate('this_field_cannot_be_blank')}`;
  }

  return null;
};

export const coordinateValidation = value => {
  const emptyError = requiredValidation(value);

  if (emptyError) {
    return emptyError;
  }

  if (!/^\d+(\.\d+)?$/.test(value)) {
    return translate('coordinates_should_be_in_decimal');
  }

  return null;
};

export const journeyNameValidation = value => {
  const emptyError = requiredValidation(value);

  if (emptyError) {
    return emptyError;
  }

  if (!Regex.journeyName(value)) {
    return `${translate(
      'template_name_must_start_with_an_alphabet_and_can_contain_only_a_z_a_z_0_9',
    )}`;
  }

  if (value.length > 100 || value.length < 3) {
    return `${translate('template_name_must_have_3_to_100_characters')}`;
  }
};

export const decimalPrecisionValidation = (value, precision = 2) => {
  const [_, decimalPart = ''] = value.toString().split('.');

  const num = Number(value);
  if (decimalPart.length > precision) {
    const factor = 10 ** precision;
    const lower = Math.floor(num * factor) / factor;
    const upper = Math.ceil(num * factor) / factor;

    return `Please enter a valid value. The two nearest valid values are ${lower.toFixed(
      precision,
    )} and ${upper.toFixed(precision)}.`;
  }

  return null;
};

export const amountValidation = (amount, limit, precision = null) => {
  const emptyError = requiredValidation(amount);

  if (emptyError) {
    return emptyError;
  }

  if (Number.isNaN(Number(amount))) {
    return `${translate('enter_valid_amount')}`;
  }

  if (Number(amount) < 1) {
    return `${translate('amount_entered_is_less_than_1_rupee')}`;
  }

  if (Number(amount) > Number(limit)) {
    const formattedAmount = formatAmount(limit);
    return `${translate(
      'amount_should_be_equal_to_or_lesser_than_formatted_amount_write_to_care_cashfree_com_to_increase_the_limit',
      { formattedAmount: formattedAmount },
    )}`;
  }

  if (precision !== null) {
    return decimalPrecisionValidation(amount, precision);
  }

  return null;
};

export const accountNumberValidation = (accountNumber, optional = false) => {
  if (!accountNumber) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (accountNumber.length < 6) {
    return `${translate(
      'account_number_should_include_a_minimum_6_characters',
    )}`;
  }

  if (accountNumber.length > 40) {
    return `${translate(
      'account_number_can_include_a_maximum_of_40_characters',
    )}`;
  }

  if (!Regex.alphaNumeric(accountNumber)) {
    return `${translate(
      'bank_account_number_can_include_numbers_and_alphabets_only',
    )}`;
  }

  return null;
};

export const ifscValidation = (ifsc, optional = false) => {
  if (!ifsc) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (!Regex.ifsc(ifsc)) {
    return `${translate('ifsc_is_not_in_correct_format')}`;
  }

  if (ifsc.length !== 11) {
    return `${translate('ifsc_should_include_11_characters')}`;
  }

  if (Number(ifsc[4]) !== 0) {
    return `${translate('the_5th_character_of_ifsc_should_always_be_0')}`;
  }

  if (!Regex.alphaNumeric(ifsc)) {
    return `${translate('special_characters_are_not_allowed_in_ifsc')}`;
  }

  return null;
};

export const panValidation = (pan, optional = false) => {
  if (!pan) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (pan.length !== 10) {
    return `${translate('pan_should_include_10_characters')}`;
  }

  if (!Regex.alphaNumeric(pan)) {
    return `${translate('special_characters_are_not_allowed_in_pan')}`;
  }

  return null;
};

export const passportValidation = (passport, optional = false) => {
  if (!passport) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (!Regex.alphaNumeric(passport)) {
    return `${translate('special_characters_are_not_allowed_in_passport')}`;
  }

  if (passport.length !== 15) {
    return `${translate('passport_should_include_15_characters')}`;
  }

  return null;
};

export const cinValidation = (cin, optional = false) => {
  if (!cin) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (!Regex.cin(cin)) {
    return `${translate('cin_must_be_in_correct_format')}`;
  }

  if (!Regex.alphaNumeric(cin)) {
    return `${translate('special_characters_are_not_allowed_in_cin')}`;
  }

  if (cin.length !== 21) {
    return `${translate('cin_should_include_21_characters')}`;
  }

  return null;
};

export const phoneNumberValidation = (phoneNumber, optional = false) => {
  if (!phoneNumber) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (phoneNumber.length !== 10) {
    return `${translate('phone_number_should_include_10_digits')}`;
  }

  if (!Regex.digits(phoneNumber)) {
    return `${translate('only_numbers_are_allowed')}`;
  }

  return null;
};

export const emailValidation = (email, optional = false) => {
  if (!email) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (!Regex.email(email.trim())) {
    return `${translate('enter_valid_email_id')}`;
  }

  return null;
};

export const vpaValidation = (vpa, optional = false) => {
  if (!vpa) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (vpa.length < 3) {
    return `${translate('upi_vpa_should_include_a_minimum_of_3_characters')}`;
  }

  if (vpa.length > 100) {
    return `${translate('upi_vpa_can_include_a_maximum_of_100_characters')}`;
  }

  if (!Regex.vpa(vpa)) {
    return `${translate('upi_vpa_is_not_in_the_correct_format')}`;
  }

  if (vpa.lastIndexOf('-') !== -1) {
    if (vpa.lastIndexOf('-') > vpa.lastIndexOf('@')) {
      return `${translate(
        'invalid_upi_vpa_hyphen_is_not_allowed_after_symbol',
      )}`;
    }
  }

  return null;
};

export const aadhaarValidation = aadhaar => {
  const emptyError = requiredValidation(aadhaar);

  if (emptyError) {
    return emptyError;
  }

  if (aadhaar.length !== 12) {
    return `${translate('aadhaar_number_should_include_12_digits')}`;
  }

  if (!Regex.digits(aadhaar)) {
    return `${translate('only_numbers_are_allowed')}`;
  }

  return null;
};

export const gstInValidation = gstIn => {
  const emptyError = requiredValidation(gstIn);

  if (emptyError) {
    return emptyError;
  }

  if (_isNaN(Number(gstIn.slice(0, 2)))) {
    return `${translate('please_provide_a_valid_gstin')}`;
  }

  if (gstIn.length !== 15) {
    return `${translate('gstin_should_include_15_characters')}`;
  }

  if (!Regex.alphaNumeric(gstIn)) {
    return `${translate('special_characters_are_not_allowed_in_gstin')}`;
  }

  return null;
};

export const gstInNameValidation = (name, optional = false) => {
  if (!name) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (name.length > 100) {
    return `${translate('name_can_include_a_maximum_of_100_characters')}`;
  }

  if (!Regex.alphabetsWithWhitespaces(name)) {
    return `${translate('gstin_name_cannot_include_special_characters')}`;
  }

  return null;
};

export const rcValidation = name => {
  if (!name) {
    return `${translate('this_field_cannot_be_blank')}`;
  }

  if (!Regex.registrationCertificate(name)) {
    return `${translate('registration_certificate_is_not_in_correct_format')}`;
  }

  if (!Regex.alphaNumeric(name)) {
    return `${translate('special_characters_are_not_allowed_in_rc')}`;
  }

  return null;
};

export const drivingLicenseValidation = name => {
  if (!name) {
    return `${translate('this_field_cannot_be_blank')}`;
  }

  if (!Regex.alphaNumeric(name)) {
    return `${translate(
      'special_characters_are_not_allowed_in_driving_license',
    )}`;
  }

  if (!Regex.drivingLicense(name)) {
    return `${translate('driving_license_is_not_in_correct_format')}`;
  }

  return null;
};

export const voterIdValidation = name => {
  if (!name) {
    return `${translate('this_field_cannot_be_blank')}`;
  }

  if (!Regex.voterId(name)) {
    return `${translate('voter_id_is_not_in_correct_format')}`;
  }

  return null;
};

export const uanValidation = name => {
  if (!name) {
    return `${translate('this_field_cannot_be_blank')}`;
  }

  if (name.length !== 12) {
    return `${translate('uan_should_include_12_characters')}`;
  }

  if (!Regex.digits(name)) {
    return `${translate('uan_is_not_in_correct_format')}`;
  }

  return null;
};

export const nameValidation = (
  type,
  value,
  withSpecial = true,
  optional = false,
) => {
  if (!value?.trim()) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (value.length > 100) {
    return `${translate('type_can_include_a_maximum_of_100_characters', {
      type: type,
    })}`;
  }

  if (withSpecial) {
    if (!Regex.alphaNumericWithDotHyphen(value)) {
      return `${translate('type_can_be_alphanumeric_with_dot_and_hyphen_only', {
        type: type,
      })}`;
    }
  } else {
    if (!Regex.alphaNumericWithWhitespaces(value)) {
      return `${translate('type_can_be_alphanumeric_only', { type: type })}`;
    }
  }

  return null;
};

export const pan360NameValidation = (value, optional = false) => {
  if (!value) {
    if (!optional) {
      return `${translate('this_field_cannot_be_blank')}`;
    }

    return null;
  }

  if (value.length > 40) {
    return `${translate('pan_advance_can_include_a_maximum_of_40_characters')}`;
  }

  if (!Regex.alphaNumericWithDotHyphen(value)) {
    return `${translate(
      'pan_advance_can_be_alphanumeric_with_dot_and_hyphen_only',
    )}`;
  }

  return null;
};

export const urlValidation = url => {
  if (!url) {
    return `${translate('this_field_cannot_be_blank')}`;
  }

  if (!Regex.url(url)) {
    return `${translate('url_is_not_in_correct_format')}`;
  }

  return null;
};
