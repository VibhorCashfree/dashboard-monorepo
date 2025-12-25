import React from 'react';
import { Space, Popup } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';
import CanWrite from 'components/CanWrite';

// Constants
import { MODAL_TYPE } from './constants';

// Styled
import { Action } from 'styled/common';

export const getFormattedRowData = (
  webhookVersion: string,
  versions: Record<string, { version: string }>,
  handleAction: (modalType: MODAL_TYPE) => () => void,
) => [
  {
    accessorKey: 'url',
    header: 'URL',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'version',
    header: 'Version',
    cell: () => versions[webhookVersion].version,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    textAlign: 'right',
    cell: () => (
      <CanWrite code={22005} remove>
        <Space gap={4} justifyContent="flex-end" className="pr-2">
          <Popup
            position="bottom"
            content="Test"
            trigger={
              <Action onClick={handleAction(MODAL_TYPE.TEST)}>
                <Icon name="test" />
              </Action>
            }
          />

          <Popup
            position="bottom"
            content="Edit"
            trigger={
              <Action onClick={handleAction(MODAL_TYPE.EDIT)}>
                <Icon name="pencil" />
              </Action>
            }
          />

          <Popup
            position="bottom"
            content="Delete"
            trigger={
              <Action onClick={handleAction(MODAL_TYPE.DELETE)}>
                <Icon name="delete" />
              </Action>
            }
          />
        </Space>
      </CanWrite>
    ),
  },
];
