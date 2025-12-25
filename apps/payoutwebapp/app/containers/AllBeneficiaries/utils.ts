import _intersection from 'lodash/intersection';
import _concat from 'lodash/concat';
import _cloneDeep from 'lodash/cloneDeep';
import _pick from 'lodash/pick';

// Constants
import {
  benePurposeOptions,
  BENE_PURPOSE,
  IBAN_FORMAT_BY_COUNTRY,
  REGION,
} from 'constants/common';
import {
  MODAL_TYPE,
  REQUIRED_FIELDS,
  DEFAULT_IBAN_FEEDBACK,
} from './constants';

// Utils
import Region from 'utils/region';
import Regex from 'utils/regex';

export const getButtonTxt = (
  stepNo: number,
  totalSteps: number,
  type: MODAL_TYPE,
) => {
  if (stepNo === totalSteps) {
    if (type === MODAL_TYPE.UPDATE) {
      return 'Update Beneficiary';
    }

    return 'Add Beneficiary';
  }

  return 'Next';
};

export const getRequiredFields = (
  type: MODAL_TYPE,
  benePurpose: BENE_PURPOSE,
  stepNo: number,
) => {
  let fields;

  if (type === MODAL_TYPE.UPDATE) {
    fields = _concat(['bankAccount', 'ifsc'], REQUIRED_FIELDS.STEP_THREE);
  } else if (benePurpose === BENE_PURPOSE.CORP_CC) {
    fields = _concat(
      REQUIRED_FIELDS.STEP_ONE,
      ['bankAccount', 'ifsc'],
      REQUIRED_FIELDS.STEP_THREE,
    );
  } else {
    fields = REQUIRED_FIELDS.STEP_ONE;
  }

  switch (stepNo) {
    case 1:
      return _intersection(fields, REQUIRED_FIELDS.STEP_ONE);

    case 2:
      return _intersection(fields, ['bankAccount', 'ifsc']);

    case 3:
      return _intersection(fields, REQUIRED_FIELDS.STEP_THREE);
  }

  return [];
};

export const getBenePurposeOptions = (purposePreference: {
  corpCC: boolean;
  amazonUPI: boolean;
}) => {
  let options: {
    value: BENE_PURPOSE;
    text: string;
  }[] = [];

  if (purposePreference.corpCC) {
    options = options.concat(benePurposeOptions[0]); // corp cc
  }

  if (purposePreference.amazonUPI) {
    options = options.concat(benePurposeOptions[1]); // amazon
  }

  options = options.concat(benePurposeOptions[2]); // others

  return options;
};

export const getSearchOptions = () => {
  const region = Region.get();

  if (region === REGION.AE) {
    return [
      { text: 'Beneficiary ID', value: 'beneId' },
      { text: 'Beneficiary Phone No.', value: 'phone' },
      { text: 'Account IBAN', value: 'iban' },
    ];
  }

  return [
    { text: 'Beneficiary ID', value: 'beneId' },
    { text: 'Beneficiary Phone No.', value: 'phone' },
    { text: 'Bank A/c Number', value: 'bankAccount' },
  ];
};

export const getUpdatedFeedback = (
  ibanFeedback: {
    COUNTRY_CODE: StringObject;
    LENGTH: StringObject;
    REGEX_FORMAT: StringObject;
  },
  value: string,
) => {
  if (!value) {
    return DEFAULT_IBAN_FEEDBACK;
  }

  const countryCode = value.slice(0, 2);

  if (!IBAN_FORMAT_BY_COUNTRY[countryCode]) {
    return {
      ...ibanFeedback,
      ...{
        COUNTRY_CODE: {
          type: 'danger',
          message: 'Country Code: ' + countryCode,
        },
        ..._pick(DEFAULT_IBAN_FEEDBACK, ['LENGTH', 'REGEX_FORMAT']),
      },
    };
  }

  const { length, format } = IBAN_FORMAT_BY_COUNTRY[countryCode];

  const previousFeedback = _cloneDeep(ibanFeedback);

  previousFeedback.COUNTRY_CODE.type = 'success';
  previousFeedback.COUNTRY_CODE.message = 'Country Code: ' + countryCode;

  previousFeedback.LENGTH.message = 'IBAN Length: ' + length;

  if (length === value.length) {
    previousFeedback.LENGTH.type = 'success';
  } else {
    previousFeedback.LENGTH.type = 'danger';
  }

  previousFeedback.REGEX_FORMAT.message = 'IBAN Format: ' + format;

  if (Regex.iban(value)) {
    previousFeedback.REGEX_FORMAT.type = 'success';
  } else {
    previousFeedback.REGEX_FORMAT.type = 'danger';
  }

  return previousFeedback;
};
