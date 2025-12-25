import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  ModalContent,
  ModalDescription,
  Image,
  Space,
  Icon,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _find from 'lodash/find';

// Components
import IconComponent from 'components/Icon';
// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';
import { StyledAlertModal } from '../styled';

const ValidDLModal = ({ type, title, data, onClose }) => {
  const [showMore, setShowMore] = useState(false);

  const temporaryAddress = _find(
    data?.details_of_driving_licence?.address_list,
    { type: 'temporary' },
  );
  const permanentAddress = _find(
    data?.details_of_driving_licence?.address_list,
    { type: 'permanent' },
  );

  return (
    <StyledAlertModal open>
      <ModalContent className="p-0">
        <ModalDescription>
          <div className="mt-1 text-center">
            <Image inline src={getAlertIcon(type)} />
            <Text variant="h16" strong className="my-3">
              {title}
            </Text>
            <ModalRow>
              <div>
                <Text color="bodyLight">DL Number</Text>
              </div>
              <div className="text-wrap">{data.dl_number || '–'}</div>
            </ModalRow>

            <Divider contain />

            <ModalRow>
              <div>
                <Text color="bodyLight">Date of Birth</Text>
              </div>
              <div className="text-wrap">{data.dob || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Class of Vehicle</Text>
              </div>
              <div className="text-wrap">
                {data.badge_details &&
                  _get(data, 'badge_details[0].class_of_vehicle', '[]').join(
                    ', ',
                  )}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Date of Issue</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'details_of_driving_licence.date_of_issue', '–') ||
                  '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Full Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'details_of_driving_licence.name', '–') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Father’s / Husband’s Name</Text>
              </div>
              <div className="text-wrap">
                {_get(
                  data,
                  'details_of_driving_licence.father_or_husband_name',
                  '–',
                )}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Permanent Address</Text>
              </div>
              <div className="text-wrap">
                {_get(permanentAddress, 'complete_address', '–') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Temporary Address</Text>
              </div>
              <div className="text-wrap">
                {_get(temporaryAddress, 'complete_address', '–') || '–'}
              </div>
            </ModalRow>

            {showMore && (
              <>
                <Divider contain />
                <Text variant="h16" color="bodyLight" className="mb-2">
                  Driving License Validity
                </Text>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Non Transport (To)</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'dl_validity.non_transport.to', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Non Transport (From)</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'dl_validity.non_transport.from', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Transport (To)</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'dl_validity.transport.to', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Transport (From)</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'dl_validity.transport.from', '–') || '–'}
                  </div>
                </ModalRow>
              </>
            )}

            <Space
              alignItems="center"
              justifyContent="center"
              gap={1}
              className="pointer mt-3"
              onClick={() => setShowMore(prev => !prev)}
            >
              <Text color="primary" variant="b14" strong>
                View {showMore ? 'Less' : 'More'} Details
              </Text>
              <Icon name={showMore ? 'chevron-up' : 'chevron-down'} />
            </Space>
          </div>
          <BtnContainer>
            <Space justifyContent="space-between" alignItems="center">
              <Space
                alignItems="center"
                justifyContent="center"
                gap={1}
                className="pointer"
                onClick={() =>
                  window.open(
                    'https://www.cashfree.com/docs/api-reference/vrs/v2/driving-license/verify-driving-licence-details',
                    '_blank',
                  )
                }
              >
                <IconComponent name="top-right-arrow" />
                <Text color="primary" variant="b14">
                  Checkout All Responses for API
                </Text>
              </Space>
              <Button
                primary
                onClick={onClose}
                data-event-name="Primary_Button"
              >
                Okay, Got It
              </Button>
            </Space>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledAlertModal>
  );
};

ValidDLModal.propTypes = {
  type: PropTypes.oneOf(['success', 'info']),
  title: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ValidDLModal;
