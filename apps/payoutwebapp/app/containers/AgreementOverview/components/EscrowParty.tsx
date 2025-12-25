import React, { useState } from 'react';
import { Text } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { ESCROW_PARTY_TYPE } from 'containers/AllAgreements/constants';

// Styled
import { EscrowRow } from 'containers/AllAgreements/styled';

// Types
import type { EscrowPartyProps } from '../types';

const EscrowParty: React.FC<EscrowPartyProps> = ({ data, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EscrowRow>
        <div>
          <Text color="bodyLight">
            {data.type === ESCROW_PARTY_TYPE.BUYER ? 'Buyer ' : 'Seller '}
            {index + 1}
          </Text>
        </div>
        <div>
          <Text className="text-wrap">{data.name}</Text>
        </div>
        <div>
          <Text
            color="bodyLight"
            className="mb-1"
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          >
            <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
          </Text>
        </div>
      </EscrowRow>

      {isOpen && (
        <>
          <EscrowRow>
            <div>
              <Text color="bodyLight">PAN Number</Text>
            </div>
            <div>
              <Text color="bodyLight">{data.pan}</Text>
            </div>
            <div />
          </EscrowRow>
          <EscrowRow>
            <div>
              <Text color="bodyLight">Phone Number</Text>
            </div>
            <div>
              <Text color="bodyLight">{data.phone}</Text>
            </div>
            <div />
          </EscrowRow>
          <EscrowRow>
            <div>
              <Text color="bodyLight">Email ID</Text>
            </div>
            <div>
              <Text color="bodyLight">{data.email}</Text>
            </div>
            <div />
          </EscrowRow>
          <EscrowRow>
            <div>
              <Text color="bodyLight">Address</Text>
            </div>
            <div>
              <Text color="bodyLight">{data.address}</Text>
            </div>
            <div />
          </EscrowRow>
          <EscrowRow>
            <div>
              <Text color="bodyLight">Bank A/c Number</Text>
            </div>
            <div>
              <Text color="bodyLight">{data.bank_account}</Text>
            </div>
            <div />
          </EscrowRow>
          <EscrowRow>
            <div>
              <Text color="bodyLight">IFSC</Text>
            </div>
            <div>
              <Text color="bodyLight">{data.ifsc}</Text>
            </div>
            <div />
          </EscrowRow>
        </>
      )}
    </>
  );
};

export default withErrorBoundary(EscrowParty);
