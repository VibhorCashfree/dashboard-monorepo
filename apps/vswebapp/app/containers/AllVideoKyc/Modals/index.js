import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Space,
  Button,
  Animation,
  Icon as CoherentIcon,
  toast,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Styled
import { StyledPreviewModal } from '../styled';

// Constants
import { MODAL_TYPES } from '../constants';
import { defaultReportTypes } from 'containers/Reports/constants';

// Components
import CreateLink from './CreateLink';
import { useNavigate } from 'react-router-dom';

// Helpers
import { formatChannels } from '../helpers';

const Modals = ({ modalType, setModalType, setFetchCounter, role }) => {
  const [modalData, setModalData] = useState({});

  const navigate = useNavigate();

  switch (modalType) {
    case MODAL_TYPES.CREATE_LINK:
      return (
        <CreateLink
          onClose={() => setModalType()}
          setModalData={setModalData}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
        />
      );

    case MODAL_TYPES.LINK_CREATED: {
      const { vkyc_link } = modalData;

      const handleCopy = () => {
        const textToCopy = vkyc_link;
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            toast.success('Link copied.');
          })
          .catch(err => {
            toast.error('Could not copy link: ', err);
          });
      };

      return (
        <StyledPreviewModal style={{ width: '379px' }} open>
          <Space
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="p-3"
            fullWidth
            fullHeight
          >
            <Animation name="success" loop={false} className="mb-2" />
            <Space
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="h20">Verification link created</Text>
              <Text
                variant="p14"
                color="bodyLight"
                style={{ textAlign: 'center' }}
              >
                Link has been sent to your customer via{' '}
                {formatChannels(modalData.notification_types)}.
              </Text>
            </Space>
            <Space direction="row" alignItems="center" gap={2}>
              <Button
                onClick={() => window.open(vkyc_link, '_blank').focus()}
                link
                style={{ width: '180px', textOverflow: 'ellipsis' }}
              >
                {vkyc_link}
              </Button>
              <CoherentIcon
                name="copy"
                className="pointer"
                onClick={handleCopy}
              />
            </Space>
            <Space direction="row" gap={2} className="mt-4">
              <Button
                primary
                onClick={() => {
                  setModalType(); // Close the modal
                  setFetchCounter(prev => prev + 1); // Refresh data
                }}
              >
                Close
              </Button>
            </Space>
          </Space>
        </StyledPreviewModal>
      );
    }
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
};

export default Modals;
