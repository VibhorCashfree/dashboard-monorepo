import React from 'react';
import { Space, Text, Popup } from '@cashfree-intl/coherent';

// Constants
import { FS_DISPLAY_TYPE, EVENT_TYPE, COLUMN_ID } from './constants';

// Utils
import { formatAmount } from 'utils/common';

// Components
import Icon from 'components/Icon';

// Styled
import { Divider } from 'styled/common';

export const getFormattedRowData = (fundSourceDetails, preferences) => [
  ...COLUMN_ID,
  {
    accessorKey: 'amount',
    header: 'Recharge Amount',
    cell: row => {
      const showInfoIcon =
        fundSourceDetails.fsDisplayType === FS_DISPLAY_TYPE.CREDIT_CARD &&
        row.eventType !== EVENT_TYPE.CC_REGISTER;

      return (
        <>
          {formatAmount(row.amount)}
          {showInfoIcon && (
            <Popup
              position="right center"
              content={
                <div className="p-1" style={{ width: 272 }}>
                  <Space justifyContent="space-between" className="mb-1">
                    <Text variant="b12" color="bodyLight">
                      Recharge Amount
                    </Text>
                    <Text variant="b12" color="bodyLight">
                      {formatAmount(
                        +row.chargedamount +
                          +row.servicecharge +
                          +row.servicetax,
                      )}
                    </Text>
                  </Space>
                  <Space justifyContent="space-between" className="mb-1">
                    <Text variant="b12" color="bodyLight">
                      Service Charge ({preferences.rechargePercentage}%)
                    </Text>
                    <Text variant="b12" color="bodyLight">
                      (-) {formatAmount(row.servicecharge)}
                    </Text>
                  </Space>
                  <Space justifyContent="space-between" className="mb-1">
                    <Text variant="b12" color="bodyLight">
                      18% GST on Service Charge
                    </Text>
                    <Text variant="b12" color="bodyLight">
                      (-) {formatAmount(row.servicetax)}
                    </Text>
                  </Space>
                  <Divider contain className="my-1" />
                  <Space justifyContent="space-between" className="mb-1">
                    <Text variant="b12" color="bodyLight">
                      Final Recharge Amount
                    </Text>
                    <Text variant="b12" color="bodyLight">
                      (-) {formatAmount(row.chargedamount)}
                    </Text>
                  </Space>
                </div>
              }
              trigger={
                <span>
                  <Icon
                    name="info"
                    className="pointer ml-1"
                    verticalAlign="sub"
                  />
                </span>
              }
            />
          )}
        </>
      );
    },
  },
];
