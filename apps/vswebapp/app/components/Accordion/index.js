import React, { useState } from 'react';
import {
  Accordion as CoherentAccordion,
  Icon,
  Space,
} from '@cashfree-intl/coherent';
import PropTypes from 'prop-types';
import _filter from 'lodash/filter';

// Components
import StatusLabel from 'components/StatusLabel';

// Styled
import { Divider } from 'styled/common';

const Accordion = ({ accordionData }) => {
  const [activeIndex, setActiveIndex] = useState([0]);

  const handleChange = (e, titleProps) => {
    const { index } = titleProps;
    let newState;

    if (activeIndex.indexOf(index) > -1) {
      // if existing index, remove from state
      newState = _filter(activeIndex, idx => idx !== index);
    } else {
      // if new index, add to state
      newState = [...activeIndex, index];
    }

    setActiveIndex(newState);
  };

  return (
    <CoherentAccordion fluid>
      {accordionData.filter(Boolean).map((accodionItem, index) => (
        <>
          <CoherentAccordion.Title
            index={index}
            onClick={handleChange}
            className="py-3"
          >
            <Space justifyContent="space-between">
              <Space alignItems="center" gap={2}>
                {activeIndex.includes(index) ? (
                  <Icon name="chevron-up" />
                ) : (
                  <Icon name="chevron-down" />
                )}

                {accodionItem.title}
              </Space>

              <div>
                <StatusLabel>{accodionItem.status}</StatusLabel>
              </div>
            </Space>
          </CoherentAccordion.Title>

          <CoherentAccordion.Content active={activeIndex.includes(index)}>
            {accodionItem.content}
          </CoherentAccordion.Content>

          {accordionData.length - 1 !== index && <Divider className="my-0" />}
        </>
      ))}
    </CoherentAccordion>
  );
};

Accordion.propTypes = {
  accordionData: PropTypes.array,
};

export default Accordion;
