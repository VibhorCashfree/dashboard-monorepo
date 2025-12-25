import React, { useEffect, useState } from 'react';
import { Space, Text, Paper, Conditional } from '@cashfree-intl/coherent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import _get from 'lodash/get';
import _omitBy from 'lodash/omitBy';
import _isNull from 'lodash/isNull';

// Styles
import { BackButtonWrapper, DetailsRow, Divider } from 'styled/common';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Accordion from 'components/Accordion';
import Loader from 'components/Loader'; // Add Loader import

// Services
import { getDetails, getVerificationDetails } from 'services/forms';
import { getDocDetails } from 'services/digilocker';

// Helpers
import {
  getAccordionData,
  getReferenceAndVerificationType,
  getVerificationDetailsObj,
  renderMetaDataRows,
} from './helpers';

const AllKycLinkDetails = () => {
  const [data, setData] = useState();
  const [verificationDetails, setVerificationDetails] = useState({});
  const [documentDetails, setDocumentDetails] = useState({}); // Add document details state
  const [loading, setLoading] = useState(true); // Add loading state
  const [documentLoading, setDocumentLoading] = useState(false); // Add document loading state

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  const rowDetails = _get(location.state, 'rowDetails', {});

  // Helper function to fetch document details for authenticated DigiLocker
  const fetchDocumentDetails = async verificationDetailsObj => {
    const documentDetailsObj = {};

    // Check if DigiLocker verification exists and is authenticated
    if (verificationDetailsObj.DIGILOCKER_VERIFICATION) {
      const digilockerData = verificationDetailsObj.DIGILOCKER_VERIFICATION;
      const status = _get(digilockerData, 'status');
      const documentConsent = _get(digilockerData, 'document_consent', []);
      const verificationId = _get(digilockerData, 'verification_id');

      if (
        status === 'AUTHENTICATED' &&
        documentConsent.includes('AADHAAR') &&
        verificationId
      ) {
        setDocumentLoading(true); // Start document loading

        try {
          const aadhaarDocDetails = await getDocDetails(
            'AADHAAR',
            verificationId,
          );

          if (!aadhaarDocDetails.error) {
            documentDetailsObj.DIGILOCKER_VERIFICATION = aadhaarDocDetails;
          }
        } catch (error) {
          console.error('Failed to fetch Aadhaar document details:', error);
        } finally {
          setDocumentLoading(false); // Stop document loading
        }
      }
    }

    return documentDetailsObj;
  };

  useEffect(() => {
    (async function fetchData() {
      setLoading(true); // Start main loading
      try {
        const data = await getDetails(id);

        const verifications = getReferenceAndVerificationType(
          _get(_omitBy(data, _isNull), 'verification_details', []),
        );

        const verificationDetailsPromises = verifications.map(verification =>
          getVerificationDetails(verification),
        );

        const response = await Promise.all(verificationDetailsPromises);

        const verificationDetailsObj = getVerificationDetailsObj(response);

        // Fetch document details for authenticated DigiLocker verifications
        const documentDetailsObj = await fetchDocumentDetails(
          verificationDetailsObj,
        );

        setVerificationDetails(verificationDetailsObj);
        setDocumentDetails(documentDetailsObj);
        setData(data);
      } catch (error) {
        console.error('Failed to fetch KYC details:', error);
      } finally {
        setLoading(false); // Stop main loading
      }
    })();
  }, []);

  // Show main loader while initial data loads
  if (loading) {
    return <Loader />;
  }

  const accordionData = getAccordionData(
    data,
    verificationDetails,
    documentDetails,
  );

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
          <Space gap={2}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Verification ID
              </Text>

              <Text variant="h16">
                <Space gap={1} alignItems="center">
                  <span>{_get(rowDetails, 'verificationId', '–')}</span>
                </Space>
              </Text>
            </div>

            <div>
              <Text color="bodyLight" className="mb-1">
                Reference ID
              </Text>
              <Text variant="h16">
                <Space gap={1} alignItems="center">
                  <span>{_get(rowDetails, 'id', '–')}</span>
                </Space>
              </Text>
            </div>
          </Space>

          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {_get(rowDetails, 'status', '–')}
            </StatusLabel>
          </div>
        </Space>

        <Divider />

        <Conditional if={data?.meta_data}>
          <Text variant="h16" strong className="my-3">
            Details Provided
          </Text>

          {renderMetaDataRows(data?.meta_data)}

          <Divider className="mb-0" />
        </Conditional>

        {documentLoading ? (
          <Space
            fullHeight
            fullWidth
            style={{ position: 'relative', minHeight: '200px' }}
          >
            <Loader active page={false} />
          </Space>
        ) : (
          <Accordion accordionData={accordionData} />
        )}
      </Paper>
    </>
  );
};

export default AllKycLinkDetails;
