// @ts-nocheck
import React, { useState } from 'react';
import {
  Label,
  Text,
  Image,
  Form,
  Segment,
  List,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import Alert from 'components/Alert';
import RegionBasedRenderer from 'components/RegionBasedRenderer';

// Utils
import Env from 'utils/env';
import getAlertIcon from 'utils/getAlertIcon';
import { getUpdatedFeedback } from '../utils';

// Constants
import { BENE_PURPOSE, REGION } from 'constants/common';
import { DEFAULT_IBAN_FEEDBACK } from '../constants';

// Types
import type { IbanFeedback, StepTwoProps } from '../types';

const StepTwo: React.FC<StepTwoProps> = ({
  benePurpose,
  formObj,
  errorObj,
  onChange,
}) => {
  const [ibanFeedback, setIbanFeedback] = useState<IbanFeedback>(
    DEFAULT_IBAN_FEEDBACK,
  );

  const handleIbanChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    const updatedFeedback = getUpdatedFeedback(ibanFeedback, value);

    setIbanFeedback(updatedFeedback);
    onChange(e, { name, value });
  };

  return (
    <>
      <RegionBasedRenderer regions={[REGION.AE]}>
        <Text variant="h16" className="mb-2 mt-1">
          Payment Method
        </Text>
        <Form.Group>
          <Form.Input
            fluid
            data-testid="account-iban"
            name="accountIBan"
            label="IBAN"
            placeholder="Ex. AE070331234567890123456"
            width={9}
            value={formObj.accountIBan}
            onChange={handleIbanChange}
          />
        </Form.Group>
        <Segment>
          <Text variant="b12" color="bodyLight" className="mb-1">
            IBAN must contain:
          </Text>
          <List relaxed className="mb-1">
            {Object.keys(ibanFeedback).map((key: string) => (
              <List.Item key={key}>
                <List.Content>
                  <Text variant="b12" color="bodyLight">
                    <Image
                      inline
                      src={getAlertIcon(ibanFeedback[key].type, 'sm')}
                    />{' '}
                    {ibanFeedback[key].message}
                  </Text>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </RegionBasedRenderer>

      <RegionBasedRenderer regions={[REGION.IN]}>
        {Env.isTest() && (
          <Alert className="mb-2" type="warning" bordered rounded>
            <Alert.Content size="md">
              <Text strong>Test Environment:</Text>
              <Text>
                Please use only test data available in our{' '}
                <a
                  href="https://www.cashfree.com/docs/payouts/payouts/integrations/data-to-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-name="Link"
                >
                  documentation
                </a>{' '}
                while using our Test Environment or calling our Sandbox APIs.{' '}
              </Text>
            </Alert.Content>
          </Alert>
        )}

        {benePurpose !== BENE_PURPOSE.CORP_CC && (
          <Text variant="h16" className="mb-2 mt-1">
            Payment Method <Label size="mini">Optional</Label>
          </Text>
        )}

        {benePurpose !== BENE_PURPOSE.AMAZON_UPI_BENE && (
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input
                fluid
                data-testid="bank-account"
                name="bankAccount"
                label="Account Number"
                error={errorObj.bankAccount}
                value={formObj.bankAccount}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                data-testid="ifsc"
                name="ifsc"
                label="IFSC"
                error={errorObj.ifsc}
                value={formObj.ifsc}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>
        )}

        <Form.Group>
          <Form.Input
            fluid
            data-testid="vpa"
            name="vpa"
            label="UPI VPA"
            width={8}
            error={errorObj.vpa}
            value={formObj.vpa}
            onChange={onChange}
          />
        </Form.Group>
      </RegionBasedRenderer>
    </>
  );
};

export default withErrorBoundary(StepTwo);
