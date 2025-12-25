import React, { useEffect } from 'react';
import {
  toast,
  Image,
  Space,
  Form,
  Text,
  Popup,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { connect, getDetails } from 'services/fundSources';

// Utils
import { digitsValidation } from 'utils/formValidation';

// Images
import customerIdImg from 'images/customer-id.png';

// Components
import Icon from 'components/Icon';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import {
  STATUS,
  errorByMessage,
  MODAL_TYPE,
} from 'containers/AllFundSources/constants';

// Types
import type { YesBusinessDetailsProps } from '../types';

const YesBusinessDetails: React.FC<YesBusinessDetailsProps> = ({
  fundSource,
  actionType,
  setActionType,
  formObj,
  setFormObj,
  errorObj,
  setErrorObj,
  setModalType,
  setModalData,
  onDone,
}) => {
  useEffect(() => {
    if (!fundSource.fundSourceId) {
      return;
    }

    (async function fetchData() {
      const response = await getDetails(fundSource.fundSourceId);

      if (response.connectDetails) {
        setFormObj(response.connectDetails);
      }
    })();
  }, [fundSource.fundSourceId, setFormObj]);

  useEffect(() => {
    (async function handleActionType() {
      switch (actionType) {
        case ACTION_TYPE.SUBMIT:
          await handleSubmit();
          setActionType(ACTION_TYPE.EMPTY);
          break;
      }
    })();
  }, [actionType, setActionType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'customerId':
        error = digitsValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await connect(fundSource.fundSourceId, formObj);

    if ('error' in response) {
      const status: string = _get(response, 'error.status', '');

      if (status === 'ERROR') {
        const title: string = _get(response, 'error.title', '');
        const message: string = _get(response, 'error.message', '');

        if (message === 'IP_NOT_WHITELISTED') {
          setModalData({
            type: 'positive',
            url: (response as unknown as { title: string }).title,
          });
          setModalType(MODAL_TYPE.APPROVE_YESB);
        } else if (title === 'REQUEST_INVALID') {
          const error = _get(errorByMessage, [message]);

          if (error) {
            setErrorObj((prev) => ({
              ...prev,
              [error.key]: error.text,
            }));
          }
        }
      }
    } else if (response.status === STATUS.ACTIVE) {
      onDone();
    } else if (response.rawBankData) {
      const bankResponse = JSON.parse(response.rawBankData.response);
      const message = _get(bankResponse, 'Fault.Reason.Text');

      toast.error(message);
    }
  };

  return (
    <>
      <Text variant="h28">Business & Personal Details</Text>
      <Text className="mt-2 mb-4" color="bodyLight">
        Provide essential details about yourself and your business to ensure a
        smooth payment experience.
      </Text>

      <Form>
        <Space gap={15}>
          <div>
            <Form.Input
              width={12}
              className="m-0"
              data-testid="customer-id"
              name="customerId"
              label={
                <Text color="bodyLight" className="mb-1">
                  Customer ID
                  <Popup
                    position="right center"
                    content="Please verify the Customer ID associated with this Yes Bank Account. You can find them in your bank account statement (as in the image), or on the Account opening KIT or the First page of Cheque Booklet or with your Yes Bank Relationship Manager. If an incorrect Customer ID is added, it can lead to a failure in adding the fund source."
                    trigger={
                      <span>
                        <Icon
                          name="info"
                          className="pointer ml-1"
                          verticalAlign="top"
                        />
                      </span>
                    }
                  />
                </Text>
              }
              error={errorObj.customerId}
              value={formObj.customerId}
              onChange={handleChange}
            />
            <Text variant="b12" color="bodyLight" className="mt-1 mb-3">
              Please verify the Customer ID associated with this Yes Bank
              Account. You can find them in your bank account statement (as in
              the image), or on the Account opening kit or the First page of
              Cheque Booklet or with your Yes Bank Relationship Manager.
            </Text>
          </div>

          <Image src={customerIdImg} className="mb-1" style={{ width: 400 }} />
        </Space>

        <Form.Group>
          <Form.Field>
            <label>Account Number</label>
            <input
              data-testid="account-number"
              disabled
              value={fundSource.bankAccount}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
};

export default withErrorBoundary(YesBusinessDetails);
