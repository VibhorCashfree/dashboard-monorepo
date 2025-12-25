import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Space, Button, Animation } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Styled
import { StyledPreviewModal } from '../styled';

// Constants
import { MODAL_TYPES } from '../constants';
import { defaultReportTypes } from 'containers/Reports/constants';

// Components
import CreateRole from './CreateRole';
import GenerateReportModal from 'containers/Reports/components/GenerateReportModal';
import { useNavigate } from 'react-router-dom';

const Modals = ({ modalType, setModalType, setFetchCounter, role }) => {
  const [modalData, setModalData] = useState();
  const [reportType, setReportType] = useState(defaultReportTypes[0]);

  const navigate = useNavigate();

  const handleReportSubmit = () => {
    navigate('/reports');
  };

  switch (modalType) {
    case MODAL_TYPES.CREATE_ROLE:
      return (
        <CreateRole
          onClose={() => setModalType()}
          role={modalData?.role || role}
          setModalData={setModalData}
          setModalType={setModalType}
        />
      );

    case MODAL_TYPES.ROLE_CREATED: {
      const { role } = modalData;

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
              <Text variant="h20">{`${_startCase(
                role.toLowerCase(),
              )} added successfully`}</Text>
              <Text
                variant="p14"
                color="bodyLight"
                style={{ textAlign: 'center' }}
              >
                An email has been sent to the {role.toLowerCase()} with steps to
                login and access the portal.
              </Text>
            </Space>
            <Space direction="row" gap={2} className="mt-4">
              <Button
                secondary
                onClick={() => {
                  setModalType(MODAL_TYPES.CREATE_ROLE); // Open CREATE_ROLE modal
                  setModalData({ role }); // Pre-select the role
                }}
              >
                Add Another {_startCase(role.toLowerCase())}
              </Button>
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

    case MODAL_TYPES.GENERATE_REPORT: {
      return (
        <GenerateReportModal
          reportType={reportType}
          setReportType={setReportType}
          onClose={() => setModalType()}
          onSubmit={handleReportSubmit}
        />
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
