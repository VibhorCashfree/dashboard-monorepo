import React from 'react';
import {
  RadioGroup,
  Label,
  Popup,
  Form,
  Text,
  UploadFile,
  Checkbox,
  Dropdown,
} from '@cashfree-intl/coherent';

// Constants
import { FILE_SIZE_CHECK } from 'constants/common';

// Components
import Icon from 'components/Icon';

// Styled
import { FlexGrid } from 'styled/common';

// Types
import type { Props } from './types';

const FormField: React.FC<Props> = ({
  label,
  required,
  property,
  readOnly = false,
  description,
  extensions = [],
  type,
  width = 5,
  enums = [],
  error,
  value,
  onChange,
}) => {
  switch (type) {
    case 'file':
      return (
        <Form.Field width={width}>
          <Text color="bodyLight" className="mb-1">
            {label}{' '}
            {description ? (
              <Popup
                position="right center"
                content={description}
                trigger={
                  <span>
                    <Icon name="info" className="pointer" verticalAlign="top" />
                  </span>
                }
              />
            ) : null}
            {required !== 'mandatory' && <Label size="mini">Optional</Label>}
          </Text>
          <UploadFile
            type="secondary"
            accept={extensions.join(',')}
            checkList={[FILE_SIZE_CHECK, `File type: ${extensions}`]}
            value={value}
            customError={error}
            onChange={(value: any) =>
              onChange(null, {
                name: property,
                type: 'file',
                value: value.file,
              })
            }
          />
        </Form.Field>
      );

    case 'dropdown':
      return (
        <>
          <Text color="bodyLight" className="mb-1">
            {label}{' '}
            {description ? (
              <Popup
                position="right center"
                content={description}
                trigger={
                  <span>
                    <Icon name="info" className="pointer" verticalAlign="top" />
                  </span>
                }
              />
            ) : null}
            {required !== 'mandatory' && <Label size="mini">Optional</Label>}
          </Text>
          <Dropdown
            selection
            name={property}
            placeholder={`Choose a ${label}`}
            options={enums.map((enumValue) => ({
              key: enumValue,
              text: enumValue,
              value: enumValue,
            }))}
            error={error}
            value={value}
            required={required === 'mandatory'}
            onChange={onChange}
          />
        </>
      );

    case 'checkBox':
      return (
        <Form.Field width={width}>
          <Text color="bodyLight" className="mb-1">
            {label}{' '}
            {description ? (
              <Popup
                position="right center"
                content={description}
                trigger={
                  <span>
                    <Icon name="info" className="pointer" verticalAlign="top" />
                  </span>
                }
              />
            ) : null}
            {required !== 'mandatory' && <Label size="mini">Optional</Label>}
          </Text>
          <FlexGrid cols={2} gap={[1, 0]} wrap>
            {enums.map((enumValue) => (
              <Checkbox
                key={enumValue}
                name={property}
                label={enumValue}
                checked={(value || '').includes(enumValue)}
                onChange={onChange}
              />
            ))}
          </FlexGrid>
        </Form.Field>
      );

    case 'radioButtons': {
      const radioOptions = enums.map((enumValue) => ({
        label: enumValue,
        value: enumValue,
        name: property,
        checked: enumValue === value,
        onChange: (e: React.ChangeEvent<HTMLFormElement>) => {
          onChange(e, { name: property, value: enumValue });
        },
      }));

      return (
        <Form.Field>
          <Text color="bodyLight" className="mb-1">
            {label}{' '}
            {description ? (
              <Popup
                position="right center"
                content={description}
                trigger={
                  <span>
                    <Icon name="info" className="pointer" verticalAlign="top" />
                  </span>
                }
              />
            ) : null}
            {required !== 'mandatory' && <Label size="mini">Optional</Label>}
          </Text>

          <RadioGroup fieldLabel={null} radioOptions={radioOptions} />
        </Form.Field>
      );
    }

    case 'string':
    case 'inputText':
      return (
        <Form.Field>
          <Form.Input
            width={width}
            fluid
            name={property}
            readOnly={readOnly}
            label={
              <Text color="bodyLight" className="mb-1">
                {label}{' '}
                {description ? (
                  <Popup
                    position="right center"
                    content={description}
                    trigger={
                      <span>
                        <Icon
                          name="info"
                          className="pointer"
                          verticalAlign="top"
                        />
                      </span>
                    }
                  />
                ) : null}
                {required !== 'mandatory' && (
                  <Label size="mini">Optional</Label>
                )}
              </Text>
            }
            error={error}
            value={value}
            required={required === 'mandatory'}
            onChange={onChange}
          />
        </Form.Field>
      );

    default:
      return null;
  }
};

export default FormField;
