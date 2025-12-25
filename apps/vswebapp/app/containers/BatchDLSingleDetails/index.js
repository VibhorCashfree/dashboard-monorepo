import React, { useEffect, useState } from 'react';
import { Space, Text, Paper } from '@cashfree-intl/coherent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';
import _find from 'lodash/find';

// Styles
import { BackButtonWrapper, DetailsRow, Divider } from 'styled/common';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Loader from 'components/Loader';

// Services
import { getEntryDetails } from 'services/dl';

const BatchDLSingleDetails = () => {
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

  const temporaryAddress = _find(
    data?.response?.details_of_driving_licence?.address_list,
    { type: 'temporary' },
  );
  const permanentAddress = _find(
    data?.response?.details_of_driving_licence?.address_list,
    { type: 'permanent' },
  );

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
            <Text color="bodyLight">Driving License Number</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.dl_number', '–') || '–'}
          </div>

          <div>
            <Text color="bodyLight">Date of Birth</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.dob', '–') || '–'}
          </div>
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
            <Text color="bodyLight">DL Number</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dl_number', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Date of Birth</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dob', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Class of Vehicle</Text>
          </div>
          <div className="text-wrap">
            {data?.response?.badge_details?.length
              ? _get(
                  data,
                  'response.badge_details[0].class_of_vehicle',
                  '[]',
                ).join(', ')
              : '–'}
          </div>
          <div>
            <Text color="bodyLight">Date of Issue</Text>
          </div>
          <div className="text-wrap">
            {_get(
              data,
              'response.details_of_driving_licence.date_of_issue',
              '–',
            ) || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Full Name</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.details_of_driving_licence.name', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Father’s / Husband’s Name</Text>
          </div>
          <div className="text-wrap">
            {_get(
              data,
              'response.details_of_driving_licence.father_or_husband_name',
              '–',
            )}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Permanent Address</Text>
          </div>
          <div className="text-wrap">
            {_get(permanentAddress, 'complete_address', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Temporary Address</Text>
          </div>
          <div className="text-wrap">
            {_get(temporaryAddress, 'complete_address', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Message</Text>
          </div>
          <div className="text-wrap">
            {message ? _startCase(message.split('_').join(' ')) : '–'}
          </div>
          <div />
          <div />
        </DetailsRow>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Driving License Validity
        </Text>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Non Transport (To)</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dl_validity.non_transport.to', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Non Transport (From)</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dl_validity.non_transport.from', '–') || '–'}
          </div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Transport (To)</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dl_validity.transport.to', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Transport (From)</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dl_validity.transport.from', '–') || '–'}
          </div>
        </DetailsRow>
      </Paper>
    </>
  );
};

export default BatchDLSingleDetails;
