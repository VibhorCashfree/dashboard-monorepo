import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import {
  Loader,
  Image,
  Button,
  Paper,
  Text,
  Space,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';

// Constants
import { BENE_PURPOSE, REGION } from 'constants/common';
import { FORMATS } from 'constants/date';
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { MODAL_TYPE } from 'containers/AllBeneficiaries/constants';

// Services
import { getDetails } from 'services/beneficiaries';

// Utils
import getAlertIcon from 'utils/getAlertIcon';
import Region from 'utils/region';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import Copy from 'components/Copy';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Modals from 'containers/AllBeneficiaries/components/Modals';
import DetailsFormatBlock from 'components/DetailsFormatBlock';

// Styled
import { DetailsRow, BackButtonWrapper, Divider } from 'styled/common';

// Types
import type { LocationState } from './types';

const BeneficiaryDetails: React.FC = () => {
  const [data, setData] = useState<any>();
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);

  const navigate = useNavigate();
  const location: LocationState = useLocation();

  const { rowDetails, fromBatch } = location.state;

  useEffect(() => {
    (async function fetchData() {
      const data = await getDetails(rowDetails.id);
      setData(data);
    })();
  }, [rowDetails.id]);

  if (!data) {
    return <Loader active />;
  }

  const kycDocByType = _keyBy(data.beneficiaryKycDocData, 'kycDocType');

  const showUpdate =
    !fromBatch &&
    data.benePurpose === BENE_PURPOSE.CORP_CC &&
    rowDetails.status !== 'VERIFIED';

  return (
    <>
      <PageHeader embedKey="BENE">
        {LABEL_BY_MENU[MENU.BENEFICIARIES]} {LABEL_BY_SUBMENU[SUBMENU.DETAILS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_MENU[MENU.BENEFICIARIES]} ${
          LABEL_BY_SUBMENU[SUBMENU.DETAILS]
        }`}
      />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      {showUpdate && (
        <div className="text-right mb-2">
          <Button
            data-event-name="Primary_Button"
            primary
            onClick={() => setModalType(MODAL_TYPE.UPDATE)}
          >
            Update Details
          </Button>
        </div>
      )}

      <Paper>
        <Space justifyContent="space-between" alignItems="center">
          <div>
            <Text color="bodyLight" className="mb-1">
              Beneficiary ID
            </Text>
            <Text variant="h16">
              {rowDetails.beneId}
              <Copy value={rowDetails.beneId} />
            </Text>
          </div>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {rowDetails.status}
            </StatusLabel>
          </div>
        </Space>

        <Divider />

        <DetailsFormatBlock
          title="Beneficiary Details"
          renderBy={{
            'Beneficiary Name': data.name || '–',
            'Phone Number': data.phone || '–',
            'Email ID': data.email || '–',
            Address: data.address1 || '–',
            'Added At':
              moment(
                Region.get() === REGION.IN ? data.addedOn : data.addedOn + 'Z',
              ).format(FORMATS.TIMESTAMP) || '–',
            'Status Description': data.reason || '–',
            ...(data.riskScore ? { 'Risk Score': data.riskScore } : {}),
          }}
        />

        <Divider />

        <DetailsFormatBlock
          title="Payment Methods"
          renderBy={{
            ...(data.bankAccount
              ? {
                  'Bank A/c Number / IFSC': (
                    <div>
                      <Text className="text-wrap">
                        {data.bankAccount || '–'} / {data.ifsc || '–'}
                        {_get(kycDocByType, 'BANK.status') &&
                          !['INITIATED', 'INVALID'].includes(
                            _get(kycDocByType, 'BANK.status'),
                          ) && (
                            <Image
                              inline
                              className="ml-1"
                              src={getAlertIcon(
                                _get(kycDocByType, 'BANK.status') === 'VERIFIED'
                                  ? 'success'
                                  : 'danger',
                                'sm',
                              )}
                            />
                          )}
                      </Text>
                      {_get(kycDocByType, 'BANK.status') === 'REJECTED' && (
                        <Text variant="b12" color="danger">
                          {_get(kycDocByType, 'BANK.rejectionReason')}
                        </Text>
                      )}
                    </div>
                  ),
                }
              : {}),
            ...(data.vpa ? { 'UPI VPA': data.vpa } : {}),
            ...(data.iban ? { IBAN: data.iban } : {}),
          }}
        />

        {data.benePurpose === BENE_PURPOSE.CORP_CC && (
          <>
            <Divider />
            <Text variant="h16" strong className="my-3">
              KYC Documents
            </Text>

            <DetailsRow>
              <div>
                <Text color="bodyLight">PAN</Text>
              </div>
              <div>
                <Text className="text-wrap">
                  {_get(kycDocByType, 'PAN.kycDocNum', '–')}
                  {_get(kycDocByType, 'PAN.status') &&
                    !['INITIATED', 'INVALID'].includes(
                      _get(kycDocByType, 'PAN.status'),
                    ) && (
                      <Image
                        inline
                        className="ml-1"
                        src={getAlertIcon(
                          _get(kycDocByType, 'PAN.status') === 'VERIFIED'
                            ? 'success'
                            : 'danger',
                          'sm',
                        )}
                      />
                    )}
                </Text>
                {_get(kycDocByType, 'PAN.status') === 'REJECTED' && (
                  <Text variant="b12" color="danger">
                    {_get(kycDocByType, 'PAN.rejectionReason')}
                  </Text>
                )}
              </div>
              <div>
                <Text color="bodyLight">CIN</Text>
              </div>
              <div>
                <Text className="text-wrap">
                  {_get(kycDocByType, 'CIN.kycDocNum', '–')}
                  {_get(kycDocByType, 'CIN.status') &&
                    !['INITIATED', 'INVALID'].includes(
                      _get(kycDocByType, 'CIN.status'),
                    ) && (
                      <Image
                        inline
                        className="ml-1"
                        src={getAlertIcon(
                          _get(kycDocByType, 'CIN.status') === 'VERIFIED'
                            ? 'success'
                            : 'danger',
                          'sm',
                        )}
                      />
                    )}
                </Text>
                {_get(kycDocByType, 'CIN.status') === 'REJECTED' && (
                  <Text variant="b12" color="danger">
                    {_get(kycDocByType, 'CIN.rejectionReason')}
                  </Text>
                )}
              </div>
            </DetailsRow>

            <DetailsRow>
              <div>
                <Text color="bodyLight">GSTIN</Text>
              </div>
              <div>
                <Text className="text-wrap">
                  {_get(kycDocByType, 'GST.kycDocNum', '–')}
                  {_get(kycDocByType, 'GST.status') &&
                    !['INITIATED', 'INVALID'].includes(
                      _get(kycDocByType, 'GST.status'),
                    ) && (
                      <Image
                        inline
                        className="ml-1"
                        src={getAlertIcon(
                          _get(kycDocByType, 'GST.status') === 'VERIFIED'
                            ? 'success'
                            : 'danger',
                          'sm',
                        )}
                      />
                    )}
                </Text>
                {_get(kycDocByType, 'GST.status') === 'REJECTED' && (
                  <Text variant="b12" color="danger">
                    {_get(kycDocByType, 'GST.rejectionReason')}
                  </Text>
                )}
              </div>
              <div>
                <Text color="bodyLight">Director&apos;s DIN</Text>
              </div>
              <div>
                <Text className="text-wrap">
                  {_get(kycDocByType, 'DIN.kycDocNum', '–')}
                  {_get(kycDocByType, 'DIN.status') &&
                    !['INITIATED', 'INVALID'].includes(
                      _get(kycDocByType, 'DIN.status'),
                    ) && (
                      <Image
                        inline
                        className="ml-1"
                        src={getAlertIcon(
                          _get(kycDocByType, 'DIN.status') === 'VERIFIED'
                            ? 'success'
                            : 'danger',
                          'sm',
                        )}
                      />
                    )}
                </Text>
                {_get(kycDocByType, 'DIN.status') === 'REJECTED' && (
                  <Text variant="b12" color="danger">
                    {_get(kycDocByType, 'DIN.rejectionReason')}
                  </Text>
                )}
              </div>
            </DetailsRow>
          </>
        )}
      </Paper>

      {modalType && (
        <Modals
          modalType={modalType}
          selectedRow={data}
          setModalType={setModalType}
        />
      )}
    </>
  );
};

export default BeneficiaryDetails;
