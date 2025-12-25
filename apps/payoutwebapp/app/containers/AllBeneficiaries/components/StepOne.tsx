import React from 'react';
import {
  Grid,
  Column,
  Form,
  Popup,
  Text,
  Dropdown,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Constants
import { REGION, PHONE_MAX_LENGTH } from 'constants/common';

// Components
import Icon from 'components/Icon';
import PhoneLabeledInput from 'components/PhoneLabeledInput';
import RegionBasedRenderer from 'components/RegionBasedRenderer';

// Utils
import Region from 'utils/region';
import { digitOnlyKeys } from 'utils/common';
import { getBenePurposeOptions } from '../utils';

// Types
import type { StepOneProps } from '../types';

const StepOne: React.FC<StepOneProps> = ({ formObj, errorObj, onChange }) => {
  const { preferences } = useAccount();

  const benePurposeOptions = getBenePurposeOptions(
    preferences.beneficiaries.purpose,
  );

  const region: string = Region.get();
  const phoneMaxLen: number = PHONE_MAX_LENGTH[region];

  return (
    <>
      <Text variant="h16" className="mb-2">
        General Details
      </Text>
      <Form.Input
        fluid
        data-testid="bene-id"
        name="beneId"
        label="Beneficiary ID"
        className="m-0"
        error={errorObj.beneId}
        value={formObj.beneId}
        onChange={onChange}
      />
      <Text color="bodyLight" className="mt-2 mb-1" strong>
        Beneficiary Purpose{' '}
        <RegionBasedRenderer regions={[REGION.IN]}>
          <Popup
            position="right center"
            content="Choose how you want to send money to the beneficiary. We require the KYC information of the beneficiary for verification when you opt for Corporate Credit Card."
            trigger={
              <span>
                <Icon name="info" className="pointer" verticalAlign="top" />
              </span>
            }
          />
        </RegionBasedRenderer>
      </Text>
      <Dropdown
        selection
        fluid
        className="mb-3"
        data-testid="bene-purpose"
        name="benePurpose"
        placeholder="Select Beneficiary Purpose"
        options={benePurposeOptions}
        error={errorObj.benePurpose}
        value={formObj.benePurpose}
        onChange={onChange}
      />
      <Form.Input
        fluid
        data-testid="name"
        name="name"
        label="Name"
        error={errorObj.name}
        value={formObj.name}
        onChange={onChange}
      />
      <Form.Field>
        <Grid columns="equal">
          <Column>
            <Text color="bodyLight" className="mb-1">
              Phone Number
            </Text>
            <Form.Field
              fluid
              data-testid="phone"
              name="phone"
              type="text"
              className="m-0"
              maxLength={phoneMaxLen}
              control={PhoneLabeledInput}
              error={errorObj.phone}
              value={formObj.phone}
              onChange={onChange}
              onKeyDown={digitOnlyKeys}
            />
            <RegionBasedRenderer regions={[REGION.IN]}>
              <Text variant="b12" color="bodyLight" className="mt-1">
                Amazon Pay transfers will be made to this phone number.
              </Text>
            </RegionBasedRenderer>
          </Column>
          <Column>
            <Form.Input
              fluid
              data-testid="email"
              name="email"
              label="Email ID"
              error={errorObj.email}
              value={formObj.email}
              onChange={onChange}
            />
          </Column>
        </Grid>
      </Form.Field>
      <Form.TextArea
        data-testid="address1"
        name="address1"
        label="Address"
        className="m-0"
        maxLength={150}
        placeholder="House No, Building, street, city, state, pincode"
        value={formObj.address1}
        error={errorObj.address1}
        onChange={onChange}
      />
      <Text variant="b12" color="bodyLight" as="p" className="mt-1">
        Maximum 150 characters are allowed.
      </Text>
    </>
  );
};

export default withErrorBoundary(StepOne);
