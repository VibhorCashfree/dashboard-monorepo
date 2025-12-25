import React, { useState, useRef, useContext, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Space,
  Text,
  Form,
  Button,
  UploadFile,
  InputField,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { LOGO_UPLOAD_FILE_CHECKLIST, COLOR_TYPES } from './constants';

// Components
import Icon from 'components/Icon';
import MobilePreview from './MobilePreview';

// Hooks
import useClickOutside from 'hooks/useClickOutside';

// Utils
import { getThemeValues, stringifyThemeConfig } from './utils';

// Styled
import { Divider } from 'styled/common';
import {
  StyledUploadFile,
  StyledInputDiv,
  StyledColorInput,
  StyledChromePicker,
  StyledColorBox,
} from './styled';

// Services
import { postFormTheme } from 'services/forms';

const StepTwo = ({
  initialTheme,
  colorValues,
  logoImage,
  setColorValues,
  setLogoImage,
  handleStep,
  isPublished,
}) => {
  const colorPickerRef = useRef(null);
  const [colorPicker, setColorPicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState();

  const handleFileUpload = response => {
    if (Object.keys(response).length) {
      const { file } = response;
      if (file?.size > 512000) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }

    setLogoImage(response?.file);
  };

  const toogleColorPicker = color => {
    setColorPicker(color);
  };

  const closeColorPicker = () => {
    setColorValues('');
  };

  const handleColorFieldChange = key => (e, data) => {
    e.preventDefault();

    setColorValues({
      ...colorValues,
      [key]: data.value,
    });
  };

  useClickOutside(colorPickerRef, () => {
    setColorPicker('');
  });

  const resetColorValue = key => () => {
    const updatedTheme = { ...colorValues, [key]: initialTheme[key] };
    setColorValues(updatedTheme);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const themeBody = new FormData();

    if (typeof logoImage === 'string') {
      themeBody.append('logoUrl', logoImage);
    } else {
      themeBody.append('logo', logoImage);
    }
    themeBody.append('colorCode', `#${colorValues?.primaryColor}`);
    themeBody.append('configs', stringifyThemeConfig(colorValues));

    const responseThemeUpload = await postFormTheme(themeBody);

    handleStep(3);
    setLoading(false);
  };

  return (
    <Space fullHeight>
      <Space justifyContent="center" fullWidth fullHeight>
        <Form>
          <Space
            direction="column"
            gap={3}
            // className="p-3"
            style={{ marginTop: '64px' }}
          >
            <Space direction="column" gap={1}>
              <Text variant="h16" strong>
                Customise KYC Screens
              </Text>
              <Text color="bodyLight">
                Add basic details about custom KYC template as per your business
                needs.
              </Text>
            </Space>
            <StyledUploadFile>
              <UploadFile
                type="secondary"
                accept=".png, .jpeg"
                label="Logo"
                sizeLimit={512000}
                checkList={LOGO_UPLOAD_FILE_CHECKLIST}
                onChange={handleFileUpload}
                {...logoImage &&
                  typeof logoImage === 'string' && {
                    uploaded: {
                      name:
                        typeof logoImage === 'string'
                          ? logoImage
                          : URL.createObjectURL(logoImage),
                    },
                  }}
                buttonText="Upload a file"
                handleError={() => {}}
                isPublished={!isPublished}
              />
            </StyledUploadFile>
            <Divider className="m-0" contain />
            {COLOR_TYPES.map(colorType => (
              <Space key={colorType.key} direction="column" gap={1}>
                <Text color="bodyLight">{colorType.headerText}</Text>

                <Text color="bodyLight" variant="b12">
                  {colorType.infoText}
                </Text>

                <StyledInputDiv>
                  <Space alignItems="center" gap={1}>
                    <StyledColorInput>
                      <InputField
                        name={colorType.key}
                        value={colorValues[colorType.key]}
                        onChange={handleColorFieldChange(colorType.key)}
                        disabled={isPublished}
                        onKeyPress={event => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                          }
                        }}
                      />
                    </StyledColorInput>
                    <Icon
                      name="reset"
                      onClick={resetColorValue(colorType.key)}
                      className="pointer"
                    />
                  </Space>

                  <StyledColorBox
                    backgroundColor={`#${colorValues[colorType.key]}`}
                    onClick={() =>
                      !isPublished && toogleColorPicker(colorType.key)
                    }
                  />

                  {colorPicker === colorType.key && (
                    <StyledChromePicker ref={colorPickerRef}>
                      <div onClick={closeColorPicker} />
                      <ChromePicker
                        id={colorType.key}
                        name={colorType.key}
                        color={`#${colorValues[colorType.key]}`}
                        onChange={updateColor => {
                          setColorValues({
                            ...colorValues,
                            [colorType.key]: updateColor.hex.slice(1),
                          });
                        }}
                      />
                    </StyledChromePicker>
                  )}
                </StyledInputDiv>
              </Space>
            ))}
            <div>
              <Button
                primary
                size="small"
                style={{ padding: '7px 58px' }}
                onClick={handleSubmit}
                disabled={disable}
                loading={loading}
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
        style={{ backgroundColor: 'white' }}
      >
        <MobilePreview colorValues={colorValues} logoImage={logoImage} />
      </Space>
    </Space>
  );
};

StepTwo.propTypes = {};

export default StepTwo;
