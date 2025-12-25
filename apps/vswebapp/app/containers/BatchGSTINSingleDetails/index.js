import React, { useEffect, useState } from 'react';
import { Space, Text, Paper, Conditional } from '@cashfree-intl/coherent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';

// Styles
import { BackButtonWrapper, DetailsRow, Divider } from 'styled/common';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Loader from 'components/Loader';

// Services
import { getEntryDetails } from 'services/GSTIN';

// Utils
import { formattedDate } from 'helpers/common';

const BatchGSTINSingleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const { fileId, referenceId } = useParams();
  const recordStatus = _get(location.state, 'row.status', {});
  const message = _get(location.state, 'row.message', '–');

  useEffect(() => {
    (async function fetchData() {
      const data = await getEntryDetails(fileId, referenceId);
      setData(data);
    })();
  }, []);

  const addressLength =
    _get(data, 'response.additionalAddressArray') &&
    _get(data, 'response.additionalAddressArray', []).length;

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
                GSTIN Ref. ID
              </Text>

              <Text variant="h16">
                <span>{_get(data, 'response.referenceId', '–') || '–'}</span>
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
            <Text color="bodyLight">GSTIN</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.GSTIN', '–') || '–'}
          </div>

          <div>
            <Text color="bodyLight">Business Name</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'request.businessName', '–') || '–'}
          </div>
        </DetailsRow>

        <Divider />

        <Text variant="h16" strong className="my-3">
          Response
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Status</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.status') ? (
              <StatusLabel className="mb-1" filled>
                {_get(data, 'response.status', '–') || '–'}
              </StatusLabel>
            ) : (
              '–'
            )}
          </div>
          <div />
          <div />
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Name of Business</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.nameOfBusiness', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Legal Name of Business</Text>
          </div>
          <div>{_get(data, 'response.legalNameOfBusiness', '–') || '–'}</div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Date of Registration</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.dateOfRegistration', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Last Updated Date</Text>
          </div>
          <div>{_get(data, 'response.lastUpdateDate', '–') || '–'}</div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">State Jurisdiction</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.stateJurisdiction', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Centre Jurisdiction</Text>
          </div>
          <div>{_get(data, 'response.centerJurisdiction', '–') || '–'}</div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Constitution of Business</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.constitutionOfBusiness', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Tax Payer Type</Text>
          </div>
          <div>{_get(data, 'response.taxpayerType', '–') || '–'}</div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Nature of Business Activity</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.natureOfBusinessActivities', [])?.join(
              ', ',
            ) || '–'}
          </div>
          <div>
            <Text color="bodyLight">GSTIN Status</Text>
          </div>
          <div>{_get(data, 'response.gstInStatus', '–') || '–'}</div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">Message</Text>
          </div>
          <div className="text-wrap">
            {message ? _startCase(message.split('_').join(' ')) : '–'}
          </div>
          <div>
            <Text color="bodyLight">Verified At</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'response.verifiedAt')
              ? formattedDate(_get(data, 'response.verifiedAt'))
              : '–'}
          </div>
        </DetailsRow>
        {addressLength > 0 && (
          <DetailsRow>
            <div>
              <Text color="bodyLight">Additional Place Address 1</Text>
            </div>
            <div className="text-wrap">
              {data?.response?.additionalAddressArray[0].address || '–'}
            </div>

            {addressLength > 1 ? (
              <>
                <div>
                  <Text color="bodyLight">Additional Place Address 2</Text>
                </div>
                <div className="text-wrap">
                  {data?.response?.additionalAddressArray[1].address || '–'}
                </div>
              </>
            ) : (
              <>
                <div />
                <div />
              </>
            )}
          </DetailsRow>
        )}
        <DetailsRow>
          <div>
            <Text color="bodyLight">Principal Place Address</Text>
          </div>
          <div>{_get(data, 'response.principalPlaceAddress', '–') || '–'}</div>
          <div />
          <div />
        </DetailsRow>
      </Paper>
    </>
  );
};

export default BatchGSTINSingleDetails;
