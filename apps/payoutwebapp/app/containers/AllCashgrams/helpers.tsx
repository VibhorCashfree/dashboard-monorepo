import React from 'react';
import { Space, EllipsisPopup } from '@cashfree-intl/coherent';
import moment from 'moment';

// Utils
import { formatAmount } from 'utils/common';
import hasPermission from 'utils/hasPermission';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';

// Constants
import { USER_TYPE } from 'constants/common';
import { FORMATS } from 'constants/date';
import { STATUS, ACTION_TYPE } from './constants';

const getActions = (
  row: AnyObject,
  restrictionCodes: number[],
  userType: USER_TYPE,
) => {
  const actions: RowAction<ACTION_TYPE>[] = [];

  if (row.status === STATUS.ACTIVE) {
    if (hasPermission(restrictionCodes, userType, [21702])) {
      actions.push({
        key: ACTION_TYPE.SEND,
        text: 'Send',
        value: ACTION_TYPE.SEND,
        image: (props: AnyObject) => <Icon name="send" {...props} />,
      });
    }

    actions.push({
      key: ACTION_TYPE.COPY,
      text: 'Copy Link',
      value: ACTION_TYPE.COPY,
      image: (props: AnyObject) => <Icon name="copy" {...props} />,
    });

    if (hasPermission(restrictionCodes, userType, [21703])) {
      actions.push({
        key: ACTION_TYPE.DEACTIVATE,
        text: 'Deactivate',
        value: ACTION_TYPE.DEACTIVATE,
        image: (props: AnyObject) => <Icon name="stop" {...props} />,
        type: 'danger',
      });
    }
  }

  return actions;
};

export const getFormattedRowData = (
  restrictionCodes: number[],
  userType: USER_TYPE,
  handleAction: (row: AnyObject) => void,
) => [
  {
    accessorKey: 'addedOn',
    header: 'Created At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'expiry',
    header: 'Valid Till',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.expiry).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'cashgramId',
    header: 'Cashgram ID',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    ellipsis: true,
    toolTip: true,
    textAlign: 'right',
    cell: (row: AnyObject) => formatAmount(row.amount),
  },
  {
    accessorKey: 'name',
    header: 'Beneficiary Name',
    ellipsis: true,
    toolTip: true,
  },
  { accessorKey: 'phone', header: 'Phone No.', ellipsis: true, toolTip: true },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    textAlign: 'center',
    cell: (row: AnyObject) => {
      const actions: RowAction<ACTION_TYPE>[] = getActions(
        row,
        restrictionCodes,
        userType,
      );

      return (
        row.status === STATUS.ACTIVE && (
          <Space justifyContent="flex-end">
            <EllipsisPopup menuItems={actions} onClick={handleAction(row)} />
          </Space>
        )
      );
    },
  },
];
