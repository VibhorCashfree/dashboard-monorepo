import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Paper, Space, Image } from '@cashfree-intl/coherent';
import _startCase from 'lodash/startCase';

// Components
import Modals from './components/Modals';

// Images
// import bannerImage from 'images/pitch-page/banner.png';

// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';
import { productPitchMap, MODAL_TYPES } from './constants';

// Styled
import { FlexGrid } from 'styled/common';
import { StyledFeature, StyledBanner, StyledTitle } from './styled';

export const PitchPage = ({ productCode, btnText, onBtnClick, customUI }) => {
  const [modalType, setModalType] = useState();

  const {
    productName,
    descriptions,
    features,
    logo,
    thumbnail,
    viewDocs,
    tryVerificationText,
    banner,
  } = productPitchMap[productCode];

  const videoEmbedDetails = VIDEO_EMBEDS[productCode];

  const showDocs = () => window.open(viewDocs, '_blank');

  const renderCta = () => (
    <Space alignItems="center" justifyContent="start">
      {btnText && (
        <Button
          className="mr-4"
          onClick={onBtnClick}
          data-event-name="Primary_Button"
        >
          <Text color="primary" strong>
            {btnText}
          </Text>
        </Button>
      )}

      {viewDocs && (
        <Button
          primary
          onClick={showDocs}
          strong
          data-event-name="Primary_Button"
        >
          View API Docs
        </Button>
      )}
    </Space>
  );

  return (
    <>
      <StyledBanner $backgroundImage={banner}>
        <div className="text-section">
          <Text variant="h28" color="white" className="mb-3" strong>
            <>
              {logo ? <Image inline className="mr-1 mb-1" src={logo} /> : null}
              {productName}
            </>
          </Text>
          {descriptions.map(description => (
            <Text
              variant="h16"
              color="white"
              className="mb-4 description"
              key={description}
            >
              {description}
            </Text>
          ))}
          {renderCta()}
        </div>

        {thumbnail && (
          <div className="embed-section">
            <Image
              inline
              onClick={() =>
                videoEmbedDetails && setModalType(MODAL_TYPES.EMBED)
              }
              src={thumbnail}
              className="pointer"
            />
          </div>
        )}
      </StyledBanner>

      <StyledTitle>
        {tryVerificationText ||
          `How does ${_startCase(productCode)} Verification work?`}
      </StyledTitle>

      {!customUI ? (
        <FlexGrid gap={2.4} style={{ flexWrap: 'wrap' }}>
          {features.map(feature => (
            <Paper key={feature.heading} style={{ flex: '1 1 350px' }}>
              <StyledFeature key={feature.heading}>
                <div className="title">{feature.heading}</div>
                <Text variant="p14" color="bodyLight">
                  {feature.body}
                </Text>
              </StyledFeature>
            </Paper>
          ))}
        </FlexGrid>
      ) : (
        customUI
      )}

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          embedKey={productCode}
        />
      )}
    </>
  );
};

PitchPage.propTypes = {
  productCode: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  onBtnClick: PropTypes.func,
};

export default PitchPage;
