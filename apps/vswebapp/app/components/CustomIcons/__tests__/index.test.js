import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { withTheme } from 'styled-components';
import { Theme } from '@cashfree-intl/coherent';

// Components
import * as CustomIcons from '..';

const renderer = new ShallowRenderer();

describe('CustomIcons', () => {
  test('shallow render & match the snapshot', () => {
    const content = Object.keys(CustomIcons).map(key => {
      const CustomIcon = CustomIcons[key];
      return <CustomIcon key={key} className="pointer" />;
    });

    renderer.render(<Theme>{content}</Theme>);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks fill value', () => {
    const content = Object.keys(CustomIcons).map(key => {
      const CustomIcon = withTheme(CustomIcons[key]);
      return <CustomIcon key={key} role={key} fill="#6930CA" />;
    });

    render(<Theme>{content}</Theme>);

    Object.keys(CustomIcons).forEach(async key => {
      await waitFor(() => {
        const svg = screen.queryByRole(key);
        expect(svg).toBeInTheDocument();

        const fillColor = svg.querySelector('path').getAttribute('fill');
        expect(fillColor).toBe('#6930CA');
      });
    });
  });
});
