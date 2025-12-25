import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import {
  Grid,
  Row,
  Column,
  Loader,
  Image,
  Paper,
  Space,
  Text,
} from '@cashfree-intl/coherent';
import _startCase from 'lodash/startCase';
import _size from 'lodash/size';

// Helpers
import getAlertIcon from 'utils/getAlertIcon';
import getApprovalData from 'utils/getApprovalData';

// Constants
import { FORMATS } from 'constants/date';
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { STATUS } from 'containers/AllCashgrams/constants';

// Components
import Copy from 'components/Copy';
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import StatusLabel from 'components/StatusLabel';
import DetailsApprovals from 'components/DetailsApprovals';
import Icon from 'components/Icon';

// Services
import { getDetails } from 'services/cashgrams';

// Utils
import { formatAmount } from 'utils/common';

// Styled
import { DetailsRow, BackButtonWrapper, Divider } from 'styled/common';

// Types
import type { DataState, LocationState } from './types';

const CashgramDetails = () => {
  const [data, setData] = useState<DataState | undefined>(undefined);

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { rowDetails, fromBatch } = location.state as LocationState;

  useEffect(() => {
    (async function fetchData() {
      if (!id) {
        return;
      }

      const response = await getDetails(+id, fromBatch);

      if (!('error' in response)) {
        setData(response);
      }
    })();
  }, []);

  if (!data) {
    return <Loader active />;
  }

  const approvalData = getApprovalData(data.approvals, data.rejections);

  const hasApprovals = _size(approvalData) > 0;

  const verifierType = data.verificationDetails.status ? 'success' : 'danger';

  return (
    <>
      <PageHeader>
        {LABEL_BY_MENU[MENU.CASHGRAMS]} {LABEL_BY_SUBMENU[SUBMENU.DETAILS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_MENU[MENU.CASHGRAMS]} ${
          LABEL_BY_SUBMENU[SUBMENU.DETAILS]
        }`}
      />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <Paper>
        <Space justifyContent="space-between" alignItems="center">
          <div>
            <Text color="bodyLight" className="mb-1">
              Cashgram ID
            </Text>
            <Text variant="h16">
              {rowDetails.cashgramId}
              <Copy value={rowDetails.cashgramId} />
            </Text>
          </div>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {data.status}
            </StatusLabel>
            {rowDetails.amount ? (
              <Text variant="h16">{formatAmount(rowDetails.amount)}</Text>
            ) : null}
          </div>
        </Space>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Beneficiary Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Beneficiary Name</Text>
          </div>
          <div>
            <Text className="text-wrap">{data.beneficiary.name || '–'}</Text>
          </div>
          <div>
            <Text color="bodyLight">Phone Number</Text>
          </div>
          <div>
            <Text className="text-wrap">{data.beneficiary.phone || '–'}</Text>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Email ID</Text>
          </div>
          <div>
            <Text className="text-wrap">{data.beneficiary.email || '–'}</Text>
          </div>
          <div />
          <div />
        </DetailsRow>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Cashgram Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Type</Text>
          </div>
          <div>
            <Text>{data.type || '–'}</Text>
          </div>
          <div>
            <Text color="bodyLight">Description</Text>
          </div>
          <div>
            <Text className="text-wrap">{data.description || '–'}</Text>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Created At</Text>
          </div>
          <div>
            <Text>
              {data.createdAt
                ? moment(data.createdAt).format(FORMATS.TIMESTAMP)
                : '–'}
            </Text>
          </div>
          <div>
            <Text color="bodyLight">Status Description</Text>
          </div>
          <div>
            <Text className="text-wrap">{_startCase(data.reason) || '–'}</Text>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Valid Till</Text>
          </div>
          <div>
            <Text>
              {data.validTill
                ? moment(data.validTill).format(FORMATS.TIMESTAMP)
                : '–'}
            </Text>
          </div>
          <div>
            <Text color="bodyLight">Cashgram Link</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {data.link ? (
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                  {data.link}
                </a>
              ) : (
                '–'
              )}
            </Text>
          </div>
        </DetailsRow>

        <DetailsRow className="mb-0">
          <div>
            <Text color="bodyLight">Added By</Text>
          </div>
          <div>
            <Text className="text-wrap">{data.addedBy.name || '–'}</Text>
          </div>
          <div>
            <Text color="bodyLight">Source</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {_startCase(data.addedBy.source) || '–'}
            </Text>
          </div>
        </DetailsRow>

        {data.status === STATUS.REDEEMED && (
          <>
            <Divider />
            <Text variant="h16" strong className="my-3">
              Redemption Details
            </Text>

            <DetailsRow>
              <div>
                <Text color="bodyLight">Redeemed At</Text>
              </div>
              <div>
                <Text>
                  {moment(data.redemption.redeemedAt).format(FORMATS.TIMESTAMP)}
                </Text>
              </div>
              <div>
                <Text color="bodyLight">Transfer Method</Text>
              </div>
              <div>
                <Text className="text-wrap">
                  {data.redemption.transferMethod || '–'}
                </Text>
              </div>
            </DetailsRow>

            <DetailsRow>
              <div>
                <Text color="bodyLight">Account Holder</Text>
              </div>
              <div>
                <Text className="text-wrap">
                  {data.redemption.accountHolder || '–'}
                </Text>
              </div>
              <div>
                <Text color="bodyLight">UTR No.</Text>
              </div>
              <div>
                <Text className="text-wrap">{data.redemption.utr || '–'}</Text>
              </div>
            </DetailsRow>

            <DetailsRow>
              <div>
                <Text color="bodyLight">Account Number</Text>
              </div>
              <div>
                <Text className="text-wrap">
                  {data.redemption.accountNumber || '–'}
                </Text>
              </div>
              <div>
                <Text color="bodyLight">IFSC</Text>
              </div>
              <div>
                <Text className="text-wrap">{data.redemption.ifsc || '–'}</Text>
              </div>
            </DetailsRow>

            <DetailsRow className="mb-0">
              <div>
                <Text color="bodyLight">VPA</Text>
              </div>
              <div>
                <Text>{data.redemption.vpa || '–'}</Text>
              </div>
              <div />
              <div />
            </DetailsRow>
          </>
        )}

        {hasApprovals && (
          <>
            <Divider />
            <DetailsApprovals data={approvalData} />
          </>
        )}

        {data.verificationDetails.name ? (
          <>
            <Divider />
            <Text variant="h16" strong className="my-3">
              Verified By
            </Text>

            <Grid>
              <Row>
                <Column width={3}>
                  <Text color="bodyLight">Verifier</Text>
                </Column>
                <Column width={4}>
                  {data.verificationDetails.name}
                  <Image
                    inline
                    className="ml-1"
                    src={getAlertIcon(verifierType, 'sm')}
                  />
                  <br />
                  <Text color="bodyLight">
                    {moment(data.verificationDetails.date).format(
                      FORMATS.TIMESTAMP,
                    )}
                  </Text>
                </Column>
              </Row>
            </Grid>
          </>
        ) : null}
      </Paper>
    </>
  );
};

export default CashgramDetails;
