import _size from 'lodash/size';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';

const isFormValid = (formObj, errorObj, REQUIRED_FIELDS) => {
  const hasError = _size(_pickBy(errorObj, _identity)) > 0;
  const hasAllFields =
    _size(_pick(formObj, REQUIRED_FIELDS)) === REQUIRED_FIELDS.length;

  return hasAllFields && !hasError;
};

export default isFormValid;
