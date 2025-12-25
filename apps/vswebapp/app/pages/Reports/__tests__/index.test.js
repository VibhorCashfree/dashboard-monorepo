import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Pages
import Reports from '..';

const renderer = new ShallowRenderer();

describe('In Reports page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <Reports />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('Video embed exists', async () => {
    render(
      <Wrapper>
        <Reports />
      </Wrapper>,
    );

    const howToLinkElement = await screen.findByText(VIDEO_EMBEDS.REPORTS.name);

    expect(howToLinkElement).toBeInTheDocument();

    fireEvent.click(howToLinkElement);

    await waitFor(() =>
      expect(screen.queryByRole('video-embed')).toBeInTheDocument(),
    );
  });
});
