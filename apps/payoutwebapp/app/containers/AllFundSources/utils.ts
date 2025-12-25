import moment from 'moment';
import _identity from 'lodash/identity';
import _isEqual from 'lodash/isEqual';

// Utils
import FundSourcesUtil from 'utils/fundSources';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { STATUS } from './constants';

export const getNewFundSources = (fundSources: AnyObject[]) =>
  FundSourcesUtil.getActives(fundSources)
    .filter(
      (fundSource) =>
        fundSource.preferences.FUND_SOURCE_WEIGHTAGE === '0' &&
        moment().diff(moment(fundSource.addedOn), 'hours') < 48,
    )
    .map((fundSource) => fundSource.displayName)
    .filter(_identity);

export const hasFormUpdated = (selectedRow: AnyObject, formObj: AnyObject) => {
  const isCreditCard =
    selectedRow.fsDisplayType === FS_DISPLAY_TYPE.CREDIT_CARD &&
    selectedRow.status === STATUS.DEACTIVATED;

  const equalName = formObj.displayName === selectedRow.displayName;
  const equalNameAndFile = _isEqual(
    { displayName: selectedRow.displayName, file: selectedRow.file },
    { displayName: formObj.displayName, file: formObj.file },
  );

  return isCreditCard ? equalNameAndFile : equalName;
};
