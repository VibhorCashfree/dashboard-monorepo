import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Services
import * as ReportsService from 'services/reports';

// Pages
import Reports from '..';

const renderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('services/reports');

  jest.spyOn(ReportsService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      entries: [
        {
          id: '679466',
          type: 'PO_ACCOUNT',
          reportName: 'Account Statement-17-11-2022',
          size: 316,
          addedOn: '2022-11-17 18:21:07',
          generatedBy: 'Rahul Mallik',
          status: 'READY',
          format: 'CSV',
        },
        {
          id: '679465',
          type: 'TRANSFER',
          reportName: 'Transfer-17-11-2022',
          size: 1145,
          addedOn: '2022-11-17 18:18:53',
          generatedBy: 'Adarsh',
          status: 'READY',
          format: 'CSV',
        },
      ],
      size: 2,
      num: 0,
      total: 2,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

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
