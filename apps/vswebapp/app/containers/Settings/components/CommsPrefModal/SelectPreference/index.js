import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Space,
  Button,
  Icon,
  Conditional,
} from '@cashfree-intl/coherent';
import PreferenceRenderer from '../../PreferenceRenderer';
import { StyledAlertBanner } from './styled';

const SelectPreference = ({
  mode,
  email,
  heading,
  data,
  visibleChannels,
  loading,
  showEmailBanner,
  onBack,
  onSubmit,
  onChange,
}) => (
  <div>
    <Conditional if={showEmailBanner}>
      <StyledAlertBanner className="py-1 px-2">
        <Icon name="PENDING" />
        <Text variant="p14" className="ml-2" color="warning">
          {email} will receive a confirmation email. Upon clicking Confirm in
          the email, the recipient will begin receiving email notifications.
        </Text>
      </StyledAlertBanner>
    </Conditional>
    <Space className="py-3 px-4" direction="column">
      <Space className="mb-4" direction="column">
        <Text variant="p14" color="bodyLight">
          Choose which notifications {email} should receive from the list below.
        </Text>
      </Space>
      <PreferenceRenderer
        heading={heading}
        visibleChannels={visibleChannels}
        isReadOnly={false}
        data={data}
        onChange={onChange}
      />
      <Space justifyContent="flex-end" className="mt-7 w-100">
        <Space gap={5}>
          <Button disabled={loading} type="button" link onClick={onBack}>
            Back
          </Button>
          <Button loading={loading} type="submit" primary onClick={onSubmit}>
            {mode === 'Set' ? 'Submit' : 'Save'}
          </Button>
          {/* <Popup
              position="top center"
              content={`A confirmation email will be sent to "${email}". The recipient must
              click on "Confirm" button to start receiving email notifications.`}
              trigger={
                <Button
                  loading={loading}
                  type="submit"
                  primary
                  onClick={onSubmit}
                >
                  {mode === 'Set' ? 'Submit' : 'Save'}
                </Button>
              }
            /> */}
        </Space>
      </Space>
    </Space>
  </div>
);

SelectPreference.propTypes = {
  mode: PropTypes.string,
  email: PropTypes.string,
  heading: PropTypes.string,
  data: PropTypes.object,
  visibleChannels: PropTypes.array,
  loading: PropTypes.bool,
  showEmailBanner: PropTypes.bool,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default SelectPreference;
