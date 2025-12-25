import React, { useState } from 'react';
import {
  Text,
  Modal,
  ModalContent,
  Space,
  Image,
  Button,
} from '@cashfree-intl/coherent';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';

// Components
import Icon from 'components/Icon';

// Constants
import { MOBILE_360_ADVANCE_DOC, MOBILE_360_LITE_DOC } from '../constants';

const ValidModal = ({ modalData, onClose, isAdvance }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Modal $maxWidth="506" open>
      <ModalContent>
        <Space direction="column" alignItems="center">
          <Image inline src={getAlertIcon('success')} />

          <Text variant="h20" className="pt-2 pb-3">
            Information Fetched Successfully
          </Text>

          <div className="mt-1 w-100">
            <ModalRow>
              <div>
                <Text color="bodyLight">Phone Number</Text>
              </div>
              <div className="text-wrap">
                {_get(modalData, 'phoneNumber', '-')}
              </div>
            </ModalRow>

            <Divider contain />

            <ModalRow>
              <div>
                <Text color="bodyLight">IFSC</Text>
              </div>
              <div className="text-wrap">{_get(modalData, 'ifsc', '-')}</div>
            </ModalRow>

            {isAdvance && (
              <>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Gender</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(modalData, 'personal_info.gender', '-')}
                  </div>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Date Of Birth</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(modalData, 'personal_info.dob', '-')}
                  </div>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Occupation</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(modalData, 'personal_info.occupation', '-')}
                  </div>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Age</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(modalData, 'personal_info.age', '-')}
                  </div>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Phone Number 1 (Home)</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(modalData, 'phone_list', []).find(
                      item => item.type === 'HOME',
                    )?.number || '-'}
                  </div>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Email IDs</Text>
                  </div>

                  <Space direction="column">
                    {_get(modalData, 'email_list', []).map(email => (
                      <div className="text-wrap">{email.email}</div>
                    ))}
                  </Space>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Passport Number</Text>
                  </div>

                  <Space direction="column">
                    {_get(modalData, 'passport_number', []).map(
                      passportNumber => (
                        <div className="text-wrap">{passportNumber.number}</div>
                      ),
                    )}
                  </Space>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Permanent Address</Text>
                  </div>

                  <div className="text-wrap">
                    {_get(modalData, 'address_list', []).find(
                      address => address.type === 'permanent',
                    )?.address || '-'}
                  </div>
                </ModalRow>

                <ModalRow>
                  <div>
                    <Text color="bodyLight">Temporary Address</Text>
                  </div>

                  <div className="text-wrap">
                    {_get(modalData, 'address_list', []).find(
                      address => address.type === 'temporary',
                    )?.complete_address || '-'}
                  </div>
                </ModalRow>

                {showMore && (
                  <>
                    <Divider contain />

                    <ModalRow>
                      <div>
                        <Text color="bodyLight">Driving License</Text>
                      </div>

                      <Space direction="column">
                        {_get(modalData, 'driving_license', []).map(number => (
                          <div className="text-wrap">{number.number}</div>
                        ))}
                      </Space>
                    </ModalRow>

                    <ModalRow>
                      <div>
                        <Text color="bodyLight">Voter Id</Text>
                      </div>

                      <Space direction="column">
                        {_get(modalData, 'voter_id', []).map(id => (
                          <div className="text-wrap">{id.number}</div>
                        ))}
                      </Space>
                    </ModalRow>

                    <ModalRow>
                      <div>
                        <Text color="bodyLight">PAN Number</Text>
                      </div>
                      <Space direction="column">
                        {_get(modalData, 'pan_number', []).map(id => (
                          <div className="text-wrap">{id.number}</div>
                        ))}
                      </Space>
                    </ModalRow>

                    {Object.keys(_get(modalData, 'ifsc_details', {})).map(
                      key => (
                        <ModalRow>
                          <div>
                            <Text color="bodyLight">{_startCase(key)}</Text>
                          </div>

                          <div className="text-wrap">
                            {_get(modalData, `ifsc_details.${key}`, '-')}
                          </div>
                        </ModalRow>
                      ),
                    )}
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
              </>
            )}
          </div>
        </Space>

        <BtnContainer>
          <Space justifyContent="space-between" alignItems="center">
            <Space
              alignItems="center"
              justifyContent="center"
              gap={1}
              className="pointer"
              onClick={() =>
                window.open(
                  isAdvance ? MOBILE_360_ADVANCE_DOC : MOBILE_360_LITE_DOC,
                  '_blank',
                )
              }
            >
              <Icon name="top-right-arrow" />

              <Text color="primary" variant="b14">
                Checkout All Responses for API
              </Text>
            </Space>

            <Button primary onClick={onClose} data-event-name="Primary_Button">
              Okay, Got It
            </Button>
          </Space>
        </BtnContainer>
      </ModalContent>
    </Modal>
  );
};

ValidModal.propTypes = {
  modalData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isAdvance: PropTypes.bool,
};

export default ValidModal;
