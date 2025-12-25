import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Image,
  Cross,
  Icon as CoherentIcon,
  Accordion,
  InputField,
  Text,
  Button,
  Conditional,
  UploadFile,
} from '@cashfree-intl/coherent';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import classNames from 'classnames';

// Constants
import { ALL_FIELD_MAPPING, checkList } from './constants';

// Images
import CustomerView from 'images/customer-view.svg';

// Components
import Icon from 'components/Icon';

// Styled
import {
  StyledPreviewModal,
  StyledCarousel,
  StyledMessage,
  PreviewAccordion,
  StyledPreviewOR,
  StyledPreviewOrDivider,
} from './styled';
import { Divider } from 'styled/common';
import {
  StyledMobileDiv,
  StyledHeader,
  StyledMobilePreview,
} from '../StepTwo/styled';

// Store
import useStore from '../../store';

const ORCondition = () => (
  <Space
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ position: 'relative' }}
  >
    <StyledPreviewOR alignItems="center" justifyContent="center">
      <Text as="span">Or</Text>
    </StyledPreviewOR>
    <StyledPreviewOrDivider noMargin />
  </Space>
);

const PreviewJourney = ({ onClose, logoImage, colorValues }) => {
  const [screen, setScreen] = useState(1);
  const [openAccordion, setOpenAccordion] = useState();
  const { getScreens } = useStore(state => ({ getScreens: state.getScreens }));
  const screens = getScreens();

  const handleNavigate = action => {
    switch (action) {
      case 'PREV':
        if (screen === 1) return;
        setScreen(prev => prev - 1);
        break;

      case 'NEXT':
        if (screen === screens.length) return;
        setScreen(prev => prev + 1);
        break;
    }
  };

  const blocks = _find(screens, { id: String(screen) })?.data?.blocks || [];

  return (
    <StyledPreviewModal open $maxWidth="450">
      <Space direction="column" fullHeight>
        <Space justifyContent="flex-end">
          <Cross onClick={onClose} />
        </Space>
        <Space
          direction="column"
          justifyContent="center"
          alignItems="center"
          fullHeight
        >
          <Image src={CustomerView} width={139} height={31} />
          <StyledMobileDiv
            className="mb-5"
            bgColor={`#${colorValues.primaryColor}`}
            textColor={`#${colorValues.textColor}`}
          >
            <div style={{ padding: '57px 34px', height: '600px' }}>
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
                gap={1}
                className={classNames({
                  'px-2': blocks?.length === 1,
                })}
                style={{ height: '430px', 'overflow-y': 'scroll' }}
              >
                {blocks?.length > 1 ? (
                  <>
                    <StyledMessage>
                      <Text variant="b14" strong>
                        Choose any one option below to verify your information.
                      </Text>
                    </StyledMessage>
                    {blocks?.map((block, blockIndex) => (
                      <>
                        <PreviewAccordion key={blockIndex}>
                          <Accordion.Title
                            index={blockIndex}
                            onClick={() => setOpenAccordion(blockIndex)}
                          >
                            <Space justifyContent="space-between">
                              <Text>
                                {block.products
                                  .map(
                                    product =>
                                      ALL_FIELD_MAPPING[product].displayText,
                                  )
                                  .join(', ')}
                              </Text>
                              <Icon
                                name={
                                  openAccordion === blockIndex
                                    ? 'chevron-up'
                                    : 'chevron-down'
                                }
                              />
                            </Space>
                          </Accordion.Title>
                          <Accordion.Content
                            active={openAccordion === blockIndex}
                          >
                            <Divider className="m-0" contain />
                            {block.products.map(product =>
                              ALL_FIELD_MAPPING[product].inputFields.map(
                                field => (
                                  <>
                                    <Conditional
                                      if={field.includes('Upload') === true}
                                    >
                                      <UploadFile
                                        accept=".png, .jpg, .jpeg"
                                        // checkList={checkList}
                                        label={field}
                                        sizeLimit={5000}
                                      />
                                    </Conditional>
                                    <Conditional
                                      if={field.includes('Upload') === false}
                                    >
                                      <InputField
                                        borderLabelInput={field}
                                        className="mt-2"
                                      />
                                    </Conditional>
                                  </>
                                ),
                              ),
                            )}
                            <Button variant="primary" className="mt-2" fluid>
                              Submit
                            </Button>
                          </Accordion.Content>
                        </PreviewAccordion>
                        <Conditional if={blockIndex === 0}>
                          <ORCondition />
                        </Conditional>
                      </>
                    ))}
                  </>
                ) : (
                  <Space
                    direction="column"
                    justifyContent="space-between"
                    fullHeight
                  >
                    <Space direction="column" gap={2} className="mt-2">
                      {blocks?.map(block =>
                        block.products.map(product =>
                          ALL_FIELD_MAPPING[product].inputFields.map(field => (
                            <>
                              <Conditional
                                if={field.includes('Upload') === true}
                              >
                                <UploadFile
                                  accept=".png, .jpg, .jpeg"
                                  // checkList={checkList}
                                  label={field}
                                  sizeLimit={5000}
                                />
                              </Conditional>
                              <Conditional
                                if={field.includes('Upload') === false}
                              >
                                <InputField borderLabelInput={field} />
                              </Conditional>
                            </>
                          )),
                        ),
                      )}
                    </Space>
                    <Conditional if={blocks?.length}>
                      <Button primary fluid size="small" className="mb-1">
                        Submit
                      </Button>
                    </Conditional>
                  </Space>
                )}
              </StyledMobilePreview>
            </div>
          </StyledMobileDiv>
          <Space gap={4} alignItems="center">
            <Icon
              name="circular-left"
              className="pointer"
              onClick={() => handleNavigate('PREV')}
            />
            <StyledCarousel
              justifyContent="center"
              alignItems="center"
              gap={0.5}
            >
              <Text variant="b12" color="white">
                {screen}
              </Text>
              <Text variant="b12" color="selected">
                /
              </Text>
              <Text variant="b12" color="selected">
                {screens.length}
              </Text>
            </StyledCarousel>
            <Icon
              name="circular-right"
              className="pointer"
              onClick={() => handleNavigate('NEXT')}
            />
          </Space>
        </Space>
      </Space>
    </StyledPreviewModal>
  );
};

PreviewJourney.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PreviewJourney;
