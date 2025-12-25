import React from 'react';
import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';
import { STATUS } from './constants';

// Components
import StatusLabel from 'components/StatusLabel';

export const getFormattedRowData = () => [
  {
    accessorKey: 'cfGateway',
    header: 'Connected Fund Source',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.cfGateway || '–',
  },
  {
    accessorKey: 'incidentType',
    header: 'Incident Type',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.incidentType || '–',
  },
  {
    accessorKey: 'mode',
    header: 'Payment Mode',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.mode || '–',
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.startTime).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.endTime).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'resolved',
    header: 'Status',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => {
      let status: string | undefined;

      if (row.resolved) {
        status = 'RESOLVED';
      } else if (row.incidentType === STATUS.SCHEDULED) {
        status = 'PLANNED';
      } else if (row.incidentType === STATUS.UNSCHEDULED) {
        status = 'ONGOING';
      }

      return <StatusLabel>{status}</StatusLabel>;
    },
  },
];
