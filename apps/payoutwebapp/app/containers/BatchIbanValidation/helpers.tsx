import React from 'react';
import { Space, Popup } from '@cashfree-intl/coherent';
import moment from 'moment';

// Utils
import Region from 'utils/region';
import { showDownload } from 'utils/common';

// Constants
import { FORMATS } from 'constants/date';
import { REGION } from 'constants/common';

// Components
import CanWrite from 'components/CanWrite';
import StatusLabel from 'components/StatusLabel';
import Icon from 'components/Icon';

// Styled
import { Action } from 'styled/common';

export const getFormattedRowData = (
  handleDownload: (row: AnyObject) => (e: React.MouseEvent) => Promise<void>,
): Array<any> => [
  {
    accessorKey: 'addedOn',
    header: 'Uploaded At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      moment(
        Region.get() === REGION.IN ? row.addedOn : row.addedOn + 'Z',
      ).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'name',
    header: 'File Name',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'total',
    header: 'Total Records',
    ellipsis: true,
    toolTip: true,
  },
  { accessorKey: 'valid', header: 'Valid', ellipsis: true, toolTip: true },
  { accessorKey: 'invalid', header: 'Invalid', ellipsis: true, toolTip: true },
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
  {
    accessorKey: 'action',
    header: 'Actions',
    textAlign: 'center',
    cell: (row: AnyObject) => (
      <CanWrite code={20007}>
        {showDownload(row.status) && (
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
        )}
      </CanWrite>
    ),
  },
];
