import React, { useState, useEffect } from 'react';
import {
  toast,
  Image,
  Button,
  ConfirmModal,
  Form,
  Space,
  Text,
  Grid,
  Column,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _uniq from 'lodash/uniq';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { getCreds, updateCreds, getReport } from 'services/fundSources';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useBankAccountSelfServe } from '../providers';

// Images
import successTickImg from 'images/success-tick.svg';

// Components
import Icon from 'components/Icon';
import FormField from 'components/FormField';
import ModeRequestResponse from './ModeRequestResponse';

// Utils
import { base64Download } from 'utils/common';
import { requiredValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { getFieldsByModes } from '../utils';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { STATUS } from 'containers/AllFundSources/constants';
import { VERIFICATION_STAGE, SAMPLE_REPORT } from '../constants';

// Styled
import { StyledList } from '../styled';

// Types
import type { VerifyUATCredentialsProps } from '../types';

const VerifyUATCredentials: React.FC<VerifyUATCredentialsProps> = ({
  fundSource,
  actionType,
  setActionType,
  formObj,
  setFormObj,
  errorObj,
  setErrorObj,
  onDone,
}) => {
  const { accountInfo } = useAccount();
  const { wizardData } = useBankAccountSelfServe();

  const supportedModes: string[] = _get(fundSource, 'supportedModes', []);
  const allModes: string[] = supportedModes.includes('upi')
    ? ['IMPS', 'NEFT', 'UPI']
    : ['IMPS', 'NEFT'];

  const [open, setOpen] = useState(false);
  const [verifiedModes, setVerifiedModes] = useState<string[]>(() =>
    fundSource.status === STATUS.UAT_CREDS_VERIFIED ? allModes : [],
  );

  const [verifiedResponse, setVerifiedResponse] = useState<any>();
  const [loadingType, setLoadingType] = useState<string | undefined>();

  useEffect(() => {
    (async function fetchData() {
      setLoadingType('FETCH_DATA');

      const response = await getCreds(fundSource.fundSourceId, {
        verificationStage: VERIFICATION_STAGE.UAT,
      });

      setLoadingType(undefined);

      if (!('error' in response)) {
        setFormObj((prev: AnyObject) => ({ ...prev, ...response.creds }));
      }
    })();
  }, []);

  useEffect(() => {
    const allModesVerified: boolean = verifiedModes.length === allModes.length;

    if (allModesVerified) {
      setFormObj((prev: AnyObject) => ({ ...prev, allModesVerified: true }));
    }
  }, [verifiedModes]);

  useEffect(() => {
    if (!formObj.allModesVerified) {
      return;
    }

    (async function generateReport() {
      setLoadingType('GENERATE_REPORT');

      const body = {
        bankAccountCreds: {
          ...formObj,
        },
        transferModes: allModes,
        reportRequired: true,
      };

      setFormObj((prev: AnyObject) => ({ ...prev, reportGenerated: false }));

      const response = await updateCreds(
        fundSource.fundSourceId,
        { verificationStage: VERIFICATION_STAGE.UAT },
        body,
      );

      setLoadingType(undefined);

      if (!('error' in response)) {
        setTimeout(function () {
          setFormObj((prev: AnyObject) => ({ ...prev, reportGenerated: true }));
        }, 2000);
      }
    })();
  }, [formObj.allModesVerified]);

  useEffect(() => {
    (async function handleActionType() {
      switch (actionType) {
        case ACTION_TYPE.SUBMIT:
          handleSubmit();
          setActionType(ACTION_TYPE.EMPTY);
          break;
      }
    })();
  }, [actionType]);

  const fields: any[] = getFieldsByModes(
    _get(wizardData, 'gateway.credentialSchema'),
    supportedModes,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, type, value }: { name: string; type: string; value: any },
  ) => {
    let error: string | undefined | null;

    if (type === 'file' && value) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const fileData: string = (
          _get(event, 'target.result', '') as string
        ).split(',')[1];

        const field = fields.find((field) => field.property === name);

        const validExtension: boolean = _get(field, 'extensions', []).some(
          (extension: string) => value.name.includes(extension),
        );

        if (!validExtension) {
          error = 'Invalid format for the uploaded file.';
        }

        setErrorObj((prev: AnyObject) => ({ ...prev, [name]: error }));
        setFormObj((prev: AnyObject) => ({
          ...prev,
          [name]: fileData,
        }));
      };

      reader.readAsDataURL(value);

      return;
    }

    switch (name) {
      default:
        error = requiredValidation(value);
        break;
    }

    setErrorObj((prev: AnyObject) => ({ ...prev, [name]: error }));
    setFormObj((prev: AnyObject) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setOpen(true);
  };

  const handleVerify = (mode: string) => async () => {
    setLoadingType(`VERIFY_MODE_${mode}`);

    const body = {
      bankAccountCreds: {
        ...formObj,
      },
      transferModes: [mode],
      reportRequired: false,
      finalVerification: _size(verifiedModes) === _size(allModes) - 1,
    };

    const response = await updateCreds(
      fundSource.fundSourceId,
      { verificationStage: VERIFICATION_STAGE.UAT },
      body,
    );

    setLoadingType(undefined);

    if (!('error' in response)) {
      if (response.verificationData?.verified) {
        setVerifiedModes((prev: string[]) => _uniq(prev.concat(mode)));
      }

      setVerifiedResponse(response.verificationData);
    }
  };

  const downloadReport = async () => {
    setLoadingType('DOWNLOAD_REPORT');

    const response = await getReport(fundSource.fundSourceId);

    setLoadingType(undefined);

    if (!('error' in response)) {
      if (response.fileExists) {
        base64Download(response.data, 'UAT-report.xlsx');

        toast.success(
          `${VERIFICATION_STAGE.UAT} Report Downloaded Successfully`,
        );
      }
    }
  };

  const disabled = !isFormValid(formObj, errorObj, []);

  return (
    <>
      <Grid columns="equal">
        <Column
          style={verifiedResponse ? { borderRight: '1px solid #E6E5E8' } : null}
        >
          <Text variant="h28">Verify UAT Credentials</Text>
          <Text className="mt-1 mb-3" color="bodyLight">
            Self-verify the testing credentials you receive from the bank
          </Text>

          <Text variant="h16" strong>
            1. Enter UAT Credentials
          </Text>
          <Text color="bodyLight" className="mt-1 pl-1">
            Credentials are available on {accountInfo.email}
          </Text>

          <Form className="my-3 pl-3">
            {fields.map((field) => (
              <FormField
                {...field}
                width={10}
                key={field.property}
                error={errorObj[field.property]}
                value={formObj[field.property] || ''}
                onChange={handleChange}
              />
            ))}

            <Form.Field width={10}>
              <Text className="mb-1" color="bodyLight">
                Verify Payment Modes
              </Text>

              <StyledList>
                {allModes.map((mode) => (
                  <div key={mode}>
                    <>
                      <Space justifyContent="space-between">
                        <Text>{mode}</Text>
                        {verifiedModes.includes(mode) ? (
                          <Text color="success" style={{ fontStyle: 'italic' }}>
                            <Image inline src={successTickImg} /> Verified
                          </Text>
                        ) : (
                          <Button
                            data-event-name="Primary_Button_Verify_UAT_Credentials"
                            as="a"
                            link
                            icon={
                              <Icon
                                name="circle-tick"
                                className="pointer"
                                verticalAlign="top"
                                fill={disabled && '#A5A6B0'}
                              />
                            }
                            iconPosition="left"
                            loading={loadingType === `VERIFY_MODE_${mode}`}
                            disabled={disabled}
                            onClick={handleVerify(mode)}
                          >
                            Verify
                          </Button>
                        )}
                      </Space>
                      {verifiedResponse &&
                        !verifiedResponse.verified &&
                        verifiedResponse.transferType === mode && (
                          <Text variant="b12" color="danger" className="mt-1">
                            Incorrect credentials. Refer to Comment in logs.
                          </Text>
                        )}
                    </>
                  </div>
                ))}
              </StyledList>
            </Form.Field>
          </Form>

          <section>
            <Text variant="h16" strong>
              2. Download Report & Send via Email
            </Text>

            <Space direction="column" gap={1} className="pl-3 mt-3 mb-2">
              <Text color="bodyLight">
                1. Download the UAT Test Report below.
              </Text>
              <Text color="bodyLight">
                2. Print the report in your company&apos;s letter head.{' '}
                <Button
                  data-event-name="Primary_Button_Verify_UAT_Credentials"
                  as="a"
                  link
                  onClick={() => base64Download(SAMPLE_REPORT, 'sample.xlsx')}
                >
                  View Sample
                </Button>
              </Text>
              <Text color="bodyLight">
                3. Send the signed report as an attachment to the same mail
                thread where you received UAT Credentials
              </Text>
            </Space>

            <Button
              data-event-name="Primary_Button_Verify_UAT_Credentials"
              primary
              className="ml-2"
              loading={loadingType === 'DOWNLOAD_REPORT'}
              disabled={!formObj.reportGenerated}
              onClick={downloadReport}
            >
              Generate & Download UAT Report
            </Button>
          </section>
        </Column>
        <Column>
          <ModeRequestResponse data={verifiedResponse} />
        </Column>
      </Grid>

      {open && (
        <ConfirmModal
          title="Send UAT Test Report"
          confirmText="Yes, I have"
          cancelText="No"
          confirmBtnEvent="Primary_Send_UAT_Test_Report"
          closeBtnEvent="Secondary_Send_UAT_Test_Report"
          closeCrossEvent="Close_Icon_Send_UAT_Test_Report"
          onClose={() => setOpen(false)}
          onConfirm={() => {
            setOpen(false);
            onDone();
          }}
        >
          <Text variant="p14" color="bodyLight">
            Have you sent the UAT report to the bank?
          </Text>

          <a href="javascript:void(0)" onClick={downloadReport}>
            Download UAT Report
          </a>
        </ConfirmModal>
      )}
    </>
  );
};

export default withErrorBoundary(VerifyUATCredentials);
