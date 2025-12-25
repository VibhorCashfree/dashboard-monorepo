import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';
import userEvent from '@testing-library/user-event';

// Components
import Wrapper from '__tests__/components/Wrapper';
import HoverTextCopy from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('HoverTextCopy', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <HoverTextCopy text="this is hover content">
        this is main content
      </HoverTextCopy>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(
      <HoverTextCopy text="this is hover content">
        this is main content
      </HoverTextCopy>,
      {
        wrapper: Wrapper,
      },
    );

    await userEvent.hover(screen.queryByText('this is main content'));
    document
      .querySelector(
        '.ui.segment > .ui.active.transition.visible.inverted.dimmer',
      )
      .click();
    await userEvent.unhover(screen.queryByText('this is main content'));

    expect(screen.queryByText('this is main content')).toBeInTheDocument();
  });

  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach(key => {
      const StyledComponent = StyledComponents[key];

      const tree = renderer
        .create(
          <Theme>
            <StyledComponent />
          </Theme>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
