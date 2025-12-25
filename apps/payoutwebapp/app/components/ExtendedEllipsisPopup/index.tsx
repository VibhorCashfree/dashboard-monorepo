import React from 'react';
import { Button, EllipsisPopup } from '@cashfree-intl/coherent';
import _groupBy from 'lodash/groupBy';

// Types
import type { Props } from './types';

const ExtendedEllipsisPopup = ({ actions, onClick }: Props) => {
  if (!actions.length) {
    return null;
  }

  const { true: primaryActions = [], false: secondaryActions = [] } = _groupBy(
    actions,
    'primary',
  );

  return (
    <>
      {primaryActions.map((action) => (
        <Button
          data-event-name="Primary_Button"
          key={action.text}
          size="small"
          secondary
          className="mr-1"
          disabled={action.disabled}
          onClick={(e: React.MouseEvent) => onClick(e, action.value)}
        >
          {action.text}
        </Button>
      ))}

      {secondaryActions.length > 0 && (
        <EllipsisPopup menuItems={secondaryActions} onClick={onClick} />
      )}
    </>
  );
};

export default ExtendedEllipsisPopup;
