import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Hocs
import withReadPermission from '../withReadPermission';

describe('withReadPermission Hocs', () => {
  test('withReadPermission()', async () => {
    const Component = withReadPermission(() => <div>This is Header</div>, {
      code: 21001,
      description: 'access this header',
    });

    render(
      <Wrapper>
        <Component />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/This is Header/i)).toBeInTheDocument();
    });

    render(
      <Wrapper
        contextValues={[
          {
            activationDetails: {
              userType: 'MERCHANT_ALIAS',
              CSP: 'APPROVED',
            },
            accountList: [],
            permissionCodes: [],
          },
        ]}
      >
        <Component />
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
