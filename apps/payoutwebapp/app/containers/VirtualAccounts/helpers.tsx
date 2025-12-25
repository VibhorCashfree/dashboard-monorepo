import React from 'react';
import moment from 'moment';
import { Space, EllipsisPopup } from '@cashfree-intl/coherent';
import _identity from 'lodash/identity';

// Utils
import { formatAmount } from 'utils/common';
import FundSourcesUtil from 'utils/fundSources';
import Region from 'utils/region';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';

// Constants
import { REGION } from 'constants/common';
import { FORMATS } from 'constants/date';
import { STATUS } from 'containers/AllFundSources/constants';
import { ACTION_TYPE } from './constants';

export const getActions = (row: AnyObject, virtualAccounts: AnyObject[]) => {
  let actions: RowAction<ACTION_TYPE>[] = [
    {
      key: ACTION_TYPE.INTERNAL_FUND_TRANSFER,
      text: 'Internal Fund Transfer',
      primary: false,
      value: ACTION_TYPE.INTERNAL_FUND_TRANSFER,
      image: (props) => <Icon name="send" {...props} />,
    },
    {
      key: ACTION_TYPE.INITIATE_PAYOUT,
      text: 'Initiate Payout',
      primary: false,
      value: ACTION_TYPE.INITIATE_PAYOUT,
      image: (props) => <Icon name="in-out" {...props} />,
    },
    {
      key: ACTION_TYPE.DELETE,
      text: 'Delete',
      primary: false,
      value: ACTION_TYPE.DELETE,
      image: (props) => <Icon name="stop" {...props} />,
      type: 'danger',
    },
  ];

  if (
    row.status === STATUS.DEACTIVATED ||
    Number(row.fsBalance.availableBalance) === 0 ||
    virtualAccounts.length < 2
  ) {
    actions = actions.filter(
      (action) => action.value !== ACTION_TYPE.INTERNAL_FUND_TRANSFER,
    );
  }

  if (
    row.status === STATUS.DEACTIVATED ||
    Number(row.fsBalance.availableBalance) === 0
  ) {
    actions = actions.filter(
      (action) => action.value !== ACTION_TYPE.INITIATE_PAYOUT,
    );
  }

  if (
    row.status === STATUS.DEACTIVATED ||
    Number(row.fsBalance.availableBalance) > 0
  ) {
    actions = actions.filter((action) => action.value !== ACTION_TYPE.DELETE);
  }

  return actions.filter(_identity);
};

export const getFormattedRowData = (
  virtualAccounts: AnyObject[],
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
    accessorKey: 'displayName',
    header: 'Display Name (VA Name)',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.displayName,
  },
  {
    accessorKey: Region.get() === REGION.IN ? 'virtualAccount' : 'virtualIBan',
    header: Region.get() === REGION.IN ? 'Virtual Account No.' : 'Virtual IBAN',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      Region.get() === REGION.IN ? row.virtualAccount : row.virtualIBan,
  },
  {
    accessorKey: 'amount',
    header: 'Acc. Balance',
    ellipsis: true,
    toolTip: true,
    textAlign: 'right',
    cell: (row: AnyObject) => formatAmount(row.fsBalance.availableBalance),
  },
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
      const actions = getActions(row, virtualAccounts);

      return (
        <Space justifyContent="flex-end">
          <EllipsisPopup menuItems={actions} onClick={handleAction(row)} />
        </Space>
      );
    },
  },
];

export const getFundSourcesOptions = (fundSources: AnyObject[]) =>
  FundSourcesUtil.getActives(fundSources).map((fundSource) => ({
    key: fundSource.fundSourceId,
    text: (
      <Space justifyContent="space-between" alignItems="center">
        <span>{fundSource.displayName}</span>
        <span className="pl-1">{fundSource.virtualAccount}</span>
      </Space>
    ),
    value: fundSource.paymentInstrumentId,
  }));
