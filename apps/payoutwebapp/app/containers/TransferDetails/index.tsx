import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Loader, Text, Space, Paper } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _size from 'lodash/size';
import _capitalize from 'lodash/capitalize';
import _find from 'lodash/find';

// Constants
import { CURRENCY, REGION, UTR_LABEL } from 'constants/common';
import { BANK_MODES } from 'constants/banks';
import { FORMATS } from 'constants/date';
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { STATUS } from 'containers/AllTransfers/constants';
import { FLAGGED_REASONS, STATUS_MAPPING } from './constants';

// Utils
import getApprovalData from 'utils/getApprovalData';
import Region from 'utils/region';
import { formatAmount } from 'utils/common';

// Services
import { getDetails } from 'services/transfers';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import Copy from 'components/Copy';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import DetailsApprovals from 'components/DetailsApprovals';
import DetailsFormatBlock from 'components/DetailsFormatBlock';
import BlockedReason from './components/BlockedReason';
import ReviewTransfer from './components/ReviewTransfer';
import RiskInsights from './components/RiskInsights';

// Styled
import { BackButtonWrapper, Divider } from 'styled/common';

// Types
import type {
  TransferDetailsProps,
  RiskInsightsProps,
  LocationState,
} from './types';

const TransferDetails: React.FC<TransferDetailsProps> = ({ fundSources }) => {
  const [data, setData] = useState<AnyObject | undefined>(undefined);

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const region = Region.get();

  // @TODO: don't need `original` here
  const { fromBatch, fileType, type, original } =
    location.state as LocationState;

  const fetchTransferDetails = async () => {
    const response = await getDetails(+id!, fileType, fromBatch);
    setData(response);
  };

  useEffect(() => {
    fetchTransferDetails();
  }, []);

  if (!data) {
    return <Loader active />;
  }

  const approvalData = getApprovalData(data.approvals, data.rejections);

  const hasApprovals: boolean = _size(approvalData) > 0;

  const fundSource = _find(fundSources, {
    paymentInstrumentId: data.paymentInstrumentId,
  });

  const currency: CURRENCY = data.currencyCode || data.currency;

  const isRiskyTransfer = type === 'review-transfer';

  const utr: string =
    [STATUS.SUCCESS, STATUS.FAILED, STATUS.REVERSED].includes(data.status) ||
    (data.status === STATUS.PENDING &&
      data.bankStatus === 'SENT_TO_BENEFICIARY')
      ? data.utr
      : '';

  let banner;

  switch (true) {
    case isRiskyTransfer:
      banner = (
        <ReviewTransfer
          original={original}
          transactionData={data}
          referenceId={data.referenceId}
          fetchTransferDetails={fetchTransferDetails}
        />
      );
      break;
  }

  const isTransferFlagged =
    FLAGGED_REASONS.includes(data.bankStatus) && data.detailedDescription;
  const isManuallyAllowedRiskyTransfer =
    isRiskyTransfer &&
    original?.selectedCard === STATUS_MAPPING.MANUALLY_ALLOWED;
  const showBlockedReason = isTransferFlagged || isManuallyAllowedRiskyTransfer;

  return (
    <>
      <PageHeader>
        {LABEL_BY_MENU[MENU.TRANSFERS]} {LABEL_BY_SUBMENU[SUBMENU.DETAILS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_MENU[MENU.TRANSFERS]} ${
          LABEL_BY_SUBMENU[SUBMENU.DETAILS]
        }`}
      />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <Space direction="column" gap={2}>
        {banner}

        {showBlockedReason && (
          <BlockedReason
            detailedDescription={data.detailedDescription}
            status={data.status}
            original={original}
          />
        )}
        {isRiskyTransfer && (
          <RiskInsights
            transferDetails={data as RiskInsightsProps['transferDetails']}
          />
        )}
        <Paper>
          <Space justifyContent="space-between" alignItems="center">
            <div>
              <Text color="bodyLight" className="mb-1">
                Transfer ID
              </Text>
              <Text variant="h16">
                {data.transferId}
                <Copy value={data.transferId} />
              </Text>
            </div>
            <div className="text-right">
              <StatusLabel className="mb-1" filled>
                {data.status}
              </StatusLabel>
              <Text variant="h16">
                {formatAmount(data.amount, currency as CURRENCY)}
              </Text>
            </div>
          </Space>

          <Divider />

          <DetailsFormatBlock
            title="Beneficiary Details"
            renderBy={{
              'Beneficiary ID': data.beneId || '–',
              'Beneficiary Name': data.name || '–',
              [`${data.mode === 'PAYTM' ? 'Paytm' : ''} Phone Number`]:
                data.phone || '–',
              'Email ID': data.email || '–',
              ...(data.vpa ? { 'UPI VPA': data.vpa } : {}),
              ...(data.bankAccount &&
              region === REGION.IN &&
              (BANK_MODES.includes(data.mode) ||
                data.status === STATUS.REJECTED)
                ? {
                    'Account Number': data.bankAccount || '–',
                    IFSC: data.ifsc || '–',
                  }
                : {}),
              ...(region === REGION.AE && data.bankAccount
                ? { IBAN: data.bankAccount }
                : {}),
            }}
          />

          <Divider />

          <DetailsFormatBlock
            title="Transfer Details"
            renderBy={{
              [UTR_LABEL[region]]: utr || '–',
              'Fund Source': _get(fundSource, 'displayName', '–'),
              'CF Reference ID': data.referenceId || '–',
              'Transfer Method': data.mode || '–',
              'Initiated At': data.addedOn
                ? moment(data.addedOn).format(FORMATS.TIMESTAMP)
                : '–',
              'Transfer Acknowledged': data.acknowledged
                ? _capitalize(data.acknowledged)
                : '–',
              [data.status === STATUS.REVERSED
                ? 'Reversed At'
                : 'Processed On']: data.processedOn
                ? moment(data.processedOn).format(FORMATS.TIMESTAMP)
                : '–',
              'Status Description': data.statusDescription || '–',
              Remarks: data.remarks || '–',
              ...(data.bankStatus === 'SENT_TO_BANK'
                ? { 'Bank Status': 'Sent to Bank' }
                : {}),
              ...(data.purposeCode ? { 'Purpose Code': data.purposeCode } : {}),
            }}
          />

          {hasApprovals && (
            <>
              <Divider />
              <DetailsApprovals data={approvalData} />
            </>
          )}
        </Paper>
      </Space>
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withConnect(TransferDetails);
