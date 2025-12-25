import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Space, Button, Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { KNOW_MORE } from 'constants/urls';
import { MODAL_TYPES, API_KEYS_COLUMN_ID } from './constants';

// Provider
import { useTour } from 'providers/TourProvider';

// Services
import { getAPIKeys } from 'services/developers';

// Utils
import { emitUserValidation } from 'utils/common';
import getQuery from 'utils/getQuery';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import CanWrite from 'components/CanWrite';
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';
import Modals from './components/Modals';
import JoyrideComponent from 'components/Joyride';
import PaginatedTable from 'components/PaginatedTable';

// Styled
import { Action } from 'styled/common';

const APIKeys = () => {
  const query = getQuery();
  const navigate = useNavigate();
  const { startTour, setRunTour } = useTour();

  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const [modalType, setModalType] = useState();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [tour] = useState(query.get('tour') || false);

  useEffect(() => {
    startTour(
      [
        {
          title: 'Generate API Keys',
          content:
            'It allows you to generate client ID and client secret for API integration. ',
          target: 'button#generate-api',
          disableBeacon: true,
        },
        {
          title: 'Configure authentication ',
          content:
            'Provide a layer of authentication by whitelisting the IP address or generating a public key.',
          target: '.accordion.ui.fluid .content.active div:nth-of-type(2)',
          disableBeacon: true,
        },
        {
          title: '2FA Authentication',
          content: 'Try Two Factor Authentication',
          target: 'redirect',
          disableBeacon: true,
          redirect: '/developers/2fa?tour=true',
        },
      ],
      tour,
    );

    return () => setRunTour(false);
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const data = await getAPIKeys();

      setData(data);
    })();
  }, [fetchCounter]);

  const handleDelete = clientId => {
    if (!clientId) {
      return;
    }

    const filteredAPIKeys = data.activeAPIKeys.filter(
      APIKey => APIKey.clientId !== clientId,
    );

    setData({ ...data, activeAPIKeys: filteredAPIKeys });
  };

  const goToHistoryLog = () => {
    navigate('/developers/api-keys/history-log');
  };

  if (!data) {
    return <Loader />;
  }

  const activeAPIKeys = _get(data, 'activeAPIKeys', []);
  const disabled = activeAPIKeys.length >= 10;

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
                <Action
                  onClick={() => {
                    emitUserValidation(() => {
                      setSelected(tableRow.clientId);
                      setModalType(MODAL_TYPES.DELETE);
                    });
                  }}
                >
                  <Icon name="delete" data-testid="delete-icon" />
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
      <TestEnvironmentAlert />
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="my-2"
      >
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.DEVELOPERS.API_KEYS}
            target="_blank"
            data-event-name="Link"
          >
            Know more
          </a>{' '}
          about API Keys
        </Text>
        <CanWrite code={22004}>
          <div>
            <Button link onClick={goToHistoryLog}>
              View History
            </Button>
            <Button
              id="generate-api"
              primary
              onClick={() =>
                emitUserValidation(() => setModalType(MODAL_TYPES.ADD))
              }
              disabled={disabled}
            >
              Generate API Keys
            </Button>
          </div>
        </CanWrite>
      </Space>
      <div className="mb-2 flex">
        <Text color="bodyLight">
          <strong>{activeAPIKeys.length}/10</strong> API keys generated
        </Text>
      </div>

      <PaginatedTable
        data={activeAPIKeys}
        tableHeading={FORMATTED_COLUMN_ID}
        isPaginated={false}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          handleDelete={handleDelete}
          selected={selected}
        />
      )}

      <JoyrideComponent />
    </>
  );
};

export default withReadPermission(APIKeys, {
  code: 22003,
  description: 'access API Keys',
});
