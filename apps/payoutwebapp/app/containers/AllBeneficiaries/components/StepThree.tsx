import React from 'react';
import { Text, Form } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Types
import type { StepThreeProps } from '../types';

const StepThree: React.FC<StepThreeProps> = ({
  selectedRow,
  formObj,
  errorObj,
  onChange,
}) => {
  const kycDocByType = _keyBy(
    _get(selectedRow, 'beneficiaryKycDocData', []),
    'kycDocType',
  );

  return (
    <>
      <Text variant="h16" className="mt-1">
        KYC Details
      </Text>

      <Text className="my-2" color="bodyLight">
        We require these information to verify the beneficiary.
      </Text>

      <Form.Input
        fluid
        data-testid="pan-card"
        name="panCard"
        label="PAN Number"
        error={errorObj.panCard}
        value={formObj.panCard}
        disabled={_get(kycDocByType, 'PAN.status') === 'VERIFIED'}
        onChange={onChange}
      />

      <Form.Input
        fluid
        data-testid="gstin"
        name="gstIn"
        label="GSTIN Number"
        error={errorObj.gstIn}
        value={formObj.gstIn}
        disabled={_get(kycDocByType, 'GST.status') === 'VERIFIED'}
        onChange={onChange}
      />

      <Form.Input
        fluid
        data-testid="cin"
        name="cin"
        label="CIN Number"
        error={errorObj.cin}
        value={formObj.cin}
        disabled={_get(kycDocByType, 'CIN.status') === 'VERIFIED'}
        onChange={onChange}
      />

      <Form.Input
        fluid
        data-testid="din"
        name="din"
        label="Director’s DIN Number"
        error={errorObj.din}
        value={formObj.din}
        disabled={_get(kycDocByType, 'DIN.status') === 'VERIFIED'}
        onChange={onChange}
      />
    </>
  );
};

export default withErrorBoundary(StepThree);
