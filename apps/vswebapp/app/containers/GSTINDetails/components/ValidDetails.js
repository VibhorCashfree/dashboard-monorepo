import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Styled
import { DetailsRow } from 'styled/common';

const ValidDetails = ({ data, showMoreAddress }) => {
  const addressLength = data.additionalAddressArray.length;

  return (
    <>
      <DetailsRow>
        <div>
          <Text color="bodyLight">Name of Business</Text>
        </div>
        <div className="text-wrap">{_get(data, 'nameOfBusiness', '–')}</div>
        <div>
          <Text color="bodyLight">Legal Name of Business</Text>
        </div>
        <div>{_get(data, 'legalNameOfBusiness', '–')}</div>
      </DetailsRow>
      <DetailsRow>
        <div>
          <Text color="bodyLight">Date of Registration</Text>
        </div>
        <div className="text-wrap">{_get(data, 'dateOfRegistration', '–')}</div>
        <div>
          <Text color="bodyLight">Last Updated Date</Text>
        </div>
        <div>{_get(data, 'lastUpdateDate', '–')}</div>
      </DetailsRow>
      <DetailsRow>
        <div>
          <Text color="bodyLight">State Jurisdiction</Text>
        </div>
        <div className="text-wrap">{_get(data, 'stateJurisdiction', '–')}</div>
        <div>
          <Text color="bodyLight">Centre Jurisdiction</Text>
        </div>
        <div>{_get(data, 'centerJurisdiction', '–')}</div>
      </DetailsRow>
      <DetailsRow>
        <div>
          <Text color="bodyLight">Constitution of Business</Text>
        </div>
        <div className="text-wrap">
          {_get(data, 'constitutionOfBusiness', '–')}
        </div>
        <div>
          <Text color="bodyLight">Tax Payer Type</Text>
        </div>
        <div>{_get(data, 'taxPayerType', '–')}</div>
      </DetailsRow>
      <DetailsRow>
        <div>
          <Text color="bodyLight">Nature of Business Activity</Text>
        </div>
        <div className="text-wrap">
          {_get(data, 'natureOfBusinessActivities', '–').join(', ')}
        </div>
        <div>
          <Text color="bodyLight">GSTIN Status</Text>
        </div>
        <div>{_get(data, 'gstInStatus', '–')}</div>
      </DetailsRow>
      <DetailsRow>
        <div>
          <Text color="bodyLight">Trade Name of Business</Text>
        </div>
        <div className="text-wrap">
          {_get(data, 'tradeNameOfBusiness', '–')}
        </div>
        <div>
          <Text color="bodyLight">Principal Place Address</Text>
        </div>
        <div>{_get(data, 'principalPlaceAddress', '–')}</div>
      </DetailsRow>

      {addressLength > 0 && (
        <DetailsRow>
          <div>
            <Text color="bodyLight">Additional Place Address 1</Text>
          </div>
          <div className="text-wrap">
            {data.additionalAddressArray[0].address || '–'}
          </div>

          {addressLength > 1 ? (
            <>
              <div>
                <Text color="bodyLight">Additional Place Address 2</Text>
              </div>
              <div className="text-wrap">
                {data.additionalAddressArray[1].address || '–'}
                <Button
                  secondary
                  className="mt-2"
                  size="small"
                  style={{ float: 'right' }}
                  onClick={() => showMoreAddress()}
                >
                  View All Addresses
                </Button>
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
          <Text color="bodyLight">Message</Text>
        </div>
        <div className="text-wrap">{_get(data, 'message', '–')}</div>
        <div />
        <div />
      </DetailsRow>
    </>
  );
};

ValidDetails.propTypes = {
  data: PropTypes.object.isRequired,
  showMoreAddress: PropTypes.func.isRequired,
};

export default ValidDetails;
