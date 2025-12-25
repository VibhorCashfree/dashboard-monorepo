import React from 'react';

// Constants
import { REGION } from 'constants/common';

// Components
import StatusLabel from 'components/StatusLabel';

// Utils
import Region from 'utils/region';

export const getFormattedRowData = () => {
  const region: string = Region.get();

  if (region === REGION.AE) {
    return [
      {
        accessorKey: 'beneId',
        header: 'Beneficiary ID',
        ellipsis: true,
        toolTip: true,
      },
      { accessorKey: 'name', header: 'Name', ellipsis: true, toolTip: true },
      {
        accessorKey: 'phone',
        header: 'Phone No.',
        ellipsis: true,
        toolTip: true,
      },
      { accessorKey: 'iban', header: 'IBAN', ellipsis: true, toolTip: true },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
      },
    ];
  }

  return [
    {
      accessorKey: 'beneId',
      header: 'Beneficiary ID',
      ellipsis: true,
      toolTip: true,
    },
    { accessorKey: 'name', header: 'Name', ellipsis: true, toolTip: true },
    {
      accessorKey: 'phone',
      header: 'Phone No.',
      ellipsis: true,
      toolTip: true,
    },
    { accessorKey: 'vpa', header: 'UPI VPA', ellipsis: true, toolTip: true },
    {
      accessorKey: 'bankAccount',
      header: 'Bank Account No.',
      ellipsis: true,
      toolTip: true,
    },
    { accessorKey: 'ifsc', header: 'IFSC', ellipsis: true, toolTip: true },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
    },
  ];
};
