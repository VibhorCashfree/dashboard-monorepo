import React from 'react';

export const API_KEYS_COLUMN_ID = [
  {
    accessorKey: 'webhookUrl',
    header: 'URL',
    ellipsis: true,
    cell: webhookUrl => <>{webhookUrl}</>,
  },
];

export const MODAL_TYPES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  TEST: 'TEST',
  DELETE: 'DELETE',
};

export const ACTION_TYPES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  TEST: 'TEST',
};
