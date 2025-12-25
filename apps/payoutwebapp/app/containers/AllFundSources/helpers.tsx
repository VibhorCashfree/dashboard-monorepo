import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Text, Image, Space, Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import ExtendedEllipsisPopup from 'components/ExtendedEllipsisPopup';

// Utils
import hasPermission from 'utils/hasPermission';
import FundSourcesUtil from 'utils/fundSources';
import Banks from 'utils/banks';
import getCardIcon from 'utils/getCardIcon';

// Images
import alertTriangleImg from 'images/alert-triangle.svg';

// Constants
import { USER_TYPE } from 'constants/common';
import { FORMATS } from 'constants/date';
import { BANK_CODE } from 'constants/banks';
import { FS_DISPLAY_TYPE, LABEL_BY_DISPLAY_TYPE } from 'constants/fundSources';
import { SUB_STAGES_BY_STAGE } from 'containers/Leads/constants';
import { CONNECTED_BANK } from 'containers/BankAccountSelfServe/constants';
import { ACTIONS_BY_STATUS, ACTION_TYPE } from './constants';

export const getActions = (
  row: AnyObject,
  restrictionCodes: number[],
  userType: USER_TYPE,
  preferences: { enableRouter: boolean },
) => {
  if (!hasPermission(restrictionCodes, userType, [27002])) {
    return [];
  }

  if (row.leadType) {
    const showConnect = SUB_STAGES_BY_STAGE.UAT_CRED_GENERATION.concat(
      SUB_STAGES_BY_STAGE.PROD_CRED_GENERATION,
    ).includes(row.status);

    if (showConnect) {
      return [
        {
          key: ACTION_TYPE.CONNECT,
          text: 'Connect',
          primary: true,
          value: ACTION_TYPE.CONNECT,
          image: (props: AnyObject) => <Icon name="pencil" {...props} />,
        },
      ];
    }

    return [];
  }

  if (row.connBankName === CONNECTED_BANK.CANARA_CONNECTED) {
    return [];
  }

  const bankCode = Banks.getCode(row.ifsc);

  let actions: RowAction<ACTION_TYPE>[] = [
    {
      key: ACTION_TYPE.CONNECT,
      text: 'Connect',
      primary: true,
      value: ACTION_TYPE.CONNECT,
      image: (props: AnyObject) => <Icon name="pencil" {...props} />,
    },
    {
      key: ACTION_TYPE.APPROVE,
      text: bankCode === BANK_CODE.YESB ? 'Connect' : 'Approve',
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

  if (!preferences.enableRouter) {
    actions = actions.concat({
      key: ACTION_TYPE.DEACTIVATE,
      text: 'Deactivate',
      primary: false,
      value: ACTION_TYPE.DEACTIVATE,
      image: (props: AnyObject) => <Icon name="stop" {...props} />,
    });
  }

  const rowActions =
    ACTIONS_BY_STATUS[row.status as keyof typeof ACTIONS_BY_STATUS] || [];

  return actions.filter((action) => rowActions.includes(action.value));
};

export const getFormattedRowData = (
  length: number,
  canVerify: boolean,
  downtimes: AnyObject[],
  weightage: Weightage[],
  restrictionCodes: number[],
  userType: USER_TYPE,
  preferences: { enableRouter: boolean },
  handleAction: (
    row: AnyObject,
  ) => (e: React.MouseEvent, itemSelected: ACTION_TYPE) => void,
) => {
  const weightageById = _keyBy(weightage, 'name');

  const columns = [
    {
      accessorKey: 'displayName',
      header: 'Name',
      ellipsis: true,
      cell: (row: AnyObject) => {
        const downtime = FundSourcesUtil.getDowntime(
          row.connBankName,
          downtimes,
        );

        return row.displayName ? (
          <>
            <Popup
              content={row.displayName}
              trigger={<span>{row.displayName}</span>}
            />

            {downtime ? (
              <Popup
                hoverable
                content={
                  <Text variant="b12" color="bodyLight">
                    Fund Source down -{' '}
                    <Link to="/fund-sources/downtimes" className="link">
                      View Details
                    </Link>
                  </Text>
                }
                trigger={
                  <Image inline src={alertTriangleImg} className="ml-1" />
                }
              />
            ) : null}
          </>
        ) : (
          '–'
        );
      },
    },
    {
      accessorKey: 'logo',
      header: 'Logo',
      ellipsis: true,
      cell: (row: AnyObject) => {
        if (row.fsDisplayType === FS_DISPLAY_TYPE.CREDIT_CARD) {
          return (
            <Image inline width="32" src={getCardIcon('NAME', row.ifsc)} />
          );
        }

        const downtime = FundSourcesUtil.getDowntime(
          row.connBankName,
          downtimes,
        );

        return downtime ? (
          <Popup
            hoverable
            content={
              <Text variant="b12" color="bodyLight">
                Fund Source down -{' '}
                <Link to="/fund-sources/downtimes" className="link">
                  View Details
                </Link>
              </Text>
            }
            trigger={
              <Image
                inline
                width="50"
                src={Banks.getIcon(row.ifsc, row.fsDisplayType)}
              />
            }
          />
        ) : (
          <Image
            inline
            width="50"
            src={Banks.getIcon(row.ifsc, row.fsDisplayType)}
          />
        );
      },
    },
    {
      accessorKey: 'fsDisplayType',
      header: 'Type',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) =>
        _get(LABEL_BY_DISPLAY_TYPE, [row.fsDisplayType], '–'),
    },
    {
      accessorKey: 'addedOn',
      header: 'Added At',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) =>
        row.addedOn ? moment(row.addedOn).format(FORMATS.TIMESTAMP) : '–',
    },
    {
      accessorKey: 'weightage',
      header: 'Weightage',
      tooltip: true,
      tooltipContent: () =>
        'Specifies what percentage of transfers must happen via each fund source.',
      cell: (row: AnyObject) => {
        const weightageValue = _get(weightageById, [
          row.paymentInstrumentId,
          'weightage',
        ]);

        return weightageValue ? `${weightageValue}%` : '–';
      },
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
        const actions = getActions(
          row,
          restrictionCodes,
          userType,
          preferences,
        );

        return (
          <Space justifyContent="flex-end">
            <ExtendedEllipsisPopup
              actions={actions}
              onClick={handleAction(row)}
            />
          </Space>
        );
      },
    },
  ];

  return length > 1 && canVerify
    ? columns
    : columns.filter((column) => column.accessorKey !== 'weightage');
};
