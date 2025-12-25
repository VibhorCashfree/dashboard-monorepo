import React from 'react';
import { Space, Popup } from '@cashfree-intl/coherent';
import moment from 'moment';
import _identity from 'lodash/identity';

// Constants
import { FORMATS } from 'constants/date';

// Components
import StatusLabel from 'components/StatusLabel';
import Icon from 'components/Icon';

// Styled
import { Action } from 'styled/common';

export const getFormattedRowData = (
  canDownload: boolean,
  handleDownload: (row: AnyObject) => (e: React.MouseEvent) => Promise<void>,
) =>
  [
    {
      accessorKey: 'addedOn',
      header: 'Uploaded At',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => moment(row.addedOn).format(FORMATS.TIMESTAMP),
    },
    {
      accessorKey: 'fileName',
      header: 'File Name',
      ellipsis: true,
      toolTip: true,
    },
    {
      accessorKey: 'countTransfers',
      header: 'Total Records',
      ellipsis: true,
      toolTip: true,
    },
    { accessorKey: 'valid', header: 'Valid', ellipsis: true, toolTip: true },
    {
      accessorKey: 'invalid',
      header: 'Invalid',
      ellipsis: true,
      toolTip: true,
    },
    {
      accessorKey: 'uploadedBy',
      header: 'Uploaded By',
      ellipsis: true,
      toolTip: true,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
    },
    canDownload && {
      accessorKey: 'action',
      header: 'Actions',
      textAlign: 'center',
      cell: (row: AnyObject) => (
        <Space justifyContent="flex-end" className="pr-2">
          <Popup
            content="Download Report"
            trigger={
              <Action onClick={handleDownload(row)}>
                <Icon role="download" name="download" />
              </Action>
            }
          />
        </Space>
      ),
    },
  ].filter(_identity);
