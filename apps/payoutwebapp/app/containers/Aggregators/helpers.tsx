import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Text, Image, Space, Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Components
import StatusLabel from 'components/StatusLabel';
import ExtendedEllipsisPopup from 'components/ExtendedEllipsisPopup';

// Utils
import FundSourcesUtil from 'utils/fundSources';

// Images
import razorpayIcon from 'images/banks/razorpay.svg';
import cashfreeIcon from 'images/cashfree.svg';
import alertTriangleImg from 'images/alert-triangle.svg';

// Constants
import { USER_TYPE } from 'constants/common';
import { MENU, PATH_BY_MENU } from 'constants/menuItems';
import { FORMATS } from 'constants/date';
import { AGGREGATOR, LABEL_BY_DISPLAY_TYPE } from 'constants/fundSources';
import { ACTION_TYPE } from 'containers/AllFundSources/constants';

// Helpers
import { getActions } from 'containers/AllFundSources/helpers';

export const getFormattedRowData = (
  downtimes: AnyObject[],
  restrictionCodes: number[],
  userType: USER_TYPE,
  preferences: any,
  handleAction: (
    row: AnyObject,
  ) => (e: React.MouseEvent, itemSelected: ACTION_TYPE) => void,
) => [
  {
    accessorKey: 'displayName',
    header: 'Reference Name',
    ellipsis: true,
    cell: (row: AnyObject) => {
      const downtime = FundSourcesUtil.getDowntime(row.connBankName, downtimes);

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
                  <Link
                    to={`/${PATH_BY_MENU[MENU.DOWNTIMES]}`}
                    className="link"
                  >
                    View Details
                  </Link>
                </Text>
              }
              trigger={<Image inline src={alertTriangleImg} className="ml-1" />}
            />
          ) : null}
        </>
      ) : (
        '–'
      );
    },
  },
  {
    accessorKey: 'aggregator',
    header: 'Aggregator Name',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => (
      <Image
        inline
        width="60"
        src={
          row.connBankName === AGGREGATOR.RAZORPAY ? razorpayIcon : cashfreeIcon
        }
      />
    ),
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
    accessorKey: 'logo',
    header: 'Account No.',
    ellipsis: true,
    cell: (row: AnyObject) => {
      if (row.leadType) {
        const item = row.data.find(
          (item: AnyObject) => item.property === 'Account Number',
        );

        return item ? item.value : '–';
      }

      const downtime = FundSourcesUtil.getDowntime(row.connBankName, downtimes);

      return downtime ? (
        <Popup
          hoverable
          content={
            <Text variant="b12" color="bodyLight">
              Fund Source down -{' '}
              <Link to={`/${PATH_BY_MENU[MENU.DOWNTIMES]}`} className="link">
                View Details
              </Link>
            </Text>
          }
          trigger={row.bankAccount || '–'}
        />
      ) : (
        row.bankAccount || '–'
      );
    },
  },
  {
    accessorKey: 'addedOn',
    header: 'Added On',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      row.addedOn ? moment(row.addedOn).format(FORMATS.TIMESTAMP) : '–',
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
      const actions = getActions(row, restrictionCodes, userType, preferences);

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
