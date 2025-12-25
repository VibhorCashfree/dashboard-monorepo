import _curry from 'lodash/curry';
import _uniq from 'lodash/uniq';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _intersection from 'lodash/intersection';

// Constants
import { CONNECTED_BANK } from './constants';

export const getBankAccountOptions = (isAllowed: boolean) => [
  {
    text: 'ICICI Bank (Composite)',
    value: CONNECTED_BANK.ICICI_COMP_CONNECTED,
  },
  {
    text: 'Yes Bank',
    value: CONNECTED_BANK.YES_TSP,
    disabled: !isAllowed,
  },
  { text: 'Axis Connected', value: CONNECTED_BANK.AXIS_CONNECTED },
  { text: 'IDFC Connected', value: CONNECTED_BANK.IDFC_CONNECTED },
];

const fieldTransformFn = (schema: Schema, field: string): FieldTransform => ({
  property: field,
  type: schema.properties[field].type,
  label: schema.properties[field].displayName || field,
  description: schema.properties[field].description,
  extensions: schema.properties[field].extensions,
  required: 'mandatory',
});

export const getFieldsByModes = (
  credentialSchema: string | undefined,
  supportedModes: string[],
) => {
  if (!credentialSchema) {
    return [];
  }

  const schema = JSON.parse(credentialSchema);
  const curriedFieldTransformFn = _curry(fieldTransformFn)(schema);

  const allFields = Object.keys(schema.properties);

  if (_get(schema, 'allOf.0.required')) {
    return allFields.map(curriedFieldTransformFn);
  }

  if (schema.required) {
    return _intersection(allFields, schema.required).map(
      curriedFieldTransformFn,
    );
  }

  // calculate required fields based on `modes`
  const fieldsByMode = schema.allOf.reduce(function (
    acc: AnyObject,
    curr: any,
  ) {
    const key = _get(curr, 'if.properties.modes.contains.const', '');

    acc[key] = allFields || _get(curr, 'then.required', []);

    return acc;
  },
  {} as AnyObject);

  const modes = supportedModes.includes('banktransfer')
    ? supportedModes.concat(['imps', 'neft'])
    : supportedModes;

  const fields = modes.map((mode) => fieldsByMode[mode] || []).flat();

  return _uniq(fields).map(curriedFieldTransformFn);
};

export const getLeadBasedFields = (lead: AnyObject) => {
  const leadId = lead.id;

  const bankAccountDataObj = _find(lead.data, {
    property: 'Account Number',
  });

  const ifscDataObj = _find(lead.data, {
    property: 'IFSC',
  });

  const bankAccount = _get(bankAccountDataObj, 'value');
  const ifsc = _get(ifscDataObj, 'value');

  return {
    leadId,
    bankAccount,
    ifsc,
  };
};
