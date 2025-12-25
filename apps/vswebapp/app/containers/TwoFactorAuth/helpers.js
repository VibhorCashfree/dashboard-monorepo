import React from 'react';
import { Button, Space, Text, Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { KNOW_MORE } from 'constants/urls';
import {
  MODAL_TYPES,
  API_KEYS_COLUMN_ID,
  API_KEYS_COLUMN_ID_PUBLIC_KEY,
} from './constants';

// Components
import CanWrite from 'components/CanWrite';
import Icon from 'components/Icon';
import PaginatedTable from 'components/PaginatedTable';

// Styled
import { Action } from 'styled/common';

export const render2FATable = (
  isIP,
  filtereMerchantIPs,
  handleIPDelete,
  data,
  handlePublicKeyDelete,
  loading,
) => {
  const FORMATTED_COLUMN_ID = [
    ...API_KEYS_COLUMN_ID,
    {
      accessorKey: 'actions',
      header: 'Actions',
      ellipsis: true,
      width: 10,
      cell: tableRow => (
        <CanWrite code={22004} remove>
          <Space>
            <Popup
              position="bottom"
              content="Delete"
              trigger={
                <Action onClick={handleIPDelete(tableRow.merchantIP)}>
                  <Icon name="delete" />
                </Action>
              }
            />
          </Space>
        </CanWrite>
      ),
    },
  ];

  const FORMATTED_COLUMN_ID_PUBLIC_KEY = [
    ...API_KEYS_COLUMN_ID_PUBLIC_KEY,
    {
      accessorKey: 'actions',
      header: 'Actions',
      ellipsis: true,
      width: 10,
      cell: () => (
        <CanWrite code={22002}>
          <Space justifyContent="flex-end" className="pr-2">
            <Popup
              position="bottom"
              content="Delete"
              trigger={
                <Action onClick={handlePublicKeyDelete}>
                  <Icon name="delete" />
                </Action>
              }
            />
          </Space>
        </CanWrite>
      ),
    },
  ];

  if (isIP) {
    return (
      <>
        <PaginatedTable
          data={filtereMerchantIPs}
          tableHeading={FORMATTED_COLUMN_ID}
          isPaginated={false}
          fetching={loading}
        />
      </>
    );
  }

  return (
    <PaginatedTable
      data={data.keyExists === 'YES' ? [data] : []}
      tableHeading={FORMATTED_COLUMN_ID_PUBLIC_KEY}
      isPaginated={false}
      fetching={loading}
    />
  );
};

export const renderKnowMore = isIP => {
  if (isIP) {
    return (
      <Text className="my-2" color="bodyLight">
        <a
          href={KNOW_MORE.DEVELOPERS['2FA']}
          target="_blank"
          data-event-name="Link_ip_whitelist"
        >
          Know more
        </a>{' '}
        about IP Whitelist
      </Text>
    );
  }

  return (
    <Text className="my-2" color="bodyLight">
      <a
        href={KNOW_MORE.DEVELOPERS['2FA']}
        target="_blank"
        data-event-name="Link_public_key"
      >
        Know more
      </a>{' '}
      about Public Key
    </Text>
  );
};

export const renderCTA = (isIP, ipDisabled, publicKeyDisabled, handleClick) => {
  if (isIP) {
    return (
      <Popup
        position="top center"
        content={'Only 25 IP’s can be whitelisted.'}
        disabled={!ipDisabled}
        trigger={
          <span>
            <Button
              primary
              disabled={ipDisabled}
              onClick={() => handleClick(MODAL_TYPES.ADD)}
              id="ip-address"
            >
              Add IP Address
            </Button>
          </span>
        }
      />
    );
  }

  return (
    <>
      <Popup
        position="top center"
        content="Maximum 1 public key can be generated."
        disabled={!publicKeyDisabled}
        trigger={
          <span>
            <Button
              primary
              data-event-name="Primary_Button"
              onClick={() => handleClick(MODAL_TYPES.GENERATE)}
              disabled={publicKeyDisabled}
            >
              Generate Public Key
            </Button>
          </span>
        }
      />
    </>
  );
};
