import _get from 'lodash/get';
import _curry from 'lodash/curry';
import _intersection from 'lodash/intersection';

const fieldTransformFn = (schema: Schema, field: string): FieldTransform => ({
  property: field,
  type: schema.properties[field].type,
  label: schema.properties[field].displayName || field,
  description: schema.properties[field].description,
  extensions: schema.properties[field].extensions,
  required: 'mandatory',
});

export const getFields = (
  credentialSchema: string | undefined,
): FieldTransform[] => {
  if (!credentialSchema) {
    return [];
  }

  const schema: Schema = JSON.parse(credentialSchema);
  const curriedFieldTransformFn = _curry(fieldTransformFn)(schema);

  const allFields: string[] = Object.keys(schema.properties);

  if (_get(schema, 'allOf.0.required')) {
    return allFields.map(curriedFieldTransformFn);
  }

  if (schema.required) {
    return _intersection(allFields, schema.required).map(
      curriedFieldTransformFn,
    );
  }

  return [];
};
