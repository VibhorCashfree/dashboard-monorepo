import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Space,
  Text,
  Button,
  Amount,
  ProductTile,
  Tab,
  Conditional,
  Popup,
  Icon as CoherentIcon,
} from '@cashfree-intl/coherent';
import { usePermissionCode } from '@cashfree-intl/auth';

import ConfettiExplosion from 'react-confetti-explosion';
import _debounce from 'lodash/debounce';
import _findKey from 'lodash/findKey';
import _some from 'lodash/some';
import _size from 'lodash/size';
import _get from 'lodash/get';
import _find from 'lodash/find';
import moment from 'moment';

// Actions
import fetchAvailableBalanceAction from 'redux/actions/fetchAvailableBalance';

// Constants
import { menuConfig } from 'constants/common';
import { PRODUCT_MAPPING, PRODUCTS } from 'constants/products';
import { now } from 'constants/date';

// Components
import SummaryCard from 'components/SummaryCard';
import Icon from 'components/Icon';
import AadhaarPan from './tabPanes/AadhaarPan';
import AlternateId from './tabPanes/AlternateId';
import BankAccount from './tabPanes/BankAccount';
import DigitalKYC from './tabPanes/DigitalKYC';
import KnowYourBusiness from './tabPanes/KnowYourBusiness';
import Modals from './components/Modals';
import Loader from 'components/Loader';
import JoyrideComponent from 'components/Joyride';
import CanWrite from 'components/CanWrite';

// Helpers
import { getProductOptions } from './helpers';

// Images
import integrateIcon from 'images/integrate.svg';
import plusIcon from 'images/plus.svg';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { MerchantContext } from 'providers/MerchantProvider';
import { useTour } from 'providers/TourProvider';

// Styled
import {
  StyledButton,
  StyleDropdown,
  StyledExpiry,
  StyledRequest,
  StyledMessage,
  StyledDetail,
} from './styled';
import { Divider } from 'styled/common';

// Utils
import Env from 'utils/env';
import { formatAmountINR } from 'utils/common';

const defaultPanes = [
  {
    menuItem: 'Bank Account',
    key: 'bav',
    render: () => <BankAccount />,
  },
  {
    menuItem: 'Aadhaar/PAN',
    key: 'aadhar-pan',
    render: () => <AadhaarPan />,
  },
  {
    menuItem: 'Regulated Digital KYC',
    key: 'digital-kyc',
    render: () => <DigitalKYC />,
  },
  {
    menuItem: 'Other Official Documents',
    key: 'alternate-id',
    render: () => <AlternateId />,
  },
  {
    menuItem: 'KYB (Know your business)',
    key: 'kyb',
    render: () => <KnowYourBusiness />,
  },
];

