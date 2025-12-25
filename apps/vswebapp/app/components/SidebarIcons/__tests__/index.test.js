import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { withTheme } from 'styled-components';
import { Theme } from '@cashfree-intl/coherent';

// Components
import * as SidebarIcons from '..';

const renderer = new ShallowRenderer();

describe('SidebarIcons', () => {
  test('shallow render & match the snapshot', () => {
    const content = Object.keys(SidebarIcons).map(key => {
      const SidebarIcon = SidebarIcons[key];
      return <SidebarIcon key={key} className="pointer" fill="#6B6C7B" />;
    });

    renderer.render(<Theme>{content}</Theme>);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks fill value', () => {
    const content = Object.keys(SidebarIcons).map(key => {
      const SidebarIcon = withTheme(SidebarIcons[key]);
      return <SidebarIcon key={key} role={key} />;
    });

    render(<Theme>{content}</Theme>);

    Object.keys(SidebarIcons).forEach(async key => {
      await waitFor(() => {
        const svg = screen.queryByRole(key);
        expect(svg).toBeInTheDocument();

        const fillColor = svg.querySelector('path').getAttribute('fill');
        expect(fillColor).toBe('#6930CA');
      });
    });
  });
});
