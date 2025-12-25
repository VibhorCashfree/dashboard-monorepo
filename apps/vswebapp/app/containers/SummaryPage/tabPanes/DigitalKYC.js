import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Space,
  Text,
  Button,
  Amount,
  ProductTile,
  Tab,
} from '@cashfree-intl/coherent';

// Constants
import { PRODUCT_MAPPING } from 'constants/products';

// Components
import Icon from 'components/Icon';

// Provider
import { AccountContext } from 'providers/AccountProvider';

// Styled
import { StyledTabPane } from '../styled';

const children = (description, docs) => (
  <Space direction="column" gap={1} alignItems="flex-start">
    <Text variant="b14" color="bodyLight">
      {description}
    </Text>
    <Button
      as="a"
      link
      className="p-0"
      onClick={event => {
        event.stopPropagation();
        window.open(docs, '_blank');
      }}
    >
      Learn more
    </Button>
  </Space>
);

const DigitalKyc = ({ favouriteProducts }) => {
  const navigate = useNavigate();
  const { freeCreditRates } = useContext(AccountContext);
  const products = PRODUCT_MAPPING['digital-kyc'];

  return (
    <StyledTabPane attached={false}>
      <Space direction="column" gap={0.8}>
        <Text variant="h16" strong>
          Regulated Digital KYC
        </Text>
        <Text variant="b14">
          Explore and experience our products before you activate your account.
        </Text>
      </Space>
      <Space gap={3} className="pt-3" wrap>
        {products.map(({ displayText, code, icon, key, description, docs }) => (
          <ProductTile
            variant="explore"
            title={displayText}
            productIcon={<Icon name={icon} width={28} height={28} />}
            description={children(description, docs)}
            buttonText={favouriteProducts.includes(code) ? 'Open' : 'Explore'}
            onClick={() => navigate(`/${key}`)}
            ribbon={
              <Text variant="b12" color="warning">
                {freeCreditRates?.[code]
                  ? Amount.formatAmount(freeCreditRates[code])
                  : '–'}{' '}
                <Text as="span" color="placeholder">
                  /
                </Text>
                <Text as="span" color="bodyLight">
                  {' '}
                  API
                </Text>
              </Text>
            }
          />
        ))}
      </Space>
    </StyledTabPane>
  );
};

const mapStateToProps = ({ favouriteProducts }) => ({
  favouriteProducts,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withConnect(DigitalKyc);
