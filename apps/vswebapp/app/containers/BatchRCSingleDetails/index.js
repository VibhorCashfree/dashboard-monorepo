import React, { useEffect, useState } from 'react';
import { Space, Text, Paper } from '@cashfree-intl/coherent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Styles
import { BackButtonWrapper, DetailsRow, Divider } from 'styled/common';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Loader from 'components/Loader';

// Services
import { getEntryDetails } from 'services/RC';

const BatchRCSingleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const { fileId, referenceId } = useParams();
  const recordStatus = _get(location.state, 'row.status', {});
  const message = _get(location.state, 'row.message', '–');

  useEffect(() => {
    (async function fetchData() {
      const data = await getEntryDetails(fileId, referenceId);
      setData(data);
    })();
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Space justifyContent="space-between" className="mb-3">
        <BackButtonWrapper onClick={() => navigate(-1)}>
          <Icon name="chevron-left" />

          <Text as="a" className="link ml-1">
            Back
          </Text>
        </BackButtonWrapper>
      </Space>

      <Paper>
        <Space justifyContent="space-between">
          <Space gap={3}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Verification ID
              </Text>

              <Text variant="h16">
                <Space gap={1} justifyContent="center" alignItems="center">
                  <span>{_get(data, 'request.verification_id', '–')}</span>
                </Space>
              </Text>
            </div>

            <div>
              <Text color="bodyLight" className="mb-1">
                Reference ID
              </Text>
              <Text variant="h16">
                <Space gap={1} justifyContent="center" alignItems="center">
                  <span>{_get(data, 'response.reference_id', '–')}</span>
                </Space>
              </Text>
            </div>
          </Space>

          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {recordStatus}
            </StatusLabel>
          </div>
        </Space>

        <Divider />

        <Text variant="h16" strong className="my-3">
          Details Provided
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">RC Number</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.vehicle_number', '–')}
          </div>
          <div />
          <div />
        </DetailsRow>

        <Divider />

        <Text variant="h16" strong className="my-3">
          Response
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Status</Text>
          </div>
          <div>
            <StatusLabel className="mb-1" filled>
              {_get(data, 'response.status', '–') || '–'}
            </StatusLabel>
          </div>
          <div />
          <div />
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Class</Text>
          </div>
          <div>{_get(data, 'response.class', '–') || '–'}</div>
          <div>
            <Text color="bodyLight">Chassis</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.chassis', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Engine</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.engine', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Vehicle Manufacturer</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.vehicle_manufacturer_name', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Model</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.model', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Type</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.type', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Norms Type</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.norms_type', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Body Type</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.body_type', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Owner Count</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.owner_count', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Owner Name</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.owner', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Owner's Father's Name</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.owner_father_name', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Mobile Number</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.mobile_number', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Status As On</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.status_as_on', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">RC Status</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.rc_status') ? (
              <StatusLabel>{_get(data, 'response.rc_status')}</StatusLabel>
            ) : (
              '–'
            )}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Reg. Authority</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.reg_authority', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Reg. Date</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.reg_date', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Vehicle Manufacturing Month Year</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.vehicle_manufacturing_month_year', '–') ||
              '–'}
          </div>
          <div>
            <Text color="bodyLight">RC Expiry Date</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.rc_expiry_date', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Vehicle Tax Upto </Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.vehicle_tax_upto', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Vehicle Insurance Company Name</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.vehicle_insurance_company_name', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Vehicle Insurance Upto</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.vehicle_insurance_upto', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Vehicle Insurance Policy No. </Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.vehicle_insurance_policy_number', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">RC Financer</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.rc_financer', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Present Address</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.present_address', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Permanent Address</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.permanent_address', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Message</Text>
          </div>
          <div className="text-wrap">
            {message ? _startCase(message.split('_').join(' ')) : '–'}
          </div>
        </DetailsRow>
      </Paper>
    </>
  );
};

export default BatchRCSingleDetails;
