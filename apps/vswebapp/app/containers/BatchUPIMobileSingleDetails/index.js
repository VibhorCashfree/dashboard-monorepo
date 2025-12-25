import React, { useEffect, useState } from 'react';
import { Space, Text, Paper } from '@cashfree-intl/coherent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Styles
import { BackButtonWrapper, DetailsRow, Divider } from 'styled/common';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Loader from 'components/Loader';

// Services
import { getEntryDetails } from 'services/upi-mobile';

const BatchUPIMobileSingleDetails = () => {
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
            <Text color="bodyLight">Phone Number</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.mobile_number', '–') || '–'}
          </div>

          <div>
            <Text color="bodyLight">Email ID</Text>
          </div>
          <div>{_get(data, 'request.email', '–') || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Name</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.name', '–') || '–'}
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
            <Text color="bodyLight">Name</Text>
          </div>
          <div>{_get(data, 'response.name_at_bank', '–')}</div>
          <div>
            <Text color="bodyLight">Phone Number</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.mobile_number', '–')}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">UPI VPA</Text>
          </div>
          <div className="text-wrap">{_get(data, 'response.vpa', '–')}</div>
          <div>
            <Text color="bodyLight">Message</Text>
          </div>
          <div className="text-wrap">
            <div className="text-wrap">
              {message ? _startCase(message.split('_').join(' ')) : '–'}
            </div>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Account Status</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.account_status', '–')}
          </div>
          <div />
          <div />
        </DetailsRow>
      </Paper>
    </>
  );
};

export default BatchUPIMobileSingleDetails;
