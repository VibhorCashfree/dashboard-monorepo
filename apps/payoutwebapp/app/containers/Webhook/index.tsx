import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Icon,
  Loader,
  Text,
  Space,
  Button,
  DataTable,
} from '@cashfree-intl/coherent';
import _keyBy from 'lodash/keyBy';
import _get from 'lodash/get';

// Services
import {
  getWebhook,
  getWebhookVersions,
  getAPIKeys,
} from 'services/developers';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Constants
import { KNOW_MORE } from 'constants/urls';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { MODAL_TYPE } from './constants';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import CanWrite from 'components/CanWrite';
import Alert from 'components/Alert';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { WebhookData } from './types';

const Webhook: React.FC = () => {
  const { preferences } = useAccount();

  const [data, setData] = useState<WebhookData | undefined>(undefined);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [selectedVersion, setSelectedVersion] = useState<string>(
    preferences.webhookVersion,
  );
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [isAPIKeyValid, setIsAPIKeyValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      const [webhookResponse, versionsResponse, apiKeysResponse] =
        await Promise.all([getWebhook(), getWebhookVersions(), getAPIKeys({})]);

      setLoading(true);

      const activeAPIKeys = _get(apiKeysResponse, 'activeAPIKeys', []);
      setIsAPIKeyValid(activeAPIKeys.length > 0);

      if (!('error' in webhookResponse || 'error' in versionsResponse)) {
        setData({
          webhook: webhookResponse,
          versions: _keyBy(versionsResponse.entries, 'releaseDate'),
        });
      }

      setLoading(false);
    })();
  }, [fetchCounter]);

  const handleClose = (): void => {
    setSelected(undefined);
    setModalType(MODAL_TYPE.EMPTY);
  };

  const handleDelete = (): void => {
    setData((prev) => ({
      ...prev!,
      webhook: { ...prev!.webhook, webhookUrl: '0' },
    }));
  };

  const webhookUrl: string = _get(data, 'webhook.webhookUrl', '');

  const handleAction = (modalType: MODAL_TYPE) => (): void => {
    setSelected(webhookUrl);
    setModalType(modalType);
  };

  if (loading || !data) {
    return <Loader active page={false} />;
  }

  const noWebhookUrl: boolean = webhookUrl === '0';

  const webhookDisabled = !isAPIKeyValid || !noWebhookUrl;

  return (
    <>
      <PageHeader embedKey="DEVELOPERS">
        {LABEL_BY_SUBMENU[SUBMENU.WEBHOOKS]}
      </PageHeader>
      <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.WEBHOOKS]} />

      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mt-3"
      >
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.DEVELOPERS.WEBHOOKS}
            target="_blank"
            rel="noopener noreferrer"
            data-event-name="Link"
          >
            Know more
          </a>{' '}
          about Webhook
        </Text>
        <CanWrite code={22005}>
          {!isAPIKeyValid && (
            <Alert className="mb-1" type="info" bordered rounded>
              <Alert.Content size="md">
                To add a webhook, please ensure that{' '}
                <Link
                  to={`${PATH_BY_MENU[MENU.DEVELOPERS]}/${
                    PATH_BY_SUBMENU[SUBMENU.API_KEYS]
                  }`}
                  className="link"
                >
                  API keys
                </Link>{' '}
                are generated beforehand.
              </Alert.Content>
            </Alert>
          )}

          <BtnContainer className="mt-0">
            <Button
              data-event-name="Primary_Button"
              primary
              onClick={() => setModalType(MODAL_TYPE.ADD)}
              disabled={webhookDisabled}
            >
              Add Webhook URL
            </Button>
          </BtnContainer>
        </CanWrite>
      </Space>
      <CanWrite code={22005}>
        <Text variant="b12" color="placeholder" className="text-right mb-3">
          Only one webhook URL can be added at a time.
        </Text>
      </CanWrite>

      <DataTable
        columns={getFormattedRowData(
          selectedVersion,
          data.versions,
          handleAction,
        )}
        records={noWebhookUrl ? [] : [{ url: webhookUrl }]}
        noRecords={{
          text: 'No data found!',
          icon: <Icon name="noRecordsTableIcon" />,
        }}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setFetchCounter={setFetchCounter}
          handleClose={handleClose}
          handleDelete={handleDelete}
          selected={selected}
          versions={data.versions}
          setSelectedVersion={setSelectedVersion}
        />
      )}
    </>
  );
};

export default Webhook;
