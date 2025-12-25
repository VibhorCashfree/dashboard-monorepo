import React from 'react';
import { Text, Divider } from '@cashfree-intl/coherent';
import moment from 'moment';
import _groupBy from 'lodash/groupBy';

// Utils
import { formatAmount } from 'utils/common';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { PartyRowValue } from '../styled';

// Types
import type { StepThreeProps } from '../types';

const StepThree: React.FC<StepThreeProps> = ({ formObj, parties }) => {
  const { BUYER: buyers = [], SELLER: sellers = [] } = _groupBy(
    parties,
    'type',
  );

  return (
    <>
      <Text variant="h16" className="mt-1">
        Basic Details
      </Text>
      <Divider />
      <PartyRowValue>
        <div>
          <Text variant="b12" color="bodyLight">
            Start Date
          </Text>
        </div>
        <div>
          <Text variant="b12" color="black">
            {moment(formObj.start_date).format('DD MMM YYYY') || '–'}
          </Text>
        </div>
      </PartyRowValue>
      <PartyRowValue>
        <div>
          <Text variant="b12" color="bodyLight">
            End Date
          </Text>
        </div>
        <div>
          <Text variant="b12" color="black">
            {moment(formObj.expiry_date).format('DD MMM YYYY') || '–'}
          </Text>
        </div>
      </PartyRowValue>
      <PartyRowValue>
        <div>
          <Text variant="b12" color="bodyLight">
            Purpose
          </Text>
        </div>
        <div>
          <Text variant="b12" color="black">
            {formObj.purpose}
          </Text>
        </div>
      </PartyRowValue>
      <PartyRowValue>
        <div>
          <Text variant="b12" color="bodyLight">
            Amount
          </Text>
        </div>
        <div>
          <Text variant="b12" color="black">
            {formatAmount(formObj.total_amount)}
          </Text>
        </div>
      </PartyRowValue>
      <Text variant="h16" className="mt-4">
        Escrow Parties <Divider />
      </Text>

      {buyers.map((party, index: number) => (
        <PartyRowValue key={party.name}>
          <div>
            <Text variant="b12" color="bodyLight">
              Buyer {index + 1}
            </Text>
          </div>
          <div>
            <Text variant="b12" color="black">
              {party.name}
            </Text>
          </div>
        </PartyRowValue>
      ))}

      {sellers.map(
        (
          party: {
            name: string;
            type: string;
          },
          index: number,
        ) => (
          <PartyRowValue key={party.name}>
            <div>
              <Text variant="b12" color="bodyLight">
                Seller {index + 1}
              </Text>
            </div>
            <div>
              <Text variant="b12" color="black">
                {party.name}
              </Text>
            </div>
          </PartyRowValue>
        ),
      )}
    </>
  );
};

export default withErrorBoundary(StepThree);
