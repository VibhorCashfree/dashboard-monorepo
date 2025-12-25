import React, { useState } from 'react';
import { Text, Space, EllipsisPopup } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { ACTION_TYPE, ESCROW_PARTY_TYPE } from '../constants';

// Styled
import { PartyRowValue, PartyRow } from '../styled';

// Types
import type { AgreementPartiesProps } from '../types';

const AgreementParties: React.FC<AgreementPartiesProps> = ({
  data,
  index,
  onDelete,
  onEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (e: React.MouseEvent, actionType: ACTION_TYPE): void => {
    e.stopPropagation();
    switch (actionType) {
      case ACTION_TYPE.EDIT:
        onEdit(data);
        return;

      case ACTION_TYPE.DELETE:
        onDelete(data.id);
        return;
    }
  };

  return (
    <>
      <PartyRow>
        <div>
          <Text variant="b12" color="bodyLight">
            {data.type === ESCROW_PARTY_TYPE.BUYER ? 'Buyer ' : 'Seller '}{' '}
            {index + 1}
          </Text>
          <Text variant="b12">{data.name}</Text>
        </div>

        {isOpen ? (
          <div />
        ) : (
          <div>
            <Text variant="b12" color="bodyLight">
              Proportion
            </Text>
            <Text variant="b12">
              {data.allocated_percentage_of_amount / 100}
            </Text>
          </div>
        )}

        <div>
          <Space alignItems="center">
            <EllipsisPopup
              width="9px"
              classname="mb-3"
              data-testid="actions"
              menuItems={[
                {
                  key: 1,
                  text: 'Edit Details',
                  value: ACTION_TYPE.EDIT,
                  image: (props: AnyObject) => (
                    <Icon name="pencil" {...props} />
                  ),
                },
                {
                  key: 2,
                  text: 'Delete',
                  value: ACTION_TYPE.DELETE,
                  image: (props: AnyObject) => (
                    <Icon name="delete" {...props} />
                  ),
                  type: 'danger',
                },
              ]}
              onClick={handleAction}
            />
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </Space>
        </div>
      </PartyRow>

      {isOpen && (
        <>
          <PartyRowValue>
            <div>
              <Text variant="b12" color="bodyLight">
                PAN Number
              </Text>
            </div>
            <div>
              <Text variant="b12" color="bodyLight">
                {data.pan}
              </Text>
            </div>
          </PartyRowValue>
          <PartyRowValue>
            <div>
              <Text variant="b12" color="bodyLight">
                Phone Number
              </Text>
            </div>
            <div>
              <Text variant="b12" color="bodyLight">
                {data.phone}
              </Text>
            </div>
          </PartyRowValue>
          <PartyRowValue>
            <div>
              <Text variant="b12" color="bodyLight">
                Email ID
              </Text>
            </div>
            <div>
              <Text variant="b12" color="bodyLight">
                {data.email}
              </Text>
            </div>
          </PartyRowValue>
          <PartyRowValue>
            <div>
              <Text variant="b12" color="bodyLight">
                Address
              </Text>
            </div>
            <div>
              <Text variant="b12" color="bodyLight">
                {data.address}
              </Text>
            </div>
          </PartyRowValue>
          <PartyRowValue>
            <div>
              <Text variant="b12" color="bodyLight">
                Bank A/c Number
              </Text>
            </div>
            <div>
              <Text variant="b12" color="bodyLight">
                {data.bank_account}
              </Text>
            </div>
          </PartyRowValue>
          <PartyRowValue>
            <div>
              <Text variant="b12" color="bodyLight">
                IFSC
              </Text>
            </div>
            <div>
              <Text variant="b12" color="bodyLight">
                {data.ifsc}
              </Text>
            </div>
          </PartyRowValue>
          <PartyRowValue>
            <div>
              <Text variant="b12" color="bodyLight">
                Proportion
              </Text>
            </div>
            <div>
              <Text variant="b12" color="bodyLight">
                {data.allocated_percentage_of_amount / 100}
              </Text>
            </div>
          </PartyRowValue>
        </>
      )}
    </>
  );
};

export default withErrorBoundary(AgreementParties);
