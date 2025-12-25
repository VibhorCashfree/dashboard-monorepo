import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Image, Paper, Text, Space, Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Constants
import { MENU, PATH_BY_MENU } from 'constants/menuItems';
import { FORMATS } from 'constants/date';

// Components
import Icon from 'components/Icon';
import Copy from 'components/Copy';
import StatusLabel from 'components/StatusLabel';

// Utils
import FundSourcesUtil from 'utils/fundSources';
import Banks from 'utils/banks';
import { formatAmount } from 'utils/common';

// Images
import alertTriangleImg from 'images/alert-triangle.svg';

// Styled
import { DetailsRow, Divider } from 'styled/common';

// Types
import type { ICICIProps } from '../types';

const ICICI: React.FC<ICICIProps> = ({ collectedAmount, to, downtimes }) => {
  const { details, showServiceCharges } = useDetails();

  const downtime = FundSourcesUtil.getDowntime(details.connBankName, downtimes);
  return (
    <>
      <Paper>
        <Space justifyContent="space-between">
          <Space gap={6}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Reference Name
              </Text>
              <Text variant="h16" className="text-ellipsis">
                {details.displayName || '–'}
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Reference ID
                <Popup
                  position="right center"
                  content="Unique identifier for the fund source. You need to use this while making payouts via API and bulk transfers."
                  trigger={
                    <span>
                      <Icon
                        name="info"
                        className="pointer ml-1"
                        verticalAlign="top"
                      />
                    </span>
                  }
                />
              </Text>
              <Text variant="h16">
                {details.paymentInstrumentId}
                <Copy value={details.paymentInstrumentId} />
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Name of Bank
              </Text>
              <Image inline width="60" src={Banks.getIcon(details.ifsc)} />
            </div>
          </Space>
          <Space gap={4}>
            <div className="text-right">
              <StatusLabel className="mb-1" filled>
                {details.status}
              </StatusLabel>
              <br />
              {downtime ? (
                <Popup
                  hoverable
                  content={
                    <Text variant="b12" color="bodyLight">
                      Fund Source down - {downtime.mode} -{' '}
                      <Link
                        to={`/${PATH_BY_MENU[MENU.DOWNTIMES]}`}
                        className="link"
                      >
                        View Details
                      </Link>
                    </Text>
                  }
                  trigger={
                    <Text variant="b12" color="danger">
                      <Image inline src={alertTriangleImg} /> Facing Downtime
                    </Text>
                  }
                />
              ) : null}
            </div>
          </Space>
        </Space>

        <Divider />

        <Text variant="h16" strong className="my-3">
          Fund Source Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Added At</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {moment(details.addedOn).format(FORMATS.TIMESTAMP)}
            </Text>
          </div>
          <div>
            <Text color="bodyLight">Corp. ID</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {_get(details, 'connectDetails.corpId', '–')}
            </Text>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">User ID</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {_get(details, 'connectDetails.bankUserId', '–')}
            </Text>
          </div>
          <div>
            <Text color="bodyLight">Type</Text>
          </div>
          <div>
            <Text className="text-wrap">Bank Account</Text>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Alias</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {_get(details, 'connectDetails.alias', '–')}
            </Text>
          </div>
          <div>
            <Text color="bodyLight">Added By</Text>
          </div>
          <div>
            <Text className="text-wrap">{details.merchantName || '–'}</Text>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">A/c No. and Name</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {details.bankAccount} <br /> ({details.accountHolderName})
            </Text>
          </div>
          <div>
            <Text color="bodyLight">IFSC</Text>
          </div>
          <div>
            <Text className="text-wrap">{details.ifsc || '–'}</Text>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Currency</Text>
          </div>
          <div>
            <Text className="text-wrap">{details.currency || '–'}</Text>
          </div>
          <div>
            <Text color="bodyLight">Remarks</Text>
          </div>
          <div>
            <Text className="text-wrap">{details.fsDescription || '–'}</Text>
          </div>
        </DetailsRow>
      </Paper>

      {showServiceCharges && (
        <Paper className="mt-2" style={{ width: 327 }}>
          <Space
            justifyContent="space-between"
            alignItems="center"
            className="mb-1"
          >
            <Text color="bodyLight">Service Charges Collected</Text>
            <Link className="link" to={to}>
              View All
            </Link>
          </Space>
          <Text variant="h28" className="mb-2">
            {formatAmount(collectedAmount, details.currency)}
          </Text>
          <Text variant="b12" color="bodyLight">
            Total service charges for the transfers made this month
          </Text>
        </Paper>
      )}
    </>
  );
};

const mapStateToProps = ({ downtimes }: { downtimes: AnyObject[] }) => ({
  downtimes,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(ICICI));
