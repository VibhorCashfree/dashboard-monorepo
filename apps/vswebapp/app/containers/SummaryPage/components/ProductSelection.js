import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import {
  Space,
  Text,
  Button,
  Tab,
  Modal,
  Icon as CoherentIcon,
  Checkbox,
  Amount,
} from '@cashfree-intl/coherent';
import _debounce from 'lodash/debounce';
import _findKey from 'lodash/findKey';
import _some from 'lodash/some';
import _get from 'lodash/get';
import _difference from 'lodash/difference';
import { ThemeContext } from 'styled-components';

// Actions
import fetchFavouriteProductsAction from 'redux/actions/fetchFavouriteProducts';

// Constants
import { menuConfig } from 'constants/common';
import { PRODUCT_MAPPING } from 'constants/products';

// Components
import Icon from 'components/Icon';

// Provider
import { AccountContext } from 'providers/AccountProvider';

// Helpers
import { getProductOptions } from '../helpers';

// Services
import { updateFavouriteProducts } from 'services/accounts';

// Styled
import {
  StyleDropdown,
  StyleSpace,
  StyledBtnContainer,
  StyledTextWithBg,
  StyledHeight,
} from '../styled';

const ProductSelection = ({
  setModalType,
  favouriteProducts,
  fetchFavouriteProducts,
}) => {
  const { COLORS } = useContext(ThemeContext);
  const { freeCreditRates, accountInfo } = useContext(AccountContext);

  const [section, setSection] = useState('bav');
  const [selected, setSelected] = useState(favouriteProducts);

  const disabled = selected.length > 15 || selected.length === 0;

  const handleSelect = val => {
    const currentIndex = selected.indexOf(val);

    if (currentIndex >= 0) {
      const newSelected = selected.filter(oldVal => oldVal !== val);

      setSelected(newSelected);
    } else {
      setSelected(prev => [...prev, val]);
    }
  };

  let debounceFn = _debounce(code => {
    const productSection = _findKey(PRODUCT_MAPPING, value =>
      _some(value, { code: code }),
    );

    setSection(productSection);
  }, 800);

  const handleChange = (e, { value }) => debounceFn(value);

  const onTabChange = (e, { activeIndex }) => {
    const productSection = Object.keys(PRODUCT_MAPPING)[activeIndex];

    setSection(productSection);
  };

  const handleSubmit = async () => {
    const remove = _difference(favouriteProducts, selected);
    const add = _difference(selected, favouriteProducts);

    const requestBody = {
      add,
      remove,
      updatedBy: _get(accountInfo, 'name', ''),
    };

    const response = await updateFavouriteProducts(requestBody);

    if (!response.error) {
      fetchFavouriteProducts();
      setModalType();
    }
  };

  return (
    <Modal open style={{ width: '1015px' }}>
      <Space direction="column" gap={2} className="mx-3 mt-3 mb-4">
        <Text variant="h16" strong>
          Search and select the products you use for quick access.
        </Text>
        <StyleDropdown
          icon={<CoherentIcon name="search-icon" />}
          search
          placeholder="Search a product by its name... Ex: PAN"
          options={getProductOptions()}
          onChange={handleChange}
        />

        <Tab
          menu={menuConfig}
          activeIndex={Object.keys(PRODUCT_MAPPING).indexOf(section)}
          onTabChange={onTabChange}
          panes={[
            {
              menuItem: 'Bank Account',
              key: 'bav',
              render: () => (
                <StyledHeight>
                  {PRODUCT_MAPPING.bav.map(
                    ({ displayText, code, icon }, index) => (
                      <StyleSpace
                        first={index === 0}
                        justifyContent="space-between"
                        alignItems="center"
                        className="py-2 pointer mr-1"
                        onClick={() => handleSelect(code)}
                      >
                        <Space gap={1.5} alignItems="center">
                          <Checkbox checked={selected.includes(code)} />
                          <Icon
                            width={28}
                            height={28}
                            name={icon}
                            fill={
                              selected.includes(code)
                                ? COLORS.primary
                                : COLORS.placeholder
                            }
                          />
                          <Text variant="h16">{displayText}</Text>
                        </Space>
                        <StyledTextWithBg variant="b14" color="warning" strong>
                          {Amount.formatAmount(freeCreditRates[code])}{' '}
                          <Text as="span" color="placeholder">
                            /
                          </Text>
                          <Text as="span" color="bodyLight">
                            {' '}
                            API
                          </Text>
                        </StyledTextWithBg>
                      </StyleSpace>
                    ),
                  )}
                </StyledHeight>
              ),
            },
            {
              menuItem: 'Aadhaar/PAN',
              key: 'aadhar-pan',
              render: () => (
                <StyledHeight>
                  {PRODUCT_MAPPING['aadhar-pan'].map(
                    ({ displayText, code, icon }, index) => (
                      <StyleSpace
                        first={index === 0}
                        justifyContent="space-between"
                        alignItems="center"
                        className="py-2 pointer mr-1"
                        onClick={() => handleSelect(code)}
                      >
                        <Space gap={1.5} alignItems="center">
                          <Checkbox checked={selected.includes(code)} />
                          <Icon
                            width={28}
                            height={28}
                            name={icon}
                            fill={
                              selected.includes(code)
                                ? COLORS.primary
                                : COLORS.placeholder
                            }
                          />
                          <Text variant="h16">{displayText}</Text>
                        </Space>
                        <StyledTextWithBg variant="b14" color="warning" strong>
                          {Amount.formatAmount(freeCreditRates[code])}{' '}
                          <Text as="span" color="bodyLight">
                            /
                          </Text>
                          <Text as="span"> API</Text>
                        </StyledTextWithBg>
                      </StyleSpace>
                    ),
                  )}
                </StyledHeight>
              ),
            },
            {
              menuItem: 'Regulated Digital KYC',
              key: 'digital-kyc',
              render: () => (
                <StyledHeight>
                  {PRODUCT_MAPPING['digital-kyc'].map(
                    ({ displayText, code, icon }, index) => (
                      <StyleSpace
                        first={index === 0}
                        justifyContent="space-between"
                        alignItems="center"
                        className="py-2 pointer mr-1"
                        onClick={() => handleSelect(code)}
                      >
                        <Space gap={1.5} alignItems="center">
                          <Checkbox checked={selected.includes(code)} />
                          <Icon
                            width={28}
                            height={28}
                            name={icon}
                            fill={
                              selected.includes(code)
                                ? COLORS.primary
                                : COLORS.placeholder
                            }
                          />
                          <Text variant="h16">{displayText}</Text>
                        </Space>
                        <StyledTextWithBg variant="b14" color="warning" strong>
                          {Amount.formatAmount(freeCreditRates[code])}{' '}
                          <Text as="span" color="bodyLight">
                            /
                          </Text>
                          <Text as="span"> API</Text>
                        </StyledTextWithBg>
                      </StyleSpace>
                    ),
                  )}
                </StyledHeight>
              ),
            },
            {
              menuItem: 'Other Official Documents',
              key: 'alternate-id',
              render: () => (
                <StyledHeight>
                  {PRODUCT_MAPPING['alternate-id'].map(
                    ({ displayText, code, icon }, index) => (
                      <StyleSpace
                        first={index === 0}
                        justifyContent="space-between"
                        alignItems="center"
                        className="py-2 pointer mr-1"
                        onClick={() => handleSelect(code)}
                      >
                        <Space gap={1.5} alignItems="center">
                          <Checkbox checked={selected.includes(code)} />
                          <Icon
                            width={28}
                            height={28}
                            name={icon}
                            fill={
                              selected.includes(code)
                                ? COLORS.primary
                                : COLORS.placeholder
                            }
                          />
                          <Text variant="h16">{displayText}</Text>
                        </Space>
                        <StyledTextWithBg variant="b14" color="warning" strong>
                          {Amount.formatAmount(freeCreditRates[code])}{' '}
                          <Text as="span" color="bodyLight">
                            /
                          </Text>
                          <Text as="span"> API</Text>
                        </StyledTextWithBg>
                      </StyleSpace>
                    ),
                  )}
                </StyledHeight>
              ),
            },
            {
              menuItem: 'KYB (Know your business)',
              key: 'kyb',
              render: () => (
                <StyledHeight>
                  {PRODUCT_MAPPING.kyb.map(
                    ({ displayText, code, icon }, index) => (
                      <StyleSpace
                        first={index === 0}
                        justifyContent="space-between"
                        alignItems="center"
                        className="py-2 pointer mr-1"
                        onClick={() => handleSelect(code)}
                      >
                        <Space gap={1.5} alignItems="center">
                          <Checkbox checked={selected.includes(code)} />
                          <Icon
                            width={28}
                            height={28}
                            name={icon}
                            fill={
                              selected.includes(code)
                                ? COLORS.primary
                                : COLORS.placeholder
                            }
                          />
                          <Text variant="h16">{displayText}</Text>
                        </Space>
                        <StyledTextWithBg variant="b14" color="warning" strong>
                          {Amount.formatAmount(freeCreditRates[code])}{' '}
                          <Text as="span" color="bodyLight">
                            /
                          </Text>
                          <Text as="span"> API</Text>
                        </StyledTextWithBg>
                      </StyleSpace>
                    ),
                  )}
                </StyledHeight>
              ),
            },
          ]}
        />
      </Space>
      <StyledBtnContainer className="m-0 px-2 py-3">
        <Button
          as="a"
          link
          data-event-name=" Form_ProductSelection_SecondaryButton"
          onClick={() => setModalType('')}
        >
          Cancel
        </Button>
        <Button
          data-event-name=" Form_ProductSelection_PrimaryButton"
          primary
          className="ml-4"
          onClick={handleSubmit}
          disabled={disabled}
        >
          Update
        </Button>
      </StyledBtnContainer>
    </Modal>
  );
};

const mapStateToProps = ({ favouriteProducts }) => ({
  favouriteProducts,
});

const mapDispatchToProps = dispatch => ({
  fetchFavouriteProducts: () => dispatch(fetchFavouriteProductsAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(ProductSelection);
