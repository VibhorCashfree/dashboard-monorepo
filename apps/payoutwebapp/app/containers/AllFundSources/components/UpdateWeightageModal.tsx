import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Column,
  Loader,
  Image,
  Text,
  InputWithAction,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';
import _sumBy from 'lodash/sumBy';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useWeightage } from 'providers/WeightageProvider';

// Services
import { getWeightage } from 'services/fundSources';

// Utils
import getAlertIcon from 'utils/getAlertIcon';
import Regex from 'utils/regex';

// Styled
import { Divider, BtnContainer } from 'styled/common';

// Types
import type { UpdateWeightageModalProps } from '../types';

const UpdateWeightageModal: React.FC<UpdateWeightageModalProps> = ({
  fundSources,
  onSubmit,
  onClose,
}) => {
  const { weightage, setWeightage } = useWeightage();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      const response = await getWeightage({ source: 'DASHBOARD' });
      if (!('error' in response)) {
        setWeightage(response);
      }
    })();
  }, [setWeightage]);

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
    setWeightage((prev) =>
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

  const handleUpdate = () => {
    setLoading(true);
    onSubmit(weightage, () => setLoading(false));
  };

  const total = _sumBy(weightage, (item) => +item.weightage);

  const hasError = total !== 100 || weightage.some((i) => i.weightage === '');

  if (!weightage) {
    return <Loader active />;
  }

  const fundSourceById = _keyBy(fundSources, 'paymentInstrumentId');

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        Update Fund Sources Weightage{' '}
        <Cross
          data-event-name="Close_Icon_Update_Weightage"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text variant="p14" color="bodyLight" className="mb-3">
            Define what percentage of transfers should be routed through each
            fund source. This is applicable only when percentage or fund source
            is not specified during transfers
          </Text>
          <Grid verticalAlign="middle">
            {weightage.map((item) => (
              <Row key={item.id}>
                <Column width={8} className="text-wrap">
                  {_get(fundSourceById, [item.name, 'displayName'], '–')}
                </Column>
                <Column width={6}>
                  <InputWithAction
                    fluid
                    label="%"
                    inputmode="numeric"
                    name={item.id}
                    value={item.weightage}
                    onChange={handleChange}
                  />
                </Column>
              </Row>
            ))}
          </Grid>
          <Divider contain />
          <Grid>
            <Row>
              <Column width={7}>Total Fund Sources Weightage</Column>
              <Column width={6}>
                <Text variant="h20">{total}%</Text>
              </Column>
            </Row>
          </Grid>
          {hasError && (
            <Text className="mt-2" color="danger" strong>
              <Image
                inline
                className="mr-1"
                src={getAlertIcon('danger', 'sm')}
              />{' '}
              The total fund sources weightage should be 100%.
            </Text>
          )}
          <BtnContainer>
            <Button
              data-event-name="Secondary_Button_Update_Weightage"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
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
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(UpdateWeightageModal));
