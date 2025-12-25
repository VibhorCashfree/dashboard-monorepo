import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Space, Paper, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Components
import Copy from 'components/Copy';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import AddressModal from './components/AddressModal';
import ValidDetails from './components/ValidDetails';
import InvalidDetails from './components/InvalidDetails';
import FailedDetails from './components/FailedDetails';

// Helpers
import { formattedDate } from 'helpers/common';

// Styled
import { DetailsRow, BackButtonWrapper, Divider, Action } from 'styled/common';

const GSTINSingleDetails = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const rowDetails = _get(location.state, 'rowDetails', {});

  const renderDetails = () => {
    switch (rowDetails.status) {
      case 'VALID':
        return (
          <ValidDetails
            data={rowDetails}
            showMoreAddress={() => setOpen(true)}
          />
        );

      case 'INVALID':
        return (
          <InvalidDetails
            cancellationDate={rowDetails.cancellationDate}
            message={rowDetails.message}
          />
        );

      case 'VERIFICATION_FAILED':
        return <FailedDetails message={rowDetails.message} />;
    }
  };

  return (
    <>
      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>
      <Paper>
        <Space justifyContent="space-between">
          <div>
            <Text color="bodyLight" className="mb-1">
              GSTIN Ref. ID
            </Text>
            <Text variant="h16">
              <Space gap={1} justifyContent="center" alignItems="center">
                <span>{rowDetails.id}</span>{' '}
                <Action>
                  <Copy value={rowDetails.id} />
                </Action>
              </Space>
            </Text>
          </div>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {rowDetails.status}
            </StatusLabel>
          </div>
        </Space>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Verification Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Verified At</Text>
          </div>
          <div>{formattedDate(rowDetails.verifiedAt)}</div>
          <div>
            <Text color="bodyLight">GSTIN</Text>
          </div>
          <div className="text-wrap">{rowDetails.GSTIN}</div>
        </DetailsRow>

        {renderDetails()}

        {open && (
          <AddressModal
            gstIn={rowDetails.GSTIN}
            principalAddress={rowDetails.principalPlaceAddress}
            additionalAddresses={rowDetails.additionalAddressArray}
            onClose={() => setOpen(false)}
          />
        )}
      </Paper>
    </>
  );
};

export default GSTINSingleDetails;
