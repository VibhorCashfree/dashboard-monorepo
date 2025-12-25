import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Space, Paper, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import { formatAmount } from 'utils/common';

// Services
import { getDetails } from 'services/bav';

// Components
import Copy from 'components/Copy';
import StatusLabel from 'components/StatusLabel';
import NameMatchLabel from 'components/NameMatchLabel';
import Loader from 'components/Loader';
import Icon from 'components/Icon';

// Styled
import { DetailsRow, BackButtonWrapper, Divider, Action } from 'styled/common';

const BankAccountDetails = () => {
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
          <Space gap={2}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Verification ID
              </Text>
              <Text variant="h16">
                <Space gap={1} justifyContent="center" alignItems="center">
                  <span>{_get(rowDetails, 'verificationId', '–')}</span>
                  <Action>
                    <Copy value={rowDetails.verificationId} />
                  </Action>
                </Space>
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Name Match Result
              </Text>
              {data.name_match_result !== '-' && data.name_match_score ? (
                <NameMatchLabel
                  score={data.name_match_score}
                  result={data.name_match_result}
                />
              ) : (
                '–'
              )}
            </div>
          </Space>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {rowDetails.account_status}
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
            {_get(rowDetails, 'nameProvided', '–')}
          </div>
          <div>
            <Text color="bodyLight">Phone Number</Text>
          </div>
          <div>{_get(rowDetails, 'phone', '–')}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Bank A/c No.</Text>
          </div>
          <div>{_get(rowDetails, 'bankAccount', '–')}</div>
          <div>
            <Text color="bodyLight">IFSC</Text>
          </div>
          <div>{_get(rowDetails, 'ifsc', '–')}</div>
        </DetailsRow>
        <Divider />
        <Text variant="h16" strong className="my-3">
          Verification Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Name at Bank</Text>
          </div>
          <div>{data.name_at_bank || '–'}</div>
          <div>
            <Text color="bodyLight">Bank Name</Text>
          </div>
          <div>{data.bank_name || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Branch</Text>
          </div>
          <div>{data.branch || '–'}</div>
          <div>
            <Text color="bodyLight">City</Text>
          </div>
          <div>{data.city || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">MICR</Text>
          </div>
          <div>{data.micr || '–'}</div>
          <div>
            <Text color="bodyLight">UTR</Text>
          </div>
          <div>{data.utr || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Account Status</Text>
          </div>
          <div>{_get(data, 'account_status', '–')}</div>
          <div>
            <Text color="bodyLight">Verified At</Text>
          </div>
          <div>{formattedDate(rowDetails.processedOn)}</div>
        </DetailsRow>

        <DetailsRow className="mb-0">
          <div>
            <Text color="bodyLight">Account Status Code</Text>
          </div>
          <div>{_startCase(data.account_status_code) || '–'}</div>
          <div>
            <Text color="bodyLight">Reference Id</Text>
          </div>
          <div>{data.reference_id || '–'}</div>
        </DetailsRow>
      </Paper>
    </>
  );
};

export default BankAccountDetails;
