import React from 'react';

// Components
import Icon from 'components/Icon';

// Utils
import hasPermission from 'utils/hasPermission';
import Banks from 'utils/banks';

// Constants
import { USER_TYPE } from 'constants/common';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { BANK_CODE } from 'constants/banks';
import {
  ACTIONS_BY_STATUS,
  ACTION_TYPE,
} from 'containers/AllFundSources/constants';
import { CONNECTED_BANK } from 'containers/BankAccountSelfServe/constants';

type Preferences = {
  enableVAOnConnectedFS: boolean;
  enableRouter: boolean;
};

export const getActions = (
  row: AnyObject,
  restrictionCodes: number[],
  userType: USER_TYPE,
  preferences: Preferences,
) => {
  if (!hasPermission(restrictionCodes, userType, [27002])) {
    return [];
  }

  if (row.connBankName === CONNECTED_BANK.CANARA_CONNECTED) {
    return [];
  }

  const bankCode: string = Banks.getCode(row.ifsc);

  let actions: RowAction<ACTION_TYPE>[] = [];

  switch (row.fsDisplayType) {
    case FS_DISPLAY_TYPE.CONNECTED_WALLET:
      actions = [
        {
          key: ACTION_TYPE.UPDATE_DETAILS,
          text: 'Update Details',
          primary: false,
          value: ACTION_TYPE.UPDATE_DETAILS,
          image: (props: AnyObject) => <Icon name="pencil" {...props} />,
        },
      ];

      if (
        hasPermission(restrictionCodes, userType, [21506]) &&
        !preferences.enableVAOnConnectedFS
      ) {
        actions = [
          {
            key: ACTION_TYPE.ADD_BALANCE,
            text: 'Recharge',
            primary: true,
            value: ACTION_TYPE.ADD_BALANCE,
            image: (props: AnyObject) => <Icon name="pencil" {...props} />,
          },
          ...actions,
        ];
      }
      break;

    default:
      actions = [
        {
          key: ACTION_TYPE.CONNECT,
          text: 'Connect',
          primary: true,
          value: ACTION_TYPE.CONNECT,
          image: (props: AnyObject) => <Icon name="pencil" {...props} />,
        },
        {
          key: ACTION_TYPE.APPROVE,
          text: [BANK_CODE.YESB].includes(bankCode as BANK_CODE)
            ? 'Connect'
            : 'Approve',
          primary: true,
          value: ACTION_TYPE.APPROVE,
          image: (props: AnyObject) => <Icon name="pencil" {...props} />,
        },
        {
          key: ACTION_TYPE.UPDATE_DETAILS,
          text: 'Update Details',
          primary: false,
          value: ACTION_TYPE.UPDATE_DETAILS,
          image: (props: AnyObject) => <Icon name="pencil" {...props} />,
        },
      ];
      break;
  }

  if (!preferences.enableRouter) {
    actions = actions.concat({
      key: ACTION_TYPE.DEACTIVATE,
      text: 'Deactivate',
      primary: false,
      danger: true,
      value: ACTION_TYPE.DEACTIVATE,
      image: (props: AnyObject) => <Icon name="pencil" {...props} />,
    });
  }

  const rowActions: ACTION_TYPE[] =
    ACTIONS_BY_STATUS[row.status as keyof typeof ACTIONS_BY_STATUS] || [];

  return actions.filter((action) => rowActions.includes(action.value));
};
