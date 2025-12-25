import React, { useState, useEffect, useContext } from 'react';
import { Tab, Text } from '@cashfree-intl/coherent';
import { useNavigate, useParams } from 'react-router-dom';

// Containers
import AllKycLink from 'containers/AllKycLink';
import BatchKycLink from 'containers/BatchKycLink';

// Constants
import { menuConfig } from 'constants/common';
import { KNOW_MORE } from 'constants/urls';

// Providers
import { ListContext } from 'providers/ListProvider';
import { BatchDetailsContext } from 'providers/BatchDetailsProvider';

const defaultPanes = [
  {
    menuItem: 'All',
    key: 'all',
    render: () => <AllKycLink />,
  },
  {
    menuItem: 'Batch',
    key: 'batch',
    render: () => <BatchKycLink />,
  },
];

const Tabs = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ListContext);
  const {
    state: batchDetailsState,
    dispatch: batchDetailsDispatch,
  } = useContext(BatchDetailsContext);
  const { tabId } = useParams();

  const [activeIndex, setActiveIndex] = useState(() =>
    defaultPanes.findIndex(p => p.key === tabId),
  );

  useEffect(() => {
    batchDetailsDispatch({ type: 'RESET' });
  }, [batchDetailsState]);

  const onTabChange = (e, data) => {
    dispatch({ type: 'RESET', key: defaultPanes[data.activeIndex].key });
    setActiveIndex(data.activeIndex);

    navigate(`/kyc-link/${defaultPanes[data.activeIndex].key}`);
  };

  return (
    <>
      <Text className="my-2" color="bodyLight">
        Create and manage KYC Links here. Send the KYC links to your users via
        email, SMS, or WhatsApp.{' '}
        <a href={KNOW_MORE.FORMS.BATCH} target="_blank" data-event-name="Link">
          Know more
        </a>
      </Text>

      <Tab
        activeIndex={activeIndex}
        menu={menuConfig}
        panes={defaultPanes}
        onTabChange={onTabChange}
      />
    </>
  );
};

export default Tabs;
