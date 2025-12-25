import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Services
import * as BeneficiariesService from 'services/beneficiaries';

// Components
import Wrapper from '__tests__/components/Wrapper';
import BeneficiarySearch from '..';

const shallowRenderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('services/beneficiaries');

  jest.spyOn(BeneficiariesService, 'getSuggestions').mockImplementation(() =>
    Promise.resolve({
      entries: [
        {
          beneId: 'hello',
          name: 'shirish',
          modes: ['amazonpay', 'paytm', 'phone'],
        },
        {
          beneId: 'hello_rk123',
          name: 'rohit kumar',
          modes: ['amazonpay', 'paytm', 'phone'],
        },
        {
          beneId: 'hello1',
          name: 'tushafasdfafr',
          modes: ['amazonpay', 'paytm', 'banktransfer', 'phone'],
        },
        {
          beneId: 'hello123',
          name: 'tushafasdfafr',
          modes: ['amazonpay', 'paytm', 'banktransfer', 'phone'],
        },
        {
          beneId: 'hellosdfsdf',
          name: 'ssdfsdf',
          modes: ['amazonpay', 'paytm', 'phone'],
        },
        {
          beneId: 'hellosdsdf',
          name: 'shirishsdfsdf',
          modes: ['amazonpay', 'paytm', 'phone'],
        },
      ],
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('BeneficiarySearch', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <BeneficiarySearch
          name="beneId"
          error="Some error occured with Beneficiary"
          value="test123"
          onChange={jest.fn()}
        />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render with error', async () => {
    const onChange = jest.fn();

    render(
      <BeneficiarySearch
        name="beneId"
        error="Some error occured with Beneficiary"
        value="test123"
        onChange={onChange}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      // expect(screen.queryByText('No beneficiary found')).toBeInTheDocument();
      expect(
        screen.queryByText('Some error occured with Beneficiary'),
      ).toBeInTheDocument();

      const input = screen.queryByPlaceholderText('Enter Beneficiary ID');
      expect(input.value).toBe('test123');
    });
  });

  test('checks render', async () => {
    const onChange = jest.fn();

    render(<BeneficiarySearch name="beneId" onChange={onChange} />, {
      wrapper: Wrapper,
    });

    await waitFor(async () => {
      expect(screen.queryByText('Beneficiary ID')).toBeInTheDocument();

      const input = screen.queryByPlaceholderText('Enter Beneficiary ID');

      await userEvent.clear(input);
      await userEvent.type(input, 'zzz');

      expect(input.value).toBe('zzz');

      // expect(BeneficiariesService.getSuggestions).toHaveBeenCalledWith('zzz');
    });
  });
});
