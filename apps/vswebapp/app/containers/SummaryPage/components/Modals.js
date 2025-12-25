import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Space, Image, Text, Button } from '@cashfree-intl/coherent';

// Actions
import fetchFreeCreditsAction from 'redux/actions/fetchFreeCredits';

// Components
import ProductSelection from './ProductSelection';
import Recharge from './Recharge';

// Images
import gift from 'images/gift.svg';
import credits from 'images/credits.svg';

// Services
import { enableFreeTrial } from 'services/accounts';

const Modals = ({
  modalType,
  setModalType,
  fetchFreeCredits,
  handleCelebration,
}) => {
  const handleClick = async () => {
    const response = await enableFreeTrial();

    if (!response.error && response.VrsFreeTrialEnabled) {
      fetchFreeCredits();
      handleCelebration();
    }
  };

  switch (modalType) {
    case 'PRODUCT_SELECT':
      return <ProductSelection setModalType={setModalType} />;

    case 'FREE_CREDITS':
      return (
        <Modal open $maxWidth="480" className="p-4">
          <Space
            direction="column"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Image src={gift} width={64} height={64} />
            <Text variant="h20">We reward you with free credits</Text>
            <Image src={credits} width={120} height={48} />
            <Text
              variant="b14"
              color="bodyLight"
              style={{ textAlign: 'center' }}
            >
              Explore our suite and test our different verification products in
              real-time with the free credits.{' '}
            </Text>
            <Button primary onClick={handleClick}>
              Lets get started
            </Button>
          </Space>
        </Modal>
      );

    case 'RECHARGE':
      return <Recharge onClose={() => setModalType()} />;

    default:
      return <>Not found</>;
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchFreeCredits: () => dispatch(fetchFreeCreditsAction()),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(Modals);
