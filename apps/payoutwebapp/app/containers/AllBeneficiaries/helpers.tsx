import React from 'react';
import moment from 'moment';
import { Space, Popup } from '@cashfree-intl/coherent';

// Components
import CanWrite from 'components/CanWrite';
import Icon from 'components/Icon';
import Copy from 'components/Copy';
import StatusLabel from 'components/StatusLabel';

// Styled
import { Action, HoverCopy } from 'styled/common';

export const getFormattedRowData = (
  handleAction: (row: AnyObject) => (e: React.MouseEvent) => void,
) => [
  {
    accessorKey: 'addedOn',
    header: 'Added On',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format('DD MMM YYYY'),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'beneId',
    header: 'Beneficiary ID',
    ellipsis: true,
    cell: (row: AnyObject) => (
      <Popup
        content={row.beneId}
        trigger={
          <HoverCopy>
            <span>{row.beneId}</span>
            <Copy value={row.beneId} />
          </HoverCopy>
        }
      />
    ),
  },
  { accessorKey: 'phone', header: 'Phone No.', ellipsis: true, toolTip: true },
  {
    accessorKey: 'email',
    header: 'Email ID',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.email || '–',
  },
  {
    accessorKey: 'benePurpose',
    header: 'Beneficiary Purpose',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.benePurpose || '–',
  },
  {
    accessorKey: 'status',
    header: 'Verification Status',
    cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    textAlign: 'center',
    cell: (row: AnyObject) => (
      <CanWrite code={20001}>
        <Space justifyContent="flex-end" className="pr-2">
          <Popup
            content="Delete"
            trigger={
              <Action onClick={handleAction(row)}>
                <Icon name="delete" />
              </Action>
            }
          />
        </Space>
      </CanWrite>
    ),
  },
];
