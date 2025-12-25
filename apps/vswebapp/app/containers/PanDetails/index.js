import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Space, Paper, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Helpers
import { formattedDate } from 'helpers/common';

// Services
import { getDetails } from 'services/PAN';

// Components
import Copy from 'components/Copy';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Loader from 'components/Loader';

// Styled
import { DetailsRow, BackButtonWrapper, Divider, Action } from 'styled/common';

const PANDetails = () => {
  const [data, setData] = useState();

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const rowDetails = _get(location.state, 'rowDetails', {});

  useEffect(() => {
    (async function fetchData() {
      const data = await getDetails(id);
      setData(data);
    })();
  }, []);

  const isPanValid = data?.valid ? 'Yes' : 'No';

  if (!data) {
    return <Loader />;
  }

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
              PAN Ref. ID
            </Text>
            <Text variant="h16">
              <Space gap={1} justifyContent="center" alignItems="center">
                <span>{data?.reference_id}</span>{' '}
                <Action>
                  <Copy value={data?.reference_id} />
                </Action>
              </Space>
            </Text>
          </div>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {rowDetails?.status}
            </StatusLabel>
          </div>
        </Space>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Verification Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">PAN</Text>
          </div>
          <div className="text-wrap">{data.pan || '–'}</div>
          <div>
            <Text color="bodyLight">Name Provided</Text>
          </div>
          <div className="text-wrap">{data.name_provided || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Name Registered</Text>
          </div>
          <div>{data.registered_name || '–'}</div>
          <div>
            <Text color="bodyLight">Valid</Text>
          </div>
          <div className="text-wrap">{isPanValid || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">PAN Type</Text>
          </div>
          <div>{data.type || '–'}</div>
          <div>
            <Text color="bodyLight">Message</Text>
          </div>
          <div>{data.message || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Name Match Score</Text>
          </div>
          <div>{data.name_match_score || '–'}</div>
          <div>
            <Text color="bodyLight">Last updated at</Text>
          </div>
          <div className="text-wrap">
            {formattedDate(data?.last_updated_at) || '-'}
          </div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Name Pan Card</Text>
          </div>
          <div className="text-wrap">{data?.name_pan_card || '–'}</div>
          <div>
            <Text color="bodyLight">Pan Status</Text>
          </div>
          <div className="text-wrap">{data?.pan_status || '-'}</div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Aadhaar Seeding Status</Text>
          </div>
          <div className="text-wrap">{data?.aadhaar_seeding_status || '–'}</div>
          <div>
            <Text color="bodyLight">Aadhaar Seeding Status Description</Text>
          </div>
          <div className="text-wrap">
            {data?.aadhaar_seeding_status_desc || '–'}
          </div>
        </DetailsRow>
      </Paper>
    </>
  );
};

export default PANDetails;
