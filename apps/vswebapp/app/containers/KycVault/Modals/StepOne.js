import React, { useRef, useState, useContext } from 'react';
import {
  Form,
  InputField,
  Space,
  Text,
  UploadFile,
} from '@cashfree-intl/coherent';
import { ChromePicker } from 'react-color';
import { ThemeContext } from 'styled-components';

// Components
import Icon from 'components/Icon';

// Co nstants
import { checkList } from '../constants';

// Hooks
import useClickOutside from 'hooks/useClickOutside';

// Styled
import {
  StyledChromePicker,
  StyledInputDiv,
  StyledColorInput,
  StyledColorBox,
} from '../styled';
import { Divider } from 'styled/common';

const StepOne = ({
  formObj,
  handleChange,
  errorObj,
  setErrorObj,
  setFormObj,
  colorValues,
  setColorValues,
}) => {
  const colorPickerRef = useRef(null);
  const { COLORS } = useContext(ThemeContext);

  let initialTheme = {
    primaryColor: COLORS.primary.replace('#', ''),
  };

  const [colorPicker, setColorPicker] = useState('');

  useClickOutside(colorPickerRef, () => {
    setColorPicker('');
  });

  const closeColorPicker = () => {
    setColorValues('');
  };

  const toogleColorPicker = color => {
    setColorPicker(color);
  };

  const handleColorFieldChange = key => (e, data) => {
    e.preventDefault();

    setColorValues({
      ...colorValues,
      [key]: data.value,
    });
  };

  const resetColorValue = key => () => {
    const updatedTheme = { ...colorValues, [key]: initialTheme[key] };
    setColorValues(updatedTheme);
  };

  const onChange = (e, { name, value }) => {
    setFormObj({ ...formObj, [name]: value });
  };

  return (
    <>
      <Space direction="column" gap={3}>
        <Text variant="b14" color="bodyLight">
          Set the template name and brand details to personalise your user’s
          experience{' '}
        </Text>
        <Form.Input
          fluid
          name="app_name"
          label="Template Name"
          error={errorObj.app_name}
          value={formObj.app_name}
          onChange={handleChange}
          className="m-0"
        />
      </Space>

      <Divider contain />

      <Space direction="column" gap={3}>
        <Space direction="column" gap={0.5}>
          <Text variant="h16">Brand Customisation</Text>
        </Space>
        <Form.Input
          fluid
          name="app_brand_name"
          label="Brand Name"
          error={errorObj.app_brand_name}
          value={formObj.app_brand_name}
          className="m-0"
          onChange={handleChange}
        />
        <Space direction="column">
          <UploadFile
            accept="image/*"
            label={
              <Text variant="b14" color="bodyLight" className="mb-1" strong>
                Logo
              </Text>
            }
            sizeLimit={512000}
            checkList={checkList}
            onError={error => setErrorObj(prev => ({ ...prev, image: error }))}
            onChange={response =>
              setFormObj(prev => ({ ...prev, app_logo: response.file }))
            }
            uploaded={formObj.app_logo}
          />
        </Space>
        <Space key="primaryColor" direction="column" gap={1}>
          <Text color="bodyLight" variant="b14" strong>
            Primary Brand Colour
          </Text>

          <Text color="bodyLight" variant="b12">
            This determines the colour of the buttons, link, and interactive
            elements.
          </Text>

          <StyledInputDiv>
            <Space alignItems="center" gap={1}>
              <StyledColorInput>
                <InputField
                  name="primaryColor"
                  value={colorValues['primaryColor']}
                  onChange={handleColorFieldChange('primaryColor')}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                    }
                  }}
                />
              </StyledColorInput>
              <Icon
                name="reset"
                onClick={resetColorValue('primaryColor')}
                className="pointer"
              />
            </Space>

            <StyledColorBox
              backgroundColor={`#${colorValues['primaryColor']}`}
              onClick={() => toogleColorPicker('primaryColor')}
            />

            {colorPicker === 'primaryColor' && (
              <StyledChromePicker ref={colorPickerRef}>
                <div onClick={closeColorPicker} />
                <ChromePicker
                  id="primaryColor"
                  name="primaryColor"
                  color={`#${colorValues['primaryColor']}`}
                  onChange={updateColor => {
                    setColorValues({
                      ...colorValues,
                      ['primaryColor']: updateColor.hex.slice(1),
                    });
                  }}
                />
              </StyledChromePicker>
            )}
          </StyledInputDiv>
        </Space>
      </Space>
    </>
  );
};

export default StepOne;
