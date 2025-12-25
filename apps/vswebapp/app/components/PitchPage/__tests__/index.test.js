import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import PitchPage from '..';

// Styled
import * as StyledComponents from '../styled';

describe('PitchPage', () => {
  test('checks Pitch Page - PAN', async () => {
    render(<PitchPage productCode="PAN" />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Integrate PAN OCR API'));

      fireEvent.click(screen.queryByText('View API Docs'));

      document.querySelector('.text-section').lastChild.children[0].click();
    });
  });

  test('checks Modals render', async () => {
    render(
      <Modals
        modalType={MODAL_TYPES.EMBED}
        setModalType={jest.fn()}
        embedKey="BAV"
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByRole('video-embed')).toBeInTheDocument();
    });
  });

  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach(key => {
      const StyledComponent = StyledComponents[key];

      const tree = renderer
        .create(
          <Theme>
            <StyledComponent />
          </Theme>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
