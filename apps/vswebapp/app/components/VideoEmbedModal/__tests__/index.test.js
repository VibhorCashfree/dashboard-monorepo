import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import VideoEmbedModal from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('VideoEmbedModal', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <VideoEmbedModal embedKey="DEVELOPERS" onClose={jest.fn()} />,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(
      <Theme>
        <VideoEmbedModal embedKey="DEVELOPERS" onClose={jest.fn()} />
      </Theme>,
    );

    await waitFor(() =>
      expect(screen.queryByRole('video-embed')).toBeInTheDocument(),
    );
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
