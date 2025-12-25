import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Button } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';
import DropdownButton from '..';

const renderer = new ShallowRenderer();

describe('DropdownButton', () => {
  test('shallow render & match the snapshot', () => {
    const options = [
      {
        key: 'UPDATE_DETAILS',
        text: 'Update Details',
        value: 'UPDATE_DETAILS',
      },
      {
        key: 'DELETE',
        text: 'Delete',
        value: 'DELETE',
      },
    ];

    renderer.render(
      <DropdownButton options={options} onClick={jest.fn()}>
        {(open) => (
          <Button
            primary
            iconPosition="right"
            icon={
              <Icon
                name={open ? 'chevron-up' : 'chevron-down'}
                fill="white"
                className="ml-1"
              />
            }
          >
            Click
          </Button>
        )}
      </DropdownButton>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
