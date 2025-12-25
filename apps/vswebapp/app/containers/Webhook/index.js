import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text, Space, Popup, Button } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import { getAPIKeys, getWebhook } from 'services/developers';

// Constants
import { KNOW_MORE } from 'constants/urls';
import { MODAL_TYPES, API_KEYS_COLUMN_ID } from './constants';

// Components
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import CanWrite from 'components/CanWrite';
import Modals from './components/Modals';
import PaginatedTable from 'components/PaginatedTable';

// Styled
import { Action, BtnContainer } from 'styled/common';

const Webhook = () => {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const [modalType, setModalType] = useState();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [isAPIKeyValid, setIsAPIKeyValid] = useState(false);

  useEffect(() => {
    (async function validateAPIKeys() {
      const apiKeyResponse = await getAPIKeys();
      const activeAPIKeys = _get(apiKeyResponse, 'activeAPIKeys', []);
      setIsAPIKeyValid(activeAPIKeys.length > 0);
    })();
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const data = await getWebhook();
      setData(data);
    })();
  }, [fetchCounter]);

  const handleClose = () => {
    setSelected();
    setModalType();
  };

  const handleDelete = () => {
    setData({ ...data, webhookUrl: '0' });
  };

  if (!data) {
    return <Loader />;
  }

  const webhookUrl = _get(data, 'webhookUrl', '');
  const noWebhookUrl = webhookUrl === '0';

  const FORMATTED_COLUMN_ID = [
    ...API_KEYS_COLUMN_ID,
    {
      accessorKey: 'actions',
      header: 'Actions',
      ellipsis: true,
      width: 1,
      cell: () => (
        <CanWrite code={22005} remove>
          <Space gap={4} justifyContent="flex-end" className="pr-2">
            <Popup
              position="bottom"
              content="Test"
              trigger={
                <Action
                  onClick={() => {
                    setSelected(webhookUrl);
                    setModalType(MODAL_TYPES.TEST);
                  }}
                >
                  <Icon name="test" />
                </Action>
              }
            />

            <Popup
              position="bottom"
              content="Edit"
              trigger={
                <Action
                  onClick={() => {
                    setSelected(webhookUrl);
                    setModalType(MODAL_TYPES.EDIT);
                  }}
                >
                  <Icon name="pencil" />
                </Action>
              }
            />

            <Popup
              position="bottom"
              content="Delete"
              trigger={
                <Action
                  onClick={() => {
                    setSelected(webhookUrl);
                    setModalType(MODAL_TYPES.DELETE);
                  }}
                >
                  <Icon name="delete" />
                </Action>
              }
            />
          </Space>
        </CanWrite>
      ),
    },
  ];

  return (
    <>
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mt-3"
      >
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.DEVELOPERS.WEBHOOKS}
            target="_blank"
            data-event-name="Link"
          >
            Know more
          </a>{' '}
          about Webhook
        </Text>
        <CanWrite code={22005}>
          <BtnContainer className="mt-0">
            <Button
              primary
              data-event-name="Primary_Button"
              onClick={() => setModalType(MODAL_TYPES.ADD)}
              disabled={!noWebhookUrl || !isAPIKeyValid}
            >
              Add Webhook URL
            </Button>
          </BtnContainer>
        </CanWrite>
      </Space>
      <CanWrite code={22005}>
        <Space direction="column" gap={1} className="mb-3">
          <Text variant="b12" color="placeholder" className="text-right">
            Only one webhook URL can be added at a time.
          </Text>
          {!isAPIKeyValid && (
            <Text variant="b12" color="bodyLight" className="text-right">
              Before adding a webhook, please ensure that{' '}
              <Link
                to="/developers/api-keys"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                API Keys
              </Link>{' '}
              have been generated.
            </Text>
          )}
        </Space>
      </CanWrite>

      <PaginatedTable
        data={noWebhookUrl ? [] : [webhookUrl]}
        tableHeading={FORMATTED_COLUMN_ID}
        isPaginated={false}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setFetchCounter={setFetchCounter}
          handleClose={handleClose}
          handleDelete={handleDelete}
          selected={selected}
        />
      )}
    </>
  );
};

export default Webhook;
