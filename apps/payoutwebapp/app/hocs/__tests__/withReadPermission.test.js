import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthContext } from '@cashfree-intl/auth';

// Constants
import { USER_TYPE } from 'constants/common';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Hocs
import withReadPermission from '../withReadPermission';

const Component = withReadPermission(() => <div>This is Header</div>, {
  code: 21001,
  description: 'access this header',
});

describe('withReadPermission Hocs', () => {
  test('withReadPermission()', async () => {
    render(
      <Wrapper>
        <AuthContext.Provider
          value={{
            loading: false,
            permissionCodes: [21001],
            isAlias: true,
            updateUserDetails: jest.fn(),
          }}
        >
          <Component />
        </AuthContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/This is Header/i)).toBeInTheDocument();
    });
  });

  test('withReadPermission()', async () => {
    render(
      <Wrapper>
        <AuthContext.Provider
          value={{
            loading: false,
            permissionCodes: [],
            isAlias: false,
            updateUserDetails: jest.fn(),
          }}
        >
          <Component />
        </AuthContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/This is Header/i)).toBeInTheDocument();
    });
  });

  test('withReadPermission()', async () => {
    render(
      <Wrapper
        contextValues={[
          {
            merchantDetails: {
              userType: USER_TYPE.MERCHANT_ALIAS,
              CSP: 'APPROVED',
            },
            accountList: [],
          },
        ]}
      >
        <AuthContext.Provider
          value={{
            loading: true,
            permissionCodes: [],
            isAlias: true,
            updateUserDetails: jest.fn(),
          }}
        >
          <Component />
        </AuthContext.Provider>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(
        screen.queryByText(
          /You do not have the permission to access this header./i,
        ),
      ).toBeInTheDocument();
    });
  });
});
