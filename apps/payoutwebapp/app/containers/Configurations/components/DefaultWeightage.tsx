import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  toast,
  Form,
  Grid,
  Row,
  Column,
  Loader,
  Image,
  Text,
  InputWithAction,
  Button,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';
import _sumBy from 'lodash/sumBy';

// Hocs
import withReadPermission from 'hocs/withReadPermission';
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { AGGREGATOR } from 'constants/fundSources';

// Providers
import { useMerchant } from 'providers/MerchantProvider';

// Services
import { getWeightage, updateWeightage } from 'services/fundSources';

// Utils
import hasPermission from 'utils/hasPermission';
import Regex from 'utils/regex';

// Images
import razorpayIcon from 'images/banks/razorpay.svg';
import cashfreeIcon from 'images/cashfree.svg';

// Components
import MetaTags from 'components/MetaTags';

// Styled
import { Divider, BtnContainer } from 'styled/common';

// Types
import type { DefaultWeightageProps } from '../types';

const DefaultWeightage: React.FC<DefaultWeightageProps> = ({ fundSources }) => {
  const { merchantDetails, restrictionCodes } = useMerchant();

  const [data, setData] = useState<Weightage[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      const response = await getWeightage({ source: 'DASHBOARD' });

      if (!('error' in response)) {
        setData(response);
      }
    })();
  }, []);

  const canUpdate: boolean = hasPermission(
    restrictionCodes,
    merchantDetails.userType,
    [27002],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: number; value: string },
  ) => {
    if (!Regex.digits(value)) {
      return;
    }

    // @ts-ignore
    e.target.value = Number(e.target.value);

    // @ts-ignore
    setData((prev) =>
      prev!.map((item) => {
        if (item.id === name) {
          return {
            ...item,
            weightage: +value,
          };
        }

        return item;
      }),
    );
  };

  const handleUpdate = async () => {
    setLoading(true);

    const body = {
      fundsources: data!.map(({ id, weightage }) => ({
        id,
        weightage: +weightage,
      })),
    };

    const response = await updateWeightage(body);

    setLoading(false);

    if (!('error' in response)) {
      toast.success('Fund Source weightage updated successfully');
    }
  };

  const total: number = _sumBy(data, (item) => +item.weightage);

  const hasError: boolean =
    total !== 100 || data!.some((item) => item.weightage === '') || !canUpdate;

  if (!data) {
    return <Loader active />;
  }

  const fundSourceById = _keyBy(fundSources, 'paymentInstrumentId');

  return (
    <>
      <MetaTags
        title={`Router - ${LABEL_BY_SUBMENU[SUBMENU.CONFIGURATIONS]}`}
      />

      <Grid verticalAlign="middle" className="mt-1">
        {data.map((item) => (
          <Row key={item.id}>
            <Column width={8} className="text-wrap">
              <Image
                inline
                width="50"
                src={
                  _get(fundSourceById, [item.name, 'connBankName']) ===
                  AGGREGATOR.RAZORPAY
                    ? razorpayIcon
                    : cashfreeIcon
                }
              />
              <br />
              {_get(fundSourceById, [item.name, 'displayName'], '–')}
            </Column>
            <Column width={8}>
              <InputWithAction
                fluid
                label="%"
                inputmode="numeric"
                name={item.id}
                value={item.weightage}
                readOnly={!canUpdate}
                onChange={handleChange}
              />
            </Column>
          </Row>
        ))}
      </Grid>
      <Divider contain />
      <Grid>
        <Row>
          <Column width={8}>Total Weightage</Column>
          <Column width={8}>
            <Form.Input fluid value={`${total}%`} readOnly />

            {hasError && (
              <Text className="mt-1 text-left" variant="b12" color="danger">
                Fund Source weightage should always be equal to 100%
              </Text>
            )}
          </Column>
        </Row>
      </Grid>

      <BtnContainer>
        <Button
          data-event-name="Primary_Button_Update_Weightage"
          primary
          className="ml-4"
          disabled={hasError}
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </BtnContainer>
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(
  withConnect(
    withReadPermission(DefaultWeightage, {
      code: 27001,
      description: `access ${LABEL_BY_MENU[MENU.FUND_SOURCES]}`,
    }),
  ),
);
