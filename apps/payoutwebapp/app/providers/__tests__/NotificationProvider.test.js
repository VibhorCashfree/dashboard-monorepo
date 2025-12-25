import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '@testing-library/react';

// Providers
import NotificationProvider from '../NotificationProvider';

const shallowRenderer = new ShallowRenderer();

describe('NotificationProvider', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <NotificationProvider>
        <h1>Hello</h1>
      </NotificationProvider>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('should make context value accessbile to Consumer', async () => {
    render(
      <NotificationProvider>
        <h1>Hello</h1>
      </NotificationProvider>,
    );

    await screen.findByText('Hello');
  });
});
