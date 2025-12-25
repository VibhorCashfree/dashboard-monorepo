/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import {
  Grid,
  Column,
  Text,
  DateSelect,
  Form,
  Ref,
} from '@cashfree-intl/coherent';
import moment from 'moment';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';
import CalendarIconedInput from 'components/CalendarIconedInput';

// Constants
import { dateSelectConfig } from '../constants';

// Types
import type { StepOneProps } from '../types';

const StepOne: React.FC<StepOneProps> = ({ formObj, errorObj, onChange }) => (
  <>
    <Form.Field>
      <Grid columns="equal">
        <Column>
          <Text variant="p14" color="bodyLight" className="mb-1">
            Start Date
          </Text>

          <DateSelect
            name="start_date"
            value={formObj.start_date}
            onSelect={(value: Date) =>
              onChange(null, { name: 'start_date', value })
            }
            trigger={forwardRef((props, ref) => (
              <Ref innerRef={ref}>
                <Form.Field
                  fluid
                  type="text"
                  control={CalendarIconedInput}
                  error={errorObj.start_date}
                  placeholder="Select Date"
                  value={
                    formObj.start_date
                      ? moment(formObj.start_date).format('YYYY-MM-DD')
                      : ''
                  }
                  {...props}
                />
              </Ref>
            ))}
            {...dateSelectConfig}
          />
        </Column>
        <Column>
          <Text variant="p14" color="bodyLight" className="mb-1">
            Expiry Date
          </Text>

          <DateSelect
            name="expiry_date"
            value={formObj.expiry_date}
            onSelect={(value: Date) =>
              onChange(null, { name: 'expiry_date', value })
            }
            trigger={forwardRef((props, ref) => (
              <Ref innerRef={ref}>
                <Form.Field
                  fluid
                  type="text"
                  control={CalendarIconedInput}
                  error={errorObj.expiry_date}
                  placeholder="Select Date"
                  value={
                    formObj.expiry_date
                      ? moment(formObj.expiry_date).format('YYYY-MM-DD')
                      : ''
                  }
                  {...props}
                />
              </Ref>
            ))}
            {...dateSelectConfig}
          />
        </Column>
      </Grid>
    </Form.Field>
    <Form.Field>
      <Form.Input
        fluid
        data-testid="purpose"
        name="purpose"
        label="Purpose"
        error={errorObj.purpose}
        value={formObj.purpose}
        placeholder="Ex: House Property"
        onChange={onChange}
      />
    </Form.Field>
    <Grid columns="equal" className="mb-1">
      <Column>
        <Form.Field
          fluid
          control={AmountLabeledInput}
          data-testid="amount"
          name="total_amount"
          label="Amount"
          inputmode="numeric"
          step=".01"
          placeholder="Amount"
          error={errorObj.total_amount}
          value={formObj.total_amount}
          onChange={onChange}
        />
      </Column>
      <Column></Column>
    </Grid>
  </>
);

export default withErrorBoundary(StepOne);
