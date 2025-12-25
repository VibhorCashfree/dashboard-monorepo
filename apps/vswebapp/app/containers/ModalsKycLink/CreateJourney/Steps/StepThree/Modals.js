import React from 'react';
import { ConfirmModal, Text, Space } from '@cashfree-intl/coherent';
import PropTypes from 'prop-types';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import AddNewBlock from './AddNewBlock';
import AddNewCondition from './AddNewCondition';
import PreviewJourney from './PreviewJourney';

// Store
import useStore from '../../store';

const Modals = ({
  modalType,
  setModalType,
  screen,
  blockId,
  colorValues,
  logoImage,
}) => {
  const { onRemoveScreen } = useStore(state => ({
    onRemoveScreen: state.onRemoveScreen,
  }));

  switch (modalType) {
    case MODAL_TYPES.ADD_NEW_BLOCK:
      return (
        <AddNewBlock
          onClose={() => setModalType()}
          screen={screen}
          blockId={blockId}
        />
      );

    case MODAL_TYPES.ADD_NEW_CONDITION:
      return (
        <AddNewCondition
          onClose={() => setModalType()}
          screen={screen}
          blockId={blockId}
        />
      );

    case MODAL_TYPES.PREVIEW_JOURNEY:
      return (
        <PreviewJourney
          onClose={() => setModalType()}
          colorValues={colorValues}
          logoImage={logoImage}
        />
      );

    case MODAL_TYPES.DELETE_SCREEN:
      return (
        <ConfirmModal
          danger
          title="Delete Screen Block"
          confirmText="Delete"
          onClose={() => setModalType()}
          onConfirm={() => {
            onRemoveScreen(screen);
            setModalType();
          }}
        >
          <Space direction="column" gap={1}>
            <Text variant="h16" strong>
              Are you sure you want to delete "Screen {screen}" ?
            </Text>
          </Space>
        </ConfirmModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
