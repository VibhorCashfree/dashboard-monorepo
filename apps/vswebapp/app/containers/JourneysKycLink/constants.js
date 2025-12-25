import React from 'react';
import { Icon as CoherentIcon } from '@cashfree-intl/coherent';
import _pick from 'lodash/pick';
import _startCase from 'lodash/startCase';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import { FORMATS } from 'constants/date';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate } from 'helpers/common';

export const TAB_KEY = 'journey';

const STATUSES = ['PUBLISHED', 'DRAFT'];

export const options = [{ text: 'Template Name', value: 'templateName' }];

export const ACTION_TYPES = {
  EDIT_JOURNEY: 'EDIT_JOURNEY',
  VIEW_JOURNEY: 'VIEW_JOURNEY',
  DELETE: 'DELETE',
};

export const COLUMN_ID = [
  {
    accessorKey: 'createdOn',
    header: 'Created On',
    cell: ({ createdOn }) => formattedDate(createdOn),
  },
  {
    accessorKey: 'templateName',
    header: 'Template Name',
    cell: ({ templateName }) => _startCase(templateName),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const MODAL_TYPES = {
  CANCEL: 'CANCEL',
  SUCCESS: 'SUCCESS',
  UPLOAD: 'UPLOAD',
  FAILED: 'FAILED',
  FAILED_WITH_VALID: 'FAILED_WITH_VALID',
  FAILED_WITH_NO_VALID: 'FAILED_WITH_NO_VALID',
};

export const STEP_ONE_FIELDS = ['products', 'linkExpiry'];
export const STEP_TWO_FIELDS = ['file'];

export const LOGO_UPLOAD_FILE_CHECKLIST = [
  'Max file size: 500 kb',
  'File type: png/Jpeg',
];

export const COLOR_TYPES = [
  {
    key: 'headerColor',
    headerText: 'Header Colour',
    infoText: 'This determines the colour of the header element.',
  },
  {
    key: 'primaryColor',
    headerText: 'Primary Brand Colour',
    infoText:
      'This determines the colour of the buttons, link, and interactive elements.',
  },
  {
    key: 'textColor',
    headerText: 'Text Colour',
    infoText:
      'This determines the colour of the text displayed over the primary colour.',
  },
];

const defaultActions = [
  {
    key: 2,
    text: 'Delete',
    value: ACTION_TYPES.DELETE,
    image: props => <Icon name="delete" {...props} />,
    type: 'danger',
  },
];

export const publishedActions = [
  {
    key: 1,
    text: 'View',
    value: ACTION_TYPES.VIEW_JOURNEY,
    image: props => <CoherentIcon name="eye" {...props} />,
  },
  ...defaultActions,
];

export const draftActions = [
  {
    key: 1,
    text: 'Edit',
    value: ACTION_TYPES.EDIT_JOURNEY,
    image: props => <Icon name="pencil" {...props} />,
  },
  ...defaultActions,
];
