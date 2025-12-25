import React, { useEffect, useState } from 'react';
import { Space, Text, Paper } from '@cashfree-intl/coherent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';

// Styles
import { BackButtonWrapper, DetailsRow, Divider } from 'styled/common';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Loader from 'components/Loader';

// Services
import { getEntryDetails } from 'services/pan-lite';

const BatchPANLiteSingleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const { fileId, referenceId } = useParams();
  const recordStatus = _get(location.state, 'row.status', {});
  const message = _get(location.state, 'row.message', '–');

  useEffect(() => {
    (async function fetchData() {
      const data = await getEntryDetails(fileId, referenceId);
      setData(data);
    })();
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Space justifyContent="space-between" className="mb-3">
        <BackButtonWrapper onClick={() => navigate(-1)}>
          <Icon name="chevron-left" />

          <Text as="a" className="link ml-1">
            Back
          </Text>
        </BackButtonWrapper>
      </Space>

      <Paper>
        <Space justifyContent="space-between">
          <Space gap={3}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Verification ID
              </Text>

              <Text variant="h16">
                <Space gap={1} justifyContent="center" alignItems="center">
                  <span>{_get(data, 'request.verification_id', '–')}</span>
                </Space>
              </Text>
            </div>

            <div>
              <Text color="bodyLight" className="mb-1">
                Reference ID
              </Text>
              <Text variant="h16">
                <Space gap={1} justifyContent="center" alignItems="center">
                  <span>{_get(data, 'response.reference_id', '–')}</span>
                </Space>
              </Text>
            </div>
          </Space>

          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {recordStatus}
            </StatusLabel>
          </div>
        </Space>

        <Divider />

        <Text variant="h16" strong className="my-3">
          Details Provided
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Name Provided</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.name', '–') || '–'}
          </div>

          <div>
            <Text color="bodyLight">PAN</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.pan', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Date of Birth</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.dob', '–') || '–'}
          </div>

          <div />
          <div />
        </DetailsRow>

        <Divider />

        <Text variant="h16" strong className="my-3">
          Response
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Status</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.status') ? (
              <StatusLabel className="mb-1" filled>
                {_get(data, 'response.status', '–') || '–'}
              </StatusLabel>
            ) : (
              '–'
            )}
          </div>
          <div />
          <div />
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Name</Text>
          </div>
          <div>{_get(data, 'response.name', '–') || '–'}</div>
          <div>
            <Text color="bodyLight">Name Match</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.name_match')
              ? _get(data, 'response.name_match') === 'Y'
                ? 'Yes'
                : 'No'
              : '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Date of Birth</Text>
          </div>
          <div>{_get(data, 'response.dob', '–') || '–'}</div>
          <div>
            <Text color="bodyLight">Date of Birth Match</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dob_match')
              ? _get(data, 'response.dob_match') === 'Y'
                ? 'Yes'
                : 'No'
              : '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">PAN Status</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.pan_status', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Aadhaar Seeding Status</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.aadhaar_seeding_status', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Aadhaar Seeding Description</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.aadhaar_seeding_status_desc', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Message</Text>
          </div>
          <div className="text-wrap">
            {message ? _startCase(message.split('_').join(' ')) : '–'}
          </div>
        </DetailsRow>
      </Paper>
    </>
  );
};

export default BatchPANLiteSingleDetails;
