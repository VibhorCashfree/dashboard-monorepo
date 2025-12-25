import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Space,
  Paper,
  Text,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Cross,
  Image,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { GENDER } from 'constants/common';

// Components
import Copy from 'components/Copy';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate } from 'helpers/common';

// Styled
import { DetailsRow, BackButtonWrapper, Divider, Action } from 'styled/common';

const OKYCDetails = () => {
  const [photo, showPhoto] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const rowDetails = _get(location.state, 'rowDetails', {});

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
                <span>{rowDetails.id}</span>
                <Action>
                  <Copy value={rowDetails.id} />
                </Action>
              </Space>
            </Text>
          </div>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {rowDetails.status}
            </StatusLabel>
          </div>
        </Space>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Verification Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Verified At</Text>
          </div>
          <div>{formattedDate(rowDetails.processedOn)}</div>
          <div>
            <Text color="bodyLight">Email</Text>
          </div>
          <div className="text-wrap">{rowDetails.email || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Name</Text>
          </div>
          <div className="text-wrap">{rowDetails.name || '–'}</div>
          <div>
            <Text color="bodyLight">Photo Link</Text>
          </div>
          <div>
            {/* @TODO: remove the hack */}
            {rowDetails.photoLink ? (
              <Button
                className="p-0"
                fluid
                link
                onClick={() => showPhoto(true)}
                style={{ textAlign: 'left' }}
              >
                Aadhaar Photo
              </Button>
            ) : (
              '–'
            )}
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Gender</Text>
          </div>
          <div>{_get(GENDER, [rowDetails.gender], '–')}</div>
          <div>
            <Text color="bodyLight">Guardian&#39;s Name</Text>
          </div>
          <div>{rowDetails.careOf || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Date of Birth</Text>
          </div>
          <div>{rowDetails.dob || '–'}</div>
          <div>
            <Text color="bodyLight">State</Text>
          </div>
          <div>{_get(rowDetails, 'splitAddress.state', '–')}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Address</Text>
          </div>
          <div>{rowDetails.address || '–'}</div>
          <div>
            <Text color="bodyLight">Message</Text>
          </div>
          <div>{rowDetails.message || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Year of Birth</Text>
          </div>
          <div>{rowDetails.yearOfBirth || '–'}</div>
          <div>
            <Text color="bodyLight">Status</Text>
          </div>
          <div>{rowDetails.status || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Mobile Hash</Text>
          </div>
          <div className="text-wrap">{rowDetails.mobileHash || '–'}</div>
          {/* Dummy for alignment */}
          <div>
            <Text color="bodyLight" />
          </div>
          <div className="text-wrap" />
        </DetailsRow>
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

export default OKYCDetails;
