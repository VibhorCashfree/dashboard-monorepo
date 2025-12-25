import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Pages
import Summary from '..';

jest.mock('containers/Summary', () => {
  // eslint-disable-next-line global-require
  const { Summary } = jest.requireActual('containers/Summary');

  const props = {
    availableBalance: {
      availableBalance: '0',
      balance: '9988386845.61',
      overdraft: '10000',
      fundsOnHold: '33997369.61',
    },
  };

  return {
    __esModule: true,
    Summary: () => () => <Summary {...props} />,
    default: () => () => <Summary {...props} />,
  };
});

const renderer = new ShallowRenderer();

describe('In Summary page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <Summary />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('Video embed exists', async () => {
    render(
      <Wrapper>
        <Summary />
      </Wrapper>,
    );

    const howToLinkElement = await screen.findByText(VIDEO_EMBEDS.SUMMARY.name);

    expect(howToLinkElement).toBeInTheDocument();

    fireEvent.click(howToLinkElement);

    await waitFor(() =>
      expect(screen.queryByRole('video-embed')).toBeInTheDocument(),
    );
  });
});
