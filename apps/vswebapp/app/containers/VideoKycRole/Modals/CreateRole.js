import React, { useState } from 'react';
import {
  Space,
  Text,
  Button,
  Form,
  Cross,
  InputField,
  RadioButton,
  Label,
  InputWithAction,
  Conditional,
} from '@cashfree-intl/coherent';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import _startCase from 'lodash/startCase';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { StyledPreviewModal, StyledHeader, StyledFooter } from '../styled';
import { Divider } from 'styled/common';

// Services
import { createRole } from 'services/vkyc';

// utils
import {
  nameValidation,
  phoneNumberValidation,
  emailValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import Env from 'utils/env';

const CreateRole = ({
  onClose,
  role: initialRole = 'AGENT',
  setModalData,
  setModalType,
}) => {
  const [role, setRole] = useState(initialRole);
  const [formObj, setFormObj] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Name', value);
        break;

      case 'phone':
        error = phoneNumberValidation(value, true);
        break;

      case 'email':
        error = emailValidation(value);
    }

    setFormObj(prev => ({ ...prev, [name]: value }));
    setErrorObj(prev => ({ ...prev, [name]: error })); // Clear error on input change
  };

  const handleAdd = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await createRole({ role, ...formObj });

    if (!response.error) {
      setModalData({ role, ...formObj }); // Set modal data with role and formObj
      setModalType('ROLE_CREATED'); // Change modal type to ROLE_CREATED
    }

    setLoading(false);
  };

  const disabled =
    !isFormValid(
      _pickBy(formObj, _identity),
      _pickBy(errorObj, _identity),
      REQUIRED_FIELDS,
    ) || loading;

  return (
    <StyledPreviewModal open>
      <Space direction="column" fullHeight>
        <StyledHeader direction="column" gap={1.4}>
          <Space
            gap={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ width: '100%' }}
          >
            <Text variant="h20">Add {_startCase(role.toLowerCase())}</Text>
            <Cross onClick={onClose} />
          </Space>
        </StyledHeader>

        <Space
          className="p-4"
          direction="column"
          fullWidth
          fullHeight
          style={{ overflowY: 'auto', marginBottom: '80px' }}
        >
          <Form style={{ width: '100%' }}>
            <Space direction="column" gap={3}>
              <Space gap={1.5} direction="column">
                <Text variant="b14" color="bodyLight">
                  Role/ Permission
                </Text>
                <Space direction="row" gap={2}>
                  <RadioButton
                    label="Agent"
                    checked={role === 'AGENT'}
                    onChange={() => setRole('AGENT')}
                  />
                  <RadioButton
                    label="Auditor"
                    checked={role === 'AUDITOR'}
                    onChange={() => setRole('AUDITOR')}
                  />
                </Space>
              </Space>

              <Space direction="column">
                <Form>
                  <Form.Input
                    label={`${_startCase(role.toLowerCase())} Name`}
                    value={formObj.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    error={errorObj.name}
                  />

                  <Form.Input
                    label="Work email address"
                    value={formObj.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    error={errorObj.email}
                  />

                  <Space direction="column">
                    <Text color="bodyLight" className="mb-1">
                      Phone Number <Label size="mini">Optional</Label>
                    </Text>
                    <InputWithAction
                      label="+91"
                      name="phone"
                      type="number"
                      value={formObj.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                    />
                  </Space>
                </Form>
              </Space>

              <Divider contain className="m-0" />

              <Conditional if={role === 'AGENT'}>
                <Space direction="column" gap={1.5}>
                  <Space direction="column">
                    <Text variant="b14">
                      How will your agents access this portal?
                    </Text>
                    <Text variant="p14" color="bodyLight">
                      Once added, the agent receives an email with a portal
                      link, instructions, and standard permissions to verify
                      users, add comments, and submit requests.
                    </Text>
                  </Space>
                  <Space direction="column">
                    <Text variant="b14">How to test agent portal?</Text>
                    <Text variant="p14" color="bodyLight">
                      Create a test agent for yourself and visit the portal
                      below to view.
                    </Text>

                    <Space direction="row" alignItems="center" gap={1}>
                      Agent portal:
                      <Text
                        variant="p14"
                        color="primary"
                        as="a"
                        href={
                          Env.isTest()
                            ? 'https://vkyc-agent-test.cashfree.com/'
                            : 'https://vkyc-agent.cashfree.com/'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        vkyc-agent.cashfree.com
                      </Text>
                    </Space>
                  </Space>
                </Space>
              </Conditional>

              <Conditional if={role === 'AUDITOR'}>
                <Space direction="column" gap={1.5}>
                  <Space direction="column">
                    <Text variant="b14">
                      How will your auditors access this portal?
                    </Text>
                    <Text variant="p14" color="bodyLight">
                      Once added, auditors receive an email with a portal link,
                      instructions, and standard permissions to verify
                      customers, add comments, and submit requests.
                    </Text>
                  </Space>

                  <Space direction="column">
                    <Text variant="b14">How to test auditor portal?</Text>
                    <Text variant="p14" color="bodyLight">
                      Create a test auditor for yourself and visit the portal
                      below to view.
                    </Text>

                    <Space direction="row" alignItems="center" gap={1}>
                      Auditor portal:
                      <Text
                        variant="p14"
                        color="primary"
                        as="a"
                        href={
                          Env.isTest()
                            ? 'https://vkyc-auditor-test.cashfree.com/'
                            : 'https://vkyc-auditor.cashfree.com/'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        vkyc-auditor.cashfree.com
                      </Text>
                    </Space>
                  </Space>
                </Space>
              </Conditional>
            </Space>
          </Form>
        </Space>

        <StyledFooter justifyContent="flex-end" alignItems="center" fullWidth>
          <Button
            loading={loading}
            disabled={disabled}
            primary
            onClick={handleAdd}
          >
            Add
          </Button>
        </StyledFooter>
      </Space>
    </StyledPreviewModal>
  );
};

export default CreateRole;
