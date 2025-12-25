import React, { useState } from 'react';
import {
  Paper,
  Space,
  toast,
  Button,
  Form,
  Text,
  Toggle,
} from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { setMerchantPreference } from 'services/accounts';

// Utils
import isFormValid from 'utils/isFormValid';

// Constants
import { preferencesByType, PREFERENCE_TYPE_OPTION } from '../constants';

// Types
import type { PreferenceOptionProps } from '../types';

const PreferenceOption: React.FC<PreferenceOptionProps> = ({
  preferenceType,
  preferenceName,
  canUpdate,
}) => {
  const { preferences } = useAccount();

  const [show, setShow] = useState(false);

  const preference = preferencesByType[preferenceType].find(
    (pref) => pref.name === preferenceName,
  );

  const { name, title, description, type, editable, validation } = preference!;

  const [formObj, setFormObj] = useState<AnyObject>({
    property: name,
    value: preferences.merchantPreferences[name],
  });
  const [errorObj, setErrorObj] = useState<AnyObject>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { value }: { value: any },
  ) => {
    const error = validation(value);

    setErrorObj((prev) => ({ ...prev, name: error }));
    setFormObj((prev) => ({ ...prev, value: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canUpdate) {
      return;
    }

    const body = {
      property: formObj.property,
      value: formObj.value,
    };

    if (type === PREFERENCE_TYPE_OPTION.TOGGLE) {
      setFormObj((prev) => ({ ...prev, value: !formObj.value }));
      body.value = !formObj.value === true ? '1' : '0';
    }

    const response = await setMerchantPreference(body);

    if (!('error' in response)) {
      if (response.merchantPreferenceUpdated) {
        toast.success('Preference updated successfully');
      } else {
        toast.error(
          'Preference not updated. Please try again after some time.',
        );
      }
    }
  };

  const renderControl = () => {
    switch (type) {
      case PREFERENCE_TYPE_OPTION.TOGGLE:
        return <Toggle active={formObj.value} onToggle={handleSubmit} />;

      case PREFERENCE_TYPE_OPTION.INPUT:
        return (
          <Icon
            name={show ? 'chevron-up' : 'chevron-down'}
            onClick={() => setShow((prev) => !prev)}
          />
        );
    }
  };

  const disabled = !isFormValid(formObj, errorObj, []);

  return (
    <Paper className="my-1 pointer" $background="#F9F5FF">
      <Space justifyContent="space-between" alignItems="center">
        <div>
          <Text variant="p14" className="mb-1">
            {title}
          </Text>
          <Text variant="p14" color="bodyLight">
            {description}
          </Text>
        </div>
        {renderControl()}
      </Space>

      {show && (
        <Space gap={6} className="mt-2">
          <Form>
            <Form.Group style={{ alignItems: 'flex-start' }}>
              <Form.Input
                name={name}
                error={errorObj.name}
                value={formObj.value}
                readOnly={!canUpdate || editable === false}
                onChange={handleChange}
              />

              {canUpdate && editable && (
                <Button
                  type="submit"
                  className="ml-4"
                  primary
                  disabled={disabled}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              )}
            </Form.Group>
          </Form>
        </Space>
      )}
    </Paper>
  );
};

export default withErrorBoundary(PreferenceOption);
