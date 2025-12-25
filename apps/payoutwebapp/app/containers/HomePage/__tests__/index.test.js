import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import HomePage from '..';

const renderer = new ShallowRenderer();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    activePageId: 'developers',
  }),
}));

Object.defineProperty(window, 'location', {
  value: {
    pathname: '/payoutwebapp/developers/integration-checklist',
  },
});

// Mocking MFE Module
jest.mock('RiskShieldWebApp/RiskShield', () => {}, { virtual: true });

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

describe('In HomePage Container', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <HomePage />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', () => {
    render(<HomePage />, { wrapper: CustomWrapper });

    expect(screen.queryByText('Summary')).toBeInTheDocument();
    expect(screen.queryByText('PAYOUT PRODUCTS')).toBeInTheDocument();
    expect(screen.queryByText('Integration Checklist')).toBeInTheDocument();
  });
});
