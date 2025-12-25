import React from 'react';
import { Button, Popup } from '@cashfree-intl/coherent';
import _groupBy from 'lodash/groupBy';

// Components
import Icon from 'components/Icon';
import DropdownButton from 'components/DropdownButton';

// Types
import type { Props } from './types';

const ExtendedDropdown = ({ actions, onClick }: Props) => {
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
        <Popup
          key={action.text}
          position="right center"
          content={action.tooltip}
          disabled={!action.tooltip}
          trigger={
            <Button
              data-event-name="Primary_Button"
              primary
              className="mr-2"
              disabled={action.disabled}
              onClick={() => onClick(action.value)}
            >
              {action.text}
            </Button>
          }
        />
      ))}

      {secondaryActions.length > 0 && (
        <DropdownButton options={secondaryActions} onClick={onClick}>
          {(open) => (
            <Button
              data-event-name="Primary_Button"
              iconPosition="right"
              icon={
                <Icon
                  name={open ? 'chevron-up' : 'chevron-down'}
                  className="ml-1"
                />
              }
            >
              Actions
            </Button>
          )}
        </DropdownButton>
      )}
    </>
  );
};

export default ExtendedDropdown;
