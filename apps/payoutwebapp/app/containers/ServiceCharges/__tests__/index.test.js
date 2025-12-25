import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import moment from 'moment';

// Providers
import { DetailsContext } from 'containers/FundSourceDetails/providers';

// Constants
import { FORMATS } from 'constants/date';

// Mocks
import { mockDetailsProvider } from '__mocks__/common.mock';

// Services
import * as FundSourcesService from 'services/fundSources';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import ServiceCharges from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <DetailsContext.Provider value={mockDetailsProvider}>
      {children}
    </DetailsContext.Provider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'getServiceCharges').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 820988003,
          amount: '145',
          utr: '233515713088',
          processedOn: '2022-12-01T15:35:40+05:30',
          remarks: 'This is a remark',
        },
      ],
      hasNext: false,
    }),
  );

  jest
    .spyOn(FundSourcesService, 'getServiceChargesCount')
    .mockImplementation(() =>
      Promise.resolve({
        count: 1,
      }),
    );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In ServiceCharges Container', () => {
  test('checks render', async () => {
    render(<ServiceCharges />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(FundSourcesService.getServiceCharges).toHaveBeenCalledWith(39240, {
        size: 10,
        startDate: moment()
          .subtract(6, 'days')
          .startOf('day')
          .format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
        lastId: '0',
      });
      expect(FundSourcesService.getServiceChargesCount).toHaveBeenCalledWith(
        39240,
        {
          size: 10,
          startDate: moment()
            .subtract(6, 'days')
            .startOf('day')
            .format(FORMATS.START_DATE),
          endDate: moment().format(FORMATS.END_DATE),
          lastId: '0',
        },
      );
    });

    await waitFor(() => {
      expect(screen.queryByText('This is a remark')).toBeInTheDocument();
      expect(screen.queryByText('233515713088')).toBeInTheDocument();
      expect(screen.queryByText('₹ 145.00')).toBeInTheDocument();
      expect(
        screen.queryByText(
          /We automatically debit the service charges from this fund source/,
        ),
      ).toBeInTheDocument();
    });
  });
});
