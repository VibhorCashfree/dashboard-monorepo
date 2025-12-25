import React, { useMemo, useState } from 'react';
import { Space, Button, Form } from '@cashfree-intl/coherent';
import AutoSuggestionInput from 'components/AutoSuggestionInput';

const SelectAccount = ({ loading, onCancel, ...props }) => {
  const [selectedUser, setSelectedUser] = useState(
    props.type === 'USER' ? props.initialAccount : null,
  );
  const [email, setEmail] = useState(props.initialAccount?.email || '');
  const [emailError, setEmailError] = useState(null);

  const searchList = useMemo(() => {
    if (props.type === 'USER') {
      return props.suggestionList.map(item => ({
        key: item.id,
        text: item.name,
        description: item.aliasEmail,
      }));
    }
    return [];
  }, [props.type === 'USER' ? props.suggestionList : []]);

  const validateEmail = value => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const handleEmailChange = (e, { value }) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleEmailSubmit = e => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    props.onSubmit({ email });
  };

  if (props.type === 'EMAIL') {
    return (
      <Form onSubmit={handleEmailSubmit}>
        <Space direction="column">
          <Form.Input
            id="email"
            name="email"
            value={email}
            placeholder="eg: jerry@cn.com, spike@cn.com"
            error={emailError}
            className="mb-0"
            label="Enter the email address to set notification preferences"
            onChange={handleEmailChange}
          />
        </Space>

        <Space justifyContent="flex-end" className="mt-7 w-100">
          <Space gap={5}>
            <Button disabled={loading} type="button" link onClick={onCancel}>
              Cancel
            </Button>
            <Button
              loading={loading}
              type="submit"
              primary
              disabled={!email || emailError}
            >
              Next
            </Button>
          </Space>
        </Space>
      </Form>
    );
  }

  if (props.type === 'USER') {
    return (
      <>
        <Space direction="column">
          <Space direction="column">
            <AutoSuggestionInput
              label="Select user to set notification preferences"
              initialSelection={props.initialAccount}
              options={searchList}
              onAddUserClick={props.onAddNewUser}
              onSelectionChange={data => setSelectedUser(data)}
            />
          </Space>

          <Space justifyContent="flex-end" className="mt-7 w-100">
            <Space gap={5}>
              <Button disabled={loading} type="button" link onClick={onCancel}>
                Cancel
              </Button>
              <Button
                loading={loading}
                type="submit"
                primary
                disabled={!selectedUser}
                onClick={() => props.onSubmit(selectedUser)}
              >
                Next
              </Button>
            </Space>
          </Space>
        </Space>
      </>
    );
  }
};

export default SelectAccount;
