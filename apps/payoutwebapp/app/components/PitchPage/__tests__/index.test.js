import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Image, Theme } from '@cashfree-intl/coherent';

// Services
import * as AccountsService from 'services/accounts';

// Images
import logoIcon from 'images/pitch-page/logos/global-payouts.svg';
import thumbnail from 'images/pitch-page/thumbnails/global-payouts-pitch.png';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import PitchPage from '..';
import Modals from '../components/Modals';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

// eslint-disable-next-line react/prop-types
jest.mock('components/VideoEmbedModal', () => ({ embedKey, onClose }) => (
  <div data-testid="video-embed-modal" onClick={onClose}>
    Video Embed Modal: {embedKey}
  </div>
));

beforeEach(() => {
  jest.mock('services/transfers');

  jest.spyOn(AccountsService, 'getPitchCardDetails').mockImplementation(() =>
    Promise.resolve({
      data: {
        productCards: [{ productName: 'Payouts', cta: 'Ready to Request' }],
      },
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('PitchPage', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <PitchPage
          title={
            <>
              <Image inline className="mr-1 mb-1" src={logoIcon} /> Global
              Payouts - Send Money to India
            </>
          }
          product="Global Payouts"
          descriptions={['Lorem ipsum dolor sit amet']}
          features={[
            {
              heading: 'heading1',
              body: 'consectetur adipisicing elit',
            },
          ]}
          thumbnail={thumbnail}
          embedKey="PITCH_GLOBAL_PAYOUTS"
        />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(
      <PitchPage
        title={
          <>
            <Image inline className="mr-1 mb-1" src={logoIcon} /> Global Payouts
            - Send Money to India
          </>
        }
        product="Global Payouts"
        descriptions={['Lorem ipsum dolor sit amet']}
        features={[
          {
            heading: 'heading1',
            body: 'consectetur adipisicing elit',
          },
        ]}
        thumbnail={thumbnail}
        embedKey="PITCH_GLOBAL_PAYOUTS"
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('heading1')).toBeInTheDocument();
      expect(
        screen.queryByText('How does Global Payouts work?'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Global Payouts - Send Money to India'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('consectetur adipisicing elit'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Lorem ipsum dolor sit amet'),
      ).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    render(
      <Modals
        modalType={MODAL_TYPE.CONFIRM}
        setModalType={jest.fn()}
        handleActivation={jest.fn()}
        embedKey="DEVELOPERS"
        product="Global Payouts"
        activationContent="Activation Content"
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('I agree'));
      expect(screen.queryByText('Activate Global Payouts'));
      expect(screen.getByText('Activation Content')).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const handleActivation = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.CONFIRM}
        setModalType={jest.fn()}
        handleActivation={handleActivation}
        embedKey="DEVELOPERS"
        product="Global Payouts"
        activationContent="Activation Content"
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText('I agree'));
    expect(handleActivation).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.CONFIRM}
        setModalType={setModalType}
        handleActivation={jest.fn()}
        embedKey="DEVELOPERS"
        product="Global Payouts"
        activationContent="Activation Content"
      />,
      { wrapper: Wrapper },
    );

    const cancelButton = screen.queryByRole('button', {
      name: 'Cancel',
    });

    fireEvent.click(cancelButton);
    expect(setModalType).toHaveBeenCalledWith(MODAL_TYPE.EMPTY);
  });

  test('checks Modals render', async () => {
    render(
      <Modals
        modalType={MODAL_TYPE.EMBED}
        setModalType={jest.fn()}
        handleActivation={jest.fn()}
        embedKey="DEVELOPERS"
        product="Global Payouts"
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.getByTestId('video-embed-modal')).toBeInTheDocument();
      expect(screen.queryByText('Video Embed Modal: DEVELOPERS'));
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.EMBED}
        setModalType={setModalType}
        handleActivation={jest.fn()}
        embedKey="DEVELOPERS"
        product="Global Payouts"
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByTestId('video-embed-modal'));
    expect(setModalType).toHaveBeenCalledWith(MODAL_TYPE.EMPTY);
  });

  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach((key) => {
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
