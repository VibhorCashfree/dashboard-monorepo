import React from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Text,
  Form,
  Label,
  Button,
  Image,
} from '@cashfree-intl/coherent';
import moment from 'moment';
import _get from 'lodash/get';

// Image
import KYCStepOne from 'images/kyc-step-one.svg';

// Styled
import {
  CircleContainer,
  OuterCircle,
  MiddleCircle,
  InnerCircle,
  MobilePreviewContainer,
} from './styled';

const AnimatedCircles = () => (
  <CircleContainer>
    <OuterCircle />
    <MiddleCircle />
    <InnerCircle />
  </CircleContainer>
);

const StepOne = ({
  errorObj,
  formObj,
  onChange,
  handleStep,
  disabled,
  isPublished,
}) => {
  return (
    <Space fullHeight>
      <Space justifyContent="center" fullWidth fullHeight>
        <Form>
          <Space
            direction="column"
            gap={3}
            className="p-3"
            style={{ marginTop: '148px' }}
          >
            <Space direction="column" gap={1}>
              <Text variant="h16" strong>
                Template Details
              </Text>
              <Text color="bodyLight">
                Add basic details about custom KYC template as per your business
                needs.
              </Text>
            </Space>
            <Space direction="column" gap={1}>
              <Form.Input
                fluid
                name="templateName"
                label="Name"
                placeholder="Eg: Onboarding For Lending"
                error={errorObj.templateName}
                value={formObj.templateName}
                onChange={onChange}
                className="mb-0"
                disabled={isPublished}
              />
              {!errorObj.templateName && (
                <Text variant="b12" color="bodyLight">
                  A maximum of 100 characters are allowed.
                </Text>
              )}
            </Space>
            <Space direction="column" gap={1}>
              <Form.TextArea
                name="description"
                label="Description"
                placeholder="Eg: A lending company wants their users to go through a custom KYC template to successfully their claim loan offer."
                maxLength="200"
                value={formObj.description}
                onChange={onChange}
                className="mb-0"
                disabled={isPublished}
              />
              <Text variant="b12" color="bodyLight">
                A maximum of 200 characters are allowed.
              </Text>
            </Space>
            <div>
              <Button
                primary
                size="small"
                style={{ padding: '7px 58px' }}
                onClick={() => handleStep(2)}
                disabled={disabled}
              >
                Continue
              </Button>
            </div>
          </Space>
        </Form>
      </Space>
      <Space
        justifyContent="center"
        alignItems="center"
        fullWidth
        style={{ paddingTop: '20px', backgroundColor: 'white' }}
      >
        {/* <AnimatedCircles /> */}
        <MobilePreviewContainer>
          <Image
            src={KYCStepOne}
            width="294px"
            height="340px"
            style={{ width: '100%', height: '100%' }}
          />
        </MobilePreviewContainer>
      </Space>
    </Space>
  );
};

StepOne.propTypes = {};

export default StepOne;
