import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
import _includes from 'lodash/includes';
import _filter from 'lodash/filter';

// Constants
import { PREF_MAPPING } from './constants';

export const generatePayload = (
  formObj,
  colorValues,
  requiredFields,
  mandatoryFields,
) => {
  const formData = new FormData();
  const scopes = generateScopes(mandatoryFields, requiredFields);

  formData.append('scopes', JSON.stringify(scopes));
  formData.append('app_name', formObj.app_name);
  formData.append('app_brand_name', formObj.app_brand_name);
  formData.append('app_logo', formObj.app_logo);
  formData.append('redirect_urls', formObj.redirect_urls);
  formData.append('app_color', `#${colorValues.primaryColor}`);

  return formData;
};

const generateScopes = (mandatoryFields, requiredFields) => {
  const scopes = [];

  requiredFields.forEach(requiredField => {
    scopes.push({
      type: requiredField,
      config: {
        is_required: mandatoryFields.includes(requiredField),
      },
    });
  });

  return scopes;
};

export const separateBasedOnMapping = inputArray => {
  return _reduce(
    PREF_MAPPING,
    (result, fields, key) => {
      // Extract all the 'type' values from the fields array for each key
      const types = _map(fields, 'type');

      // Filter inputArray for the types belonging to the current key
      result[key] = _filter(inputArray, type => _includes(types, type));

      return result;
    },
    {},
  );
};

export const calculateStepProgress = (formObj, stepFields) => {
  const totalFields = stepFields.length;
  const filledFields = stepFields.filter(field => formObj[field]).length;
  return Math.round((filledFields / totalFields) * 100);
};

export const maskClientSecret = (secret, visibleStart = 4, visibleEnd = 4) => {
  if (!secret || typeof secret !== 'string') {
    throw new Error('Invalid clientSecret');
  }

  const maskLength = secret.length - (visibleStart + visibleEnd);
  if (maskLength <= 0) {
    return secret; // Not enough length to mask, return as-is
  }

  const maskedPart = '*'.repeat(maskLength);
  return `${secret.slice(0, visibleStart)}${maskedPart}${secret.slice(
    -visibleEnd,
  )}`;
};
