import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Column,
  Form,
  Label,
  Text,
  Cross,
  Button,
  AlertModal,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownHeader,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import _find from 'lodash/find';
import _omit from 'lodash/omit';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Services
import { create } from 'services/transfers';
import { getSuggestions } from 'services/beneficiaries';

// Utils
import Analytics from 'utils/analytics';
import {
  transferIdValidation,
  requiredValidation,
  beneIdValidation,
  amountValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { getModeOptions, getPurposeCodeOptions } from '../utils';

// Constants
import { REGION } from 'constants/common';
import { REQUIRED_FIELDS } from 'containers/AllTransfers/constants';

// Helpers
import { getFundSourcesOptions } from 'helpers/fundSources';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';
import RegionBasedRenderer from 'components/RegionBasedRenderer';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { QuickTransferModalProps, Mode, Suggestion } from '../types';

const QuickTransferModal: React.FC<QuickTransferModalProps> = ({
  isOneEscrow,
  initialPaymentInstrumentId,
  beneId,
  setBeneId,
  fundSources,
  switchAddBeneficiary,
  onClose,
  onResponse,
}) => {
  const { preferences } = useAccount();

  const [formObj, setFormObj] = useState<AnyObject>({
    paymentInstrumentId: initialPaymentInstrumentId,
  });
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [beneModes, setBeneModes] = useState<Mode[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSame, setIsSame] = useState(false);

  const transferModesRef = useRef<any>(null);

  const beneSearch = useRef(
    _debounce(async (queryStr: string, beneId: string | undefined) => {
      const response = await getSuggestions(queryStr);

      if (!('error' in response)) {
        setSuggestions(response);
        setSearching(false);

        if (beneId) {
          setBeneModes(_get(response, '0.modes', []));
        }
      }
    }, 1000),
  );

  const fundSource = _find(fundSources, {
    paymentInstrumentId: formObj.paymentInstrumentId,
  });

  const currency = _get(fundSource, 'currency');
  const fundSourceModes = _get(fundSource, 'supportedModes', []);

  useEffect(() => {
    if (!beneId) {
      return;
    }

    setFormObj((prev) => ({ ...prev, beneId }));
  }, [beneId]);

  useEffect(() => {
    if (formObj.beneId) {
      beneSearch.current(formObj.beneId, beneId);
    } else {
      beneSearch.current.cancel();
      setSuggestions([]);
      setSearching(false);
    }
  }, [formObj.beneId]);

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);

    const body = {
      ...formObj,
      currency,
    };
    const response = await create(body, isSame);

    setLoading(false);

    if (_get(response, 'error.title') === 'REQUEST_SAME_BENE') {
      setIsSame(true);
      return;
    }

    let status: 'SUCCESS' | 'PENDING' | 'FAILED';
    let result: any;

    if ('error' in response) {
      status = 'FAILED';
      result = (response.error as { message: string }).message;
    } else if (!response.data.utr) {
      status = 'PENDING';
      result = () => (
        <>
          <p>{response.message}</p>
          {+response.data.referenceId ? (
            <p>
              CF Reference ID: <strong>{response.data.referenceId}</strong>
            </p>
          ) : null}
        </>
      );
    } else {
      status = 'SUCCESS';
      result = response.data.utr;
    }

    onResponse({
      type: status,
      result,
    });
  };

  const handleSuggestion = (suggestion: Suggestion) => () => {
    setFormObj((prev) => ({ ...prev, beneId: suggestion.beneId }));
    setBeneModes(suggestion.modes);
  };

  const resetTransferMode = () => {
    if (transferModesRef.current.hasValue()) {
      transferModesRef.current.clearValue();
    }

    setFormObj((prev) => _omit(prev, 'transferMode'));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: any },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'transferId':
        error = transferIdValidation(value, true);
        break;

      case 'transferMode':
        error = requiredValidation(value);
        Analytics.track('Dropdown_transferMode', {
          value,
        });
        break;

      case 'beneId':
        if (value) {
          setSearching(true);

          Analytics.track('Dropdown_beneId', {
            value,
          });
        }

        resetTransferMode();
        setSuggestions([]);
        error = beneIdValidation(value);
        break;

      case 'paymentInstrumentId':
        resetTransferMode();
        error = requiredValidation(value);
        Analytics.track('Dropdown_paymentInstrumentId', {
          value,
        });
        break;

      case 'amount':
        error = amountValidation(value);
        break;

      case 'purposeCode':
        error = requiredValidation(value);
        Analytics.track('Dropdown_purposeCode', {
          value,
        });
        break;
    }

    if (beneId) {
      setBeneId('');
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const beneficiaryName = _find(suggestions, { beneId: formObj.beneId });
  const noSuggestions =
    suggestions.length === 0 && formObj.beneId && !searching;

  const disabled =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS) ||
    !beneficiaryName ||
    loading;

  if (isSame) {
    return (
      <AlertModal
        type="warning"
        title="Warning"
        eventNameOnConfirm="Primary_Last_5_Mins_Warning"
        eventNameOnClose="Secondary_Last_5_Mins_Warning"
        onConfirm={(e: React.MouseEvent) => !disabled && handleSubmit(e)}
        onClose={() => setIsSame(false)}
      >
        <Text variant="p14">
          A transfer to {beneficiaryName!.name} was made in the last 5 minutes.
          Confirm if you want to make another transfer to the same account.
        </Text>
      </AlertModal>
    );
  }

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        {isOneEscrow ? 'Initiate Payout' : 'Quick Transfer'}{' '}
        <Cross data-event-name="Close_Icon_Quick_Transfer" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Dropdown
              icon={null}
              fluid
              trigger={
                <Form.Input
                  className="mb-0"
                  name="beneId"
                  label="Beneficiary ID"
                  placeholder="Enter Beneficiary ID"
                  autofill="off"
                  autoComplete="off"
                  error={errorObj.beneId}
                  value={formObj.beneId}
                  loading={searching}
                  onChange={handleChange}
                />
              }
            >
              <DropdownMenu>
                {suggestions.map((suggestion) => (
                  <DropdownItem
                    key={suggestion.beneId}
                    text={suggestion.beneId}
                    description={suggestion.name}
                    onClick={handleSuggestion(suggestion)}
                  />
                ))}

                {noSuggestions && (
                  <Text color="bodyLight" className="m-2">
                    No beneficiary found
                  </Text>
                )}

                {(suggestions.length > 0 || noSuggestions) && (
                  <DropdownDivider className="mb-0" />
                )}

                <DropdownHeader
                  icon="add user"
                  content="Add Beneficiary"
                  onClick={switchAddBeneficiary}
                />
              </DropdownMenu>
            </Dropdown>
            {beneficiaryName && (
              <div className="mt-1">
                <Text as="span" variant="b12" color="bodyLight">
                  Beneficiary Name :{' '}
                </Text>
                <Text as="span" variant="b12">
                  {beneficiaryName.name}
                </Text>
              </div>
            )}
            <Form.Field>
              <Text color="bodyLight" className="mt-3 mb-1">
                Fund Source
              </Text>
              {isOneEscrow ? (
                <Form.Input
                  data-testid="payment-instrument-id"
                  name="paymentInstrumentId"
                  readOnly
                  placeholder="Choose Fund Source"
                  value={formObj.paymentInstrumentId}
                />
              ) : (
                <Dropdown
                  selection
                  fluid
                  icon="chevron down"
                  name="paymentInstrumentId"
                  placeholder="Choose Fund Source"
                  options={getFundSourcesOptions(fundSources)}
                  value={formObj.paymentInstrumentId}
                  error={errorObj.paymentInstrumentId}
                  onChange={handleChange}
                />
              )}
            </Form.Field>
            <Form.Field>
              <Text color="bodyLight" className="mt-3 mb-1">
                Transfer Method
              </Text>
              <Dropdown
                selection
                fluid
                icon="chevron down"
                name="transferMode"
                placeholder="Choose method"
                ref={transferModesRef}
                options={getModeOptions(
                  beneModes,
                  fundSourceModes,
                  preferences,
                )}
                error={errorObj.transferMode}
                onChange={handleChange}
              />
            </Form.Field>
            <RegionBasedRenderer regions={[REGION.AE]}>
              <Form.Field>
                <Text color="bodyLight" className="mt-3 mb-1">
                  Purpose Code
                </Text>
                <Dropdown
                  selection
                  fluid
                  icon="chevron down"
                  name="purposeCode"
                  placeholder="Choose Purpose Code"
                  options={getPurposeCodeOptions()}
                  value={formObj.purposeCode}
                  error={errorObj.purposeCode}
                  onChange={handleChange}
                />
              </Form.Field>
            </RegionBasedRenderer>
            <Grid columns="equal" className="mb-1">
              <Column>
                <Form.Input
                  data-testid="transfer-id"
                  name="transferId"
                  fluid
                  label={
                    <Text color="bodyLight" className="mb-1">
                      Transfer ID <Label size="mini">Optional</Label>
                    </Text>
                  }
                  placeholder="Transfer ID"
                  value={formObj.transferId}
                  error={errorObj.transferId}
                  onChange={handleChange}
                />
              </Column>
              <Column>
                <Form.Field
                  fluid
                  control={AmountLabeledInput}
                  controlProps={{
                    currency,
                  }}
                  data-testid="amount"
                  name="amount"
                  label="Amount"
                  inputmode="numeric"
                  step=".01"
                  placeholder="Amount"
                  error={errorObj.amount}
                  value={formObj.amount}
                  onChange={handleChange}
                />
              </Column>
            </Grid>
            <Form.TextArea
              className="m-0"
              data-testid="remarks"
              name="remarks"
              label={
                <Text color="bodyLight" className="mb-1 mt-2">
                  Remarks <Label size="mini">Optional</Label>
                </Text>
              }
              maxLength="70"
              value={formObj.remarks}
              onChange={handleChange}
            />
            <Text variant="b12" color="bodyLight" className="mt-1 mb-3">
              Maximum 70 characters are allowed. Remarks will be visible in the
              a/c statement, if the beneficiary bank supports.
            </Text>

            <Text variant="b12" color="warning">
              *Transfer once confirmed, cannot be reversed. Review the details
              and click Confirm.
            </Text>

            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Quick_Transfer"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Quick_Transfer"
                type="submit"
                primary
                className="ml-4"
                disabled={disabled}
                loading={loading}
              >
                Confirm
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(QuickTransferModal));
