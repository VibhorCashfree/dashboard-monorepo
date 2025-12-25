import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Components
import { CustomFilterPopover as FilterPopover } from '..';
import Wrapper from '__tests__/components/Wrapper';

const renderer = new ShallowRenderer();

describe('FilterPopover', () => {
  const options = [
    { text: 'Beneficiary ID', value: 'beneId' },
    { text: 'Beneficiary Phone No.', value: 'phone' },
    { text: 'Bank A/c Number', value: 'bankAccount' },
  ];

  const filters = {};

  const filtersConfig = {
    'Status Filter': {
      columns: 2,
      items: ['REJECTED', 'CANCELLED', 'SUCCESS'],
    },
  };

  const labelByStatus = {
    REJECTED: 'Rejected',
    CANCELLED: 'Cancelled',
    SUCCESS: 'Success',
  };

  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <FilterPopover
          searchOptions={options}
          value={filters}
          onChange={jest.fn()}
          config={filtersConfig}
          labelByStatus={labelByStatus}
        />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('Check Render of Filterpopover', async () => {
    render(
      <FilterPopover
        searchOptions={options}
        value={filters}
        onChange={jest.fn()}
        config={filtersConfig}
        labelByStatus={labelByStatus}
      />,
      {
        wrapper: Wrapper,
      },
    );

    fireEvent.click(screen.queryByText(/Search & Filter/));

    await waitFor(() => {
      expect(screen.queryByText('Clear All')).toBeInTheDocument();
      expect(screen.queryByText('Apply')).toBeInTheDocument();

      document
        .querySelector('.ui.fluid.left.labeled.input > .ui.dropdown')
        .click();
      document
        .querySelector('.visible.menu.transition > .item:last-child')
        .click();

      expect(
        screen.queryByPlaceholderText('Enter Bank A/c Number'),
      ).toBeInTheDocument();

      document.querySelector('.content > .accordion.ui > .title').click();
    });
  });
});
