import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Services
import * as DevelopersService from 'services/developers';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import APIMetrics from '..';

const renderer = new ShallowRenderer();

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

beforeEach(() => {
  jest.mock('services/developers');

  jest.spyOn(DevelopersService, 'getMetrics').mockImplementation(() =>
    Promise.resolve([
      {
        latency: 0.09000000000000001,
        timestamp: 1691451020,
      },
      {
        latency: 0.09002041742286752,
        timestamp: 1691451180,
      },
      {
        latency: 0.09,
        timestamp: 1691454280,
      },
    ]),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In API Metrics', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <APIMetrics />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  // test('checks render', async () => {
  // render(<APIMetrics />, { wrapper: CustomWrapper });

  // expect(DevelopersService.getMetrics).toHaveBeenCalled();
  // expect(DevelopersService.getMetrics).toHaveBeenCalledTimes(3);

  // await waitForElementToBeRemoved(screen.getByText('Loading'));

  // expect(screen.queryByText('Latency')).toBeInTheDocument();
  // expect(screen.queryByText('Success Percentage')).toBeInTheDocument();

  // document.querySelector('.metrics-filters button').click();

  // expect(screen.queryByText('Last 7 days')).toBeInTheDocument();

  // document
  //   .querySelector('.ui.basic.popup.transition.visible .option:nth-child(2)')
  //   .click();

  // expect(DevelopersService.getMetrics).toHaveBeenCalled();

  // expect(screen.queryByText('Today')).not.toBeInTheDocument();

  // document.querySelector('.metrics-filters .ui.button.dropdown').click();

  // expect(DevelopersService.getMetrics).toHaveBeenCalled();

  // await waitForElementToBeRemoved(screen.getByText('Loading'));

  // fireEvent.click(screen.queryByText(/Bank Verification Async/));

  // expect(DevelopersService.getMetrics).toHaveBeenCalled();

  // await waitForElementToBeRemoved(screen.getByText('Loading'));

  // expect(
  //   screen.queryByText('GET /payout/v1/asyncValidation/bankDetails'),
  // ).toBeInTheDocument();

  // document.querySelector('.metrics-filters .ui.button.dropdown').click();
  // document.querySelector('.metrics-filters button').click();
  // fireEvent.click(screen.queryByText(/Back/));
  // });
});
