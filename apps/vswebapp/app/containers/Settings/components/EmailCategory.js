import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Space, Text, Toggle, Cross } from '@cashfree-intl/coherent';

// Styled
import { EmailChips } from '../styled';

const EmailCategory = ({ category, onToggle, onRemoveRecipient }) => {
  const [show, setShow] = useState(false);

  return (
    <Paper
      data-testid={category.notifSubType}
      className="my-1 pointer"
      onClick={() => setShow(prev => !prev)}
    >
      <Space justifyContent="space-between" alignItems="center">
        <div>
          <Text variant="p14" className="mb-1">
            {category.name}
          </Text>
          <Text variant="p14" color="bodyLight">
            {category.description}
          </Text>
        </div>
        <Toggle
          active={category.enabled}
          onToggle={e => onToggle(e, category)}
        />
      </Space>
      {show &&
        category.recipients.map(recipient => (
          <EmailChips size="medium" className="px-2 mt-2 mr-1" key={recipient}>
            {recipient}
            <Cross
              data-testid={`${recipient}-cross`}
              className="pl-1"
              size="md"
              onClick={e => onRemoveRecipient(e, category, recipient)}
            />
          </EmailChips>
        ))}
    </Paper>
  );
};

EmailCategory.propTypes = {
  category: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemoveRecipient: PropTypes.func.isRequired,
};

export default EmailCategory;
