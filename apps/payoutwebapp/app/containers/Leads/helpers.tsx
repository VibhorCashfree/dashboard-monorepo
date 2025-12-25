import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';
import { FORMATS } from 'constants/date';
import { MODAL_TYPE } from 'containers/AllFundSources/constants';
import { SUB_STAGES_BY_STAGE } from './constants';

// Components
import StatusLabel from 'components/StatusLabel';

export const getFormattedRowData = (
  fundSourceById: Record<number, AnyObject>,
) => [
  {
    accessorKey: 'id',
    header: 'ID',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'addedOn',
    header: 'Created At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'gatewayName',
    header: 'Bank',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.gatewayName || '–',
  },
  {
    accessorKey: 'fundSourceId',
    header: 'FundSource',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      _get(fundSourceById, [row.fundSourceId, 'displayName']) || '–',
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
      const showConnect: boolean =
        SUB_STAGES_BY_STAGE.UAT_CRED_GENERATION.concat(
          SUB_STAGES_BY_STAGE.PROD_CRED_GENERATION,
        ).includes(row.status);

      return (
        showConnect && (
          <Link
            to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
              PATH_BY_SUBMENU[SUBMENU.ALL]
            }`}
            state={{
              modalType: MODAL_TYPE.CREATE_BANK_ACCOUNT,
              lead: row,
            }}
          >
            <Button
              data-event-name="Primary_Button"
              size="small"
              secondary
              className="mr-1"
            >
              Connect
            </Button>
          </Link>
        )
      );
    },
  },
];
