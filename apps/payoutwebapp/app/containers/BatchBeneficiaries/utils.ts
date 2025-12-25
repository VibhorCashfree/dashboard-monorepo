// Constants
import {
  benePurposeWithDescriptionOptions,
  fileTypeOptions,
} from './constants';

export const getBenePurposeOptions = (purposePreference: {
  others: boolean;
  corpCC: boolean;
  amazonUPI: boolean;
}) => {
  let options: {
    value: string;
    label: string;
    description: string;
  }[] = [];

  if (purposePreference.others) {
    if (purposePreference.corpCC) {
      options = options.concat(benePurposeWithDescriptionOptions[0]); // corp cc
    }

    if (purposePreference.amazonUPI) {
      options = options.concat(benePurposeWithDescriptionOptions[1]); // amazon
    }

    options = options.concat(benePurposeWithDescriptionOptions[2]); // others
  }

  return options;
};

export const getFileTypeOptions = (purposePreference: {
  others: boolean;
  corpCC: boolean;
  amazonUPI: boolean;
}) => {
  let options: {
    value: string;
    text: string;
  }[] = [];

  if (purposePreference.others) {
    if (purposePreference.corpCC) {
      options = options.concat(fileTypeOptions[0]); // corp cc
    }

    if (purposePreference.amazonUPI) {
      options = options.concat(fileTypeOptions[1]); // amazon
    }

    options = options.concat(fileTypeOptions[2]); // others
  }

  return options;
};
