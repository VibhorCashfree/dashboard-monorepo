import React, { useState } from 'react';
import { Paper, Space, Text, Toggle, Cross } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { EmailChips } from '../styled';

// Types
import type { EmailCategoryProps } from '../types';

const EmailCategory: React.FC<EmailCategoryProps> = ({
  category,
  onToggle,
  onRemoveRecipient,
}) => {
  const [show, setShow] = useState(false);

  return (
    <Paper
      data-testid={category.notifSubType}
      className="my-1 pointer"
      onClick={() => setShow((prev) => !prev)}
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
          onToggle={(e: React.MouseEvent) => onToggle(e, category)}
        />
      </Space>
      {show &&
        category.recipients.map((recipient: string) => (
          <EmailChips size="medium" className="px-2 mt-2 mr-1" key={recipient}>
            {recipient}
            <Cross
              data-testid={`${recipient}-cross`}
              className="pl-1"
              size="md"
              onClick={(e: React.MouseEvent) =>
                onRemoveRecipient(e, category, recipient)
              }
            />
          </EmailChips>
        ))}
    </Paper>
  );
};

export default withErrorBoundary(EmailCategory);