const Summary = ({
  freeCredits,
  availableBalance,
  fetchAvailableBalance,
  favouriteProducts,
}) => {
  const navigate = useNavigate();

  const { accountList, activationDetails } = useContext(MerchantContext);
  const { fundSourceDetails, accountInfo } = useContext(AccountContext);
  const { startTour, setRunTour } = useTour();

  const { formatAmount } = Amount;

  const [modalType, setModalType] = useState('');
  const [section, setSection] = useState('bav');
  const [isExploding, setIsExploding] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const developerDiv = document?.querySelectorAll('.accordion.ui.fluid')?.[1];

    startTour([
      {
        title: 'The Developers section',
        content:
          'Browse these screens to generate API keys, configure two-factor authentication and webhooks.',
        target: developerDiv,
        disableBeacon: true,
      },
      {
        title: 'API Keys',
        content: 'You will first need to create API Keys',
        target: 'redirect',
        disableBeacon: true,
        redirect: '/developers/api-keys?tour=true',
      },
    ]);

    return () => setRunTour(false);
  }, []);

  useEffect(() => {
    if (!_size(accountList)) {
      return;
    }
    setLoader(true);
    fetchAvailableBalance(_get(fundSourceDetails, 'paymentInstrumentId'));

    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [refresh]);

  useEffect(() => {
    if (!Object.keys(freeCredits).length) {
      return;
    }

    if (Env.isTest() || freeCredits.valid) {
      setModalType();
    } else {
      setModalType('FREE_CREDITS');
    }
  }, [freeCredits]);

  let debounceFn = _debounce(code => {
    const productSection = _findKey(PRODUCT_MAPPING, value =>
      _some(value, { code: code }),
    );

    setSection(productSection);
  }, 300);

  const handleChange = (e, { value }) => debounceFn(value);

  const onTabChange = (e, { activeIndex }) => {
    const productSection = Object.keys(PRODUCT_MAPPING)[activeIndex];

    setSection(productSection);
  };

  const handleCelebration = () => {
    setModalType();
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
    }, 3000);
  };

  const isVRSProduct = fundSourceDetails?.product === 'VRS';

  const expiryDate = new Date(freeCredits.expiryDate);
  const differenceInDays = Math.floor((expiryDate - now) / 86400000);
  const freeCreditsExist = differenceInDays > 0;
  const hasViewBalancePermission = usePermissionCode(21503);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mb-3"
      >
        <Text variant="h20">Home</Text>
        <div id="integrateNow">
          <Space>
            <Button
              secondary
              size="small"
              icon={integrateIcon}
              iconPosition="right"
              onClick={() => setRunTour(true)}
            >
              Steps To Integrate
            </Button>
          </Space>
        </div>
      </Space>

      <Space className="mb-6" gap={3}>
        <SummaryCard>
          <SummaryCard.Header>
            <Text variant="b14" strong color="bodyLight">
              {isVRSProduct ? 'Secure ID Wallet' : 'Cashfree Wallet'}
            </Text>
            {isVRSProduct ? (
              <Popup
                position="top center"
                content="This wallet can only be used for Secure ID products."
                trigger={
                  <span>
                    <CoherentIcon name="info-small" />
                  </span>
                }
              />
            ) : null}
          </SummaryCard.Header>
          <SummaryCard.Content>
            {isExploding && (
              <ConfettiExplosion
                duration={2500}
                width={600}
                particleCount={50}
                force={0.6}
              />
            )}
            <Conditional if={!hasViewBalancePermission}>
              <Space direction="column" gap={1.2}>
                <Text variant="b14" color="bodyLight">
                  Total Balance
                </Text>
                <StyledRequest variant="b14" strong color="warning">
                  Request Permission To View Balance
                </StyledRequest>
              </Space>
            </Conditional>
            <Conditional if={hasViewBalancePermission}>
              <Space justifyContent="space-between" alignItems="baseline">
                <Space direction="column" gap={1.2}>
                  <Text variant="b14" color="bodyLight">
                    Total Balance
                  </Text>
                  <Text variant="h28" strong>
                    ₹{' '}
                    {formatAmountINR(
                      (
                        Number(freeCreditsExist ? freeCredits.amount : 0) +
                        Number(availableBalance.availableBalance || 0)
                      ).toFixed(2),
                    ) || 0}
                  </Text>
                </Space>

                <div>
                  <StyledButton
                    secondary
                    icon={plusIcon}
                    size="small"
                    iconPosition="right"
                    onClick={() => setModalType('RECHARGE')}
                  >
                    Recharge
                  </StyledButton>
                </div>
              </Space>
            </Conditional>

            <CanWrite code={21503} remove>
              <Space justifyContent="space-between" alignItems="center">
                <Text variant="b14" color="bodyLight">
                  Last updated at {moment().format('hh:mm A')}
                </Text>
                <Button
                  link
                  icon={<Icon name="refresh" />}
                  className="cursor"
                  onClick={() => setRefresh(prev => prev + 1)}
                >
                  Refresh
                </Button>
              </Space>
            </CanWrite>

            {freeCreditsExist || hasViewBalancePermission ? (
              <Divider contain className="my-2" />
            ) : null}

            <CanWrite code={21503} remove>
              <Space
                justifyContent="space-between"
                alignItems="center"
                className="mb-1"
              >
                <Text variant="b12" color="bodyLight">
                  Your Balance
                </Text>
                <span>
                  {formatAmount(availableBalance.availableBalance || 0)}
                </span>
              </Space>
              {freeCreditsExist ? (
                <Space direction="column" gap={1}>
                  <Space justifyContent="space-between" alignItems="center">
                    <Space gap={1} alignItems="center">
                      <Text variant="b12" color="bodyLight">
                        Free Credits
                      </Text>
                      <StyledExpiry variant="b12" color="danger">
                        Expires in {differenceInDays} Days
                      </StyledExpiry>
                    </Space>

                    <span>{formatAmount(freeCredits.amount)}</span>
                  </Space>
                </Space>
              ) : null}
            </CanWrite>
          </SummaryCard.Content>
          <Conditional if={!hasViewBalancePermission}>
            <StyledMessage variant="b14">
              The alias account you use does not have the permission to view the
              balance. You can permit this account from Access Manager using the
              main account
            </StyledMessage>
          </Conditional>
        </SummaryCard>

        <SummaryCard style={{ height: '100%' }}>
          <SummaryCard.Header>
            <Text variant="b14" strong color="bodyLight">
              Merchant Details
            </Text>
          </SummaryCard.Header>
          <SummaryCard.Content>
            <Space direction="column" gap={1}>
              <StyledDetail>
                <Text color="bodyLight">Name:</Text>
                <Text>{accountInfo?.name || '–'}</Text>
              </StyledDetail>
              <StyledDetail>
                <Text color="bodyLight">Phone:</Text>
                <Text>{accountInfo?.phone || '–'}</Text>
              </StyledDetail>
              <StyledDetail>
                <Text color="bodyLight">Merchant ID:</Text>
                <Text>{localStorage.getItem('merchantId') || '–'}</Text>
              </StyledDetail>
              <StyledDetail>
                <Text color="bodyLight">Account ID:</Text>
                <Text>{accountInfo?.id || '–'}</Text>
              </StyledDetail>
            </Space>
          </SummaryCard.Content>
        </SummaryCard>
      </Space>

      <Space direction="column" className="mb-6" gap={3}>
        <Space direction="column" gap={1}>
          <Text variant="h20">My Products</Text>
          <Text color="bodyLight">
            Add and edit products here for quick access to the ones you use
            frequently.
          </Text>
        </Space>
        <Space gap={3} wrap>
          {_size(Object.keys(favouriteProducts))
            ? favouriteProducts.map(product => {
                const selected = _find(PRODUCTS, { code: product });
                const { displayText, icon, key } = selected;

                return (
                  <ProductTile
                    variant="view"
                    title={displayText}
                    productIcon={<Icon name={icon} width="28" height="28" />}
                    onClick={() => navigate(`/${key}`)}
                  />
                );
              })
            : null}
          <ProductTile
            variant="add"
            buttonText="Manage Your Products"
            onClick={() => setModalType('PRODUCT_SELECT')}
          />
        </Space>
      </Space>

      <Space direction="column" gap={3} className="mb-3">
        <Space direction="column" gap={1} className="mb-1">
          <Text variant="h20">All Products</Text>
          <Text color="bodyLight">
            Explore other products that might suit your business needs.
          </Text>
          <StyleDropdown
            icon={<CoherentIcon name="search-icon" />}
            search
            placeholder="Search a product by its name... Ex: PAN"
            options={getProductOptions()}
            onChange={handleChange}
          />
        </Space>

        <Tab
          menu={menuConfig}
          panes={defaultPanes}
          activeIndex={Object.keys(PRODUCT_MAPPING).indexOf(section)}
          onTabChange={onTabChange}
        />
      </Space>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          handleCelebration={handleCelebration}
        />
      )}

      <JoyrideComponent />
    </>
  );
};

const mapStateToProps = ({
  availableBalance,
  freeCredits,
  favouriteProducts,
}) => ({
  availableBalance,
  freeCredits,
  favouriteProducts,
});

const mapDispatchToProps = dispatch => ({
  fetchAvailableBalance: obj => dispatch(fetchAvailableBalanceAction(obj)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(Summary);
