import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Space,
  Paper,
  Text,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Cross,
  Image,
  Loader,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import { getDigilockerDetails, getDocDetails } from 'services/digilocker';

// Components
import Copy from 'components/Copy';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import DocumentDetailsAccordion from './components/DocumentDetailsAccordion';

// Styled
import { DetailsRow, BackButtonWrapper, Divider, Action } from 'styled/common';

// utils
import Regex from 'utils/regex';

const DigilockerDetails = () => {
  const [photo, showPhoto] = useState(false);
  const [data, setData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [documentLoading, setDocumentLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const rowDetails = _get(location.state, 'rowDetails', {});

  const verifyDocument = async details => {
    const consentReceived = details?.document_consent;
    const status = details?.status;
    if (!consentReceived?.length || status !== 'AUTHENTICATED') {
      return;
    }

    // Check if token expiry when status is authenticated
    if (status === 'AUTHENTICATED') {
      const tokenExpiryTime = rowDetails?.tokenExpiryTime;

      // Return if tokenExpiryTime is null or missing
      if (!tokenExpiryTime) {
        return;
      }

      const currentTime = new Date();
      const expiryTime = new Date(tokenExpiryTime);

      // Check if the parsed date is valid and if current time has passed expiry time
      if (!isNaN(expiryTime.getTime()) && currentTime > expiryTime) {
        return;
      }
    }

    setDocumentLoading(true);
    try {
      const response = await Promise.all(
        consentReceived.map(document =>
          getDocDetails(document, details.verification_id),
        ),
      );

      if (!response.error) {
        setDocumentData(response);
      }
    } finally {
      setDocumentLoading(false);
    }
  };

  useEffect(() => {
    const fetchDigilockerDetails = async () => {
      setLoading(true);
      try {
        const response = await getDigilockerDetails(id);
        if (!response.error) {
          setData(response);
          verifyDocument(response);
        }
      } catch (error) {
        // Error handling for digilocker details fetch
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDigilockerDetails();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>
      <Paper>
        <Space justifyContent="space-between">
          <div>
            <Text color="bodyLight" className="mb-1">
              Reference ID
            </Text>
            <Text variant="h16">
              <Space justifyContent="center" alignItems="center">
                <span>
                  {_get(
                    data,
                    'reference_id',
                    _get(rowDetails, 'reference_id', '–'),
                  )}
                </span>
                <Action>
                  <Copy
                    value={_get(
                      data,
                      'reference_id',
                      _get(rowDetails, 'reference_id', ''),
                    )}
                  />
                </Action>
              </Space>
            </Text>
          </div>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {_get(data, 'status', _get(rowDetails, 'status', '–'))}
            </StatusLabel>
          </div>
        </Space>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Verification Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Verification ID</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'verification_id', '–') || '–'}
          </div>
          <div>
            <Text color="bodyLight">Name</Text>
          </div>
          <div className="text-wrap">
            {_get(data, 'user_details.name', '–') || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Date of Birth</Text>
          </div>
          <div>{_get(data, 'user_details.dob', '–') || '–'}</div>
          <div>
            <Text color="bodyLight">Gender</Text>
          </div>
          <div>
            {(() => {
              const gender = _get(data, 'user_details.gender', '–');
              if (gender === 'M') {
                return 'Male';
              }
              if (gender === 'F') {
                return 'Female';
              }
              return gender === '–' ? '–' : gender;
            })()}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">E-Aadhaar</Text>
          </div>
          <div>{_get(data, 'user_details.eaadhaar', '–') || '–'}</div>
          <div>
            <Text color="bodyLight">Mobile</Text>
          </div>
          <div>{_get(data, 'user_details.mobile', '–') || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Status</Text>
          </div>
          <div>
            <StatusLabel filled>
              {_get(data, 'status', _get(rowDetails, 'status', '–'))}
            </StatusLabel>
          </div>
          <div>
            <Text color="bodyLight">Document Requested</Text>
          </div>
          <div>
            {Regex.formatDocumentInfo(
              _get(data, 'document_requested', '–') || [],
            ) || '–'}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Document Consent</Text>
          </div>
          <div>
            {Regex.formatDocumentInfo(
              _get(data, 'document_consent', '–') || [],
            ) || '–'}
          </div>
          {/* Dummy for alignment */}
          <div>
            <Text color="bodyLight" />
          </div>
          <div className="text-wrap" />
        </DetailsRow>
        {documentLoading ||
        (documentData &&
          documentData.length > 0 &&
          !documentData.every(doc => doc.error)) ? (
          <>
            <Divider />
            <Text variant="h16" strong className="my-3">
              Verified Documents
            </Text>
            {documentLoading ? (
              <Space
                fullHeight
                fullWidth
                style={{ position: 'relative', minHeight: '200px' }}
              >
                <Loader active page={false} />
              </Space>
            ) : (
              <DocumentDetailsAccordion documentData={documentData} />
            )}
          </>
        ) : null}
      </Paper>

      {photo && (
        <Modal $maxWidth="480" open>
          <ModalHeader>
            Aadhaar Linked Photo <Cross onClick={() => showPhoto(false)} />
          </ModalHeader>
          <ModalContent className="p-0">
            <ModalDescription>
              <Image
                src={`data:image/png;base64,${rowDetails.photoLink}`}
                className="p-1"
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </ModalDescription>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default DigilockerDetails;
