import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  Space,
  Button,
  Dropdown,
  Divider,
  Form,
} from '@cashfree-intl/coherent';
import _groupBy from 'lodash/groupBy';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import PercentageLabeledInput from 'components/PercentageLabeledInput';
import PhoneLabeledInput from 'components/PhoneLabeledInput';
import Icon from 'components/Icon';
import Alert from 'components/Alert';
import AgreementParties from './AgreementParties';

// Constants
import { escrowPartyOptions, REQUIRED_FIELDS } from '../constants';

// Images
import buyerImg from 'images/buyer.svg';
import sellerImg from 'images/seller.svg';

// Utils
import { digitOnlyKeys, formatAmount } from 'utils/common';
import isFormValid from 'utils/isFormValid';

// Types
import type { PartyType, StepTwoProps } from '../types';

const StepTwo: React.FC<StepTwoProps> = ({
  formObj,
  setFormObj,
  errorObj,
  onChange,
  parties,
  setParties,
  amount,
  wasLastPage,
  setWasLastPage,
}) => {
  const [displayParties, setDisplayParties] = useState(false);
  const { BUYER: buyers = [], SELLER: sellers = [] } = _groupBy(
    parties,
    'type',
  );

  useEffect(() => {
    if (wasLastPage) {
      setDisplayParties(true);
      setWasLastPage(false);
    }
  }, [wasLastPage, setWasLastPage]);

  const handleAddParty = () => {
    let newFormObj = formObj;

    if (!newFormObj.id) {
      newFormObj = { ...newFormObj, id: Math.floor(Math.random() * 100000) };
    }

    const filterParty = parties.filter((party) => party.id !== newFormObj.id);

    setParties([...filterParty, newFormObj as PartyType]);
    setFormObj({});
    setDisplayParties(!displayParties);
  };

  const handleEditParty = (party: PartyType) => {
    setFormObj(party);
    setDisplayParties(!displayParties);
  };

  const handleDeleteParty = (id: number) => {
    const filterParty = parties.filter((party) => party.id !== id);
    setParties([...filterParty]);
  };

  const disabled = !isFormValid(
    { ...formObj },
    { ...errorObj },
    REQUIRED_FIELDS.STEP_TWO,
  );

  return (
    <>
      {displayParties ? (
        <>
          <Space className="mb-3" alignItems="center">
            <Image
              inline
              className="mr-1"
              style={{ height: 18 }}
              src={buyerImg}
            />
            <Text variant="h16" color="bodyLight">
              Buyer
            </Text>
          </Space>

          {buyers.map((party, index) => (
            <AgreementParties
              key={party.id}
              data={party}
              index={index}
              onDelete={handleDeleteParty}
              onEdit={handleEditParty}
            />
          ))}

          <Divider />

          <Space className="mb-3" alignItems="center">
            <Image
              inline
              className="mr-1"
              style={{ height: 18 }}
              src={sellerImg}
            />
            <Text variant="h16" color="bodyLight">
              Seller
            </Text>
          </Space>

          {sellers.map((party, index) => (
            <AgreementParties
              key={party.id}
              data={party}
              index={index}
              onDelete={handleDeleteParty}
              onEdit={handleEditParty}
            />
          ))}

          <Divider />

          <Button
            fluid
            type="button"
            secondary
            onClick={() => setDisplayParties(!displayParties)}
            icon={<Icon name={'add'} className="ml-1" />}
          >
            Add Another Party
          </Button>

          {buyers.length === 0 || sellers.length === 0 ? (
            <Alert className="mt-6" type="warning" bordered rounded>
              <Alert.Content size="md">
                At least one buyer and one seller needs to be added.
              </Alert.Content>
            </Alert>
          ) : null}
        </>
      ) : (
        <>
          <Text variant="b12" color="bodyLight" as="p" className="mt-1">
            Ensure you fill in the details of every party involved in the
            contractual agreement. Click Add Party to add a party and Next to
            proceed.
          </Text>

          <Text color="bodyLight" className="mt-2 mb-1" strong>
            Party Type
          </Text>
          <Dropdown
            selection
            fluid
            className="mb-3"
            name="type"
            placeholder="Choose Escrow Party Type"
            options={escrowPartyOptions}
            error={errorObj.type}
            value={formObj.type}
            onChange={onChange}
          />
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input
                fluid
                data-testid="name"
                name="name"
                label="Name"
                error={errorObj.name}
                value={formObj.name}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                data-testid="pan"
                name="pan"
                label="PAN Number"
                error={errorObj.pan}
                value={formObj.pan}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <Text color="bodyLight" className="mb-1">
                Phone Number
              </Text>
              <Form.Input
                fluid
                data-testid="phone"
                name="phone"
                className="m-0"
                maxLength="10"
                control={PhoneLabeledInput}
                error={errorObj.phone}
                value={formObj.phone}
                onChange={onChange}
                onKeyDown={digitOnlyKeys}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                data-testid="email"
                name="email"
                label="Email ID"
                error={errorObj.email}
                value={formObj.email}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input
                fluid
                data-testid="bank-account"
                name="bank_account"
                label="Bank Account Number"
                error={errorObj.bank_account}
                value={formObj.bank_account}
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
          <Form.TextArea
            data-testid="address"
            name="address"
            label="Address"
            className="m-0"
            maxLength="150"
            value={formObj.address}
            error={errorObj.address}
            onChange={onChange}
          />
          <Text variant="b12" color="bodyLight" as="p" className="mt-1">
            Maximum 150 characters are allowed.
          </Text>

          {formObj.type ? (
            <Form.Group widths="equal">
              <Form.Field>
                <Text color="bodyLight" className="mb-1">
                  Set Proportion
                </Text>
                <Form.Input
                  fluid
                  data-testid="percentage-amount"
                  name="allocated_percentage_of_amount"
                  className="m-0"
                  inputmode="numeric"
                  min="0"
                  control={PercentageLabeledInput}
                  error={errorObj.allocated_percentage_of_amount}
                  value={formObj.allocated_percentage_of_amount}
                  onChange={onChange}
                />

                {formObj.allocated_percentage_of_amount && (
                  <Text variant="b12" color="bodyLight" as="p" className="mt-1">
                    Receivable Amt -{' '}
                    {formatAmount(
                      (amount * (formObj.allocated_percentage_of_amount || 0)) /
                        100,
                    )}
                  </Text>
                )}
              </Form.Field>
              <Form.Field />
            </Form.Group>
          ) : null}

          <Button
            type="button"
            primary
            onClick={handleAddParty}
            disabled={disabled}
          >
            Add Party
          </Button>
        </>
      )}
    </>
  );
};

export default withErrorBoundary(StepTwo);
