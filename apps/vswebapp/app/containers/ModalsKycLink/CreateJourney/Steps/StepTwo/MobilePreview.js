import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _filter from 'lodash/filter';
import { ThemeContext } from 'styled-components';
import {
  Text,
  Space,
  Conditional,
  Icon as CoherentIcon,
  StatusLabel,
  Button,
  InputField,
  Image,
} from '@cashfree-intl/coherent';
import Icon from 'components/Icon';

// styles
import {
  StyledMobilePreview,
  StyledMobileDiv,
  StyledTermsAndCond,
  StyledHeader,
  StyledProceedDiv,
  StyledTermsAndCondDiv,
} from './styled';
import {
  CircleContainer,
  OuterCircle,
  MiddleCircle,
  InnerCircle,
  MobilePreviewContainer,
} from '../StepOne/styled';

// Images
import CustomerView from 'images/customer-view.svg';

const AnimatedCircles = () => (
  <CircleContainer>
    <OuterCircle />
    <MiddleCircle />
    <InnerCircle />
  </CircleContainer>
);

const MobilePreview = ({ colorValues, logoImage }) => {
  return (
    <Space
      direction="column"
      // justifyContent="center"
      alignItems="center"
    >
      <Image
        src={CustomerView}
        width={139}
        height={31}
        style={{ bottom: '30px' }}
      />
      <MobilePreviewContainer>
        <StyledMobileDiv
          bgColor={`#${colorValues.primaryColor}`}
          textColor={`#${colorValues.textColor}`}
        >
          <div style={{ padding: '57px 34px', height: '540px' }}>
            <StyledHeader
              bgColor={`#${colorValues.headerColor}`}
              justifyContent="center"
              alignItems="center"
            >
              {logoImage ? (
                <img
                  src={
                    typeof logoImage === 'string'
                      ? logoImage
                      : URL.createObjectURL(logoImage)
                  }
                />
              ) : (
                <CoherentIcon name="cf-logo" />
              )}
            </StyledHeader>

            <StyledMobilePreview
              direction="column"
              justifyContent="space-between"
              className="px-2"
              fullHeight
            >
              <InputField className="mt-2" borderLabelInput="Full Name" />
              <Space direction="column">
                <StyledTermsAndCondDiv variant="b12">
                  By clicking Submit, I agree to the{' '}
                  <StyledTermsAndCond
                    textColor={`#${colorValues.primaryColor}`}
                  >
                    terms and conditions.
                  </StyledTermsAndCond>
                </StyledTermsAndCondDiv>
                <StyledProceedDiv
                  className="mt-1 mb-1"
                  bgColor={`#${colorValues.primaryColor}`}
                  textColor={`#${colorValues.textColor}`}
                >
                  <Button primary fluid size="small">
                    Submit
                  </Button>
                </StyledProceedDiv>
              </Space>
            </StyledMobilePreview>
          </div>
        </StyledMobileDiv>
      </MobilePreviewContainer>
    </Space>
  );
};

MobilePreview.propTypes = {
  colorValues: PropTypes.object,
  logoImage: PropTypes.string,
};

export default MobilePreview;
