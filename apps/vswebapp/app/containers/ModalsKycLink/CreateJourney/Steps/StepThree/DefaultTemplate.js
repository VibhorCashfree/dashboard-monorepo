import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Space, Text, Image } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Components
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import SelectTemplate from './SelectTemplate';

// Constants
import { DEFAULT_LOGO } from './constants';

// Services
import { getDefaultJourneyList, getDefaultWorkflow } from 'services/forms';

// Styled
import {
  StyledDefaultContainer,
  StyledTemplate,
  StyledTemplateBg,
  StyledDescription,
} from './styled';

const TemplateTab = ({ title, description, icon, handleClick }) => (
  <StyledTemplate
    direction="column"
    gap={2}
    alignItems="center"
    className="template-row"
    style={{ wordBreak: 'break-word' }}
    onClick={handleClick}
  >
    <StyledTemplateBg fullWidth justifyContent="center" alignItems="center">
      {icon}
    </StyledTemplateBg>
    <Space direction="column" gap={0.5}>
      <Text variant="h16" strong>
        {_startCase(title)}
      </Text>
      <StyledDescription variant="b14" color="bodyLight">
        {description}
      </StyledDescription>
    </Space>
  </StyledTemplate>
);

const DefaultTemplate = ({ closeDefaultTemplate, fetchDefaultJson }) => {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      setLoader(true);
      const response = await getDefaultJourneyList();

      setLoader(false);
      if (!response.error) {
        setTemplates(_get(response, 'data', []));
      }
    })();
  }, []);

  const submitTemplate = async templateId => {
    const response = await getDefaultWorkflow(templateId);

    if (!response.error) {
      fetchDefaultJson(_get(response, 'uiData'));
      closeDefaultTemplate();
    }
  };

  const handleTemplateSelect = template => {
    setSelected(template);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <StyledDefaultContainer direction="column" fullWidth gap={2}>
        <Space
          direction="column"
          gap={1.5}
          alignItems="center"
          justigyContent="center"
        >
          <Text variant="h28">Quick Start with Templates</Text>
          <Text variant="h16" color="bodyLight" className="text-center">
            We have designed a selection of KYC template templates to accelerate
            your process. Choose a template below or create a new journey that
            suits your business needs.
          </Text>
        </Space>
        <Space
          style={{ flexWrap: 'wrap' }}
          justifyContent="center"
          alignItems="center"
        >
          <TemplateTab
            title="Create New"
            description=" Start on a blank canvas and create a user flow as per your needs."
            icon={<Icon name="create-new" />}
            handleClick={closeDefaultTemplate}
          />
          {templates.map(template => (
            <TemplateTab
              title={template.templateName}
              description={template.description}
              icon={
                DEFAULT_LOGO[template.templateName] ? (
                  <Image
                    src={DEFAULT_LOGO[template.templateName]}
                    width={76}
                    height={66}
                  />
                ) : (
                  <Icon name="create-new" />
                )
              }
              handleClick={() => handleTemplateSelect(template)}
            />
          ))}
        </Space>
      </StyledDefaultContainer>

      {selected && (
        <SelectTemplate
          selected={selected}
          onClose={() => setSelected()}
          submitTemplate={submitTemplate}
        />
      )}
    </>
  );
};

DefaultTemplate.propTypes = {};

export default DefaultTemplate;
