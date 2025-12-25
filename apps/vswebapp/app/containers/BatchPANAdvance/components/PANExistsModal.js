import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  ModalContent,
  ModalDescription,
  Image,
  Space,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _capitalize from 'lodash/capitalize';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';
import { StyledAlertModal } from '../styled';

const PANExistsModal = ({ type, title, data, onClose }) => {
  const { preferences } = useContext(AccountContext);

  return (
    <StyledAlertModal open>
      <ModalContent>
        <ModalDescription>
          <div className="mt-1 text-center">
            <Image inline src={getAlertIcon(type)} />
            <Text variant="h16" strong className="my-3">
              {title}
            </Text>
            <Space fullWidth>
              <ModalRow>
                <div>
                  <Text color="bodyLight">Name Provided</Text>
                </div>
                <div className="text-wrap">{data.name_provided || '–'}</div>
              </ModalRow>
              <ModalRow>
                <div>
                  <Text color="bodyLight">PAN</Text>
                </div>
                <div className="text-wrap">{data.pan || '–'}</div>
              </ModalRow>
            </Space>
            {type === 'success' && (
              <>
                <Divider contain />
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">First Name</Text>
                    </div>
                    <div className="text-wrap">{data?.first_name || '–'}</div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Last Name</Text>
                    </div>
                    <div className="text-wrap">{data?.last_name || '–'}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Registered Name</Text>
                    </div>
                    <div className="text-wrap">
                      {data.registered_name || '–'}
                    </div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">PAN Type</Text>
                    </div>
                    <div className="text-wrap">{data.type || '–'}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Gender</Text>
                    </div>
                    <div className="text-wrap">{_capitalize(data.gender)}</div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Date of Birth</Text>
                    </div>
                    <div className="text-wrap">{data.date_of_birth || '–'}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Masked Aadhar</Text>
                    </div>
                    <div className="text-wrap">
                      {data.masked_aadhaar_number || '–'}
                    </div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Email</Text>
                    </div>
                    <div className="text-wrap">{data.email || '–'}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Mobile number</Text>
                    </div>
                    <div className="text-wrap">{data.mobile_number || '–'}</div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Aadhaar Link</Text>
                    </div>
                    <div className="text-wrap">
                      {_capitalize(data.aadhaar_linked.toString())}
                    </div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow singleRow>
                    <div>
                      <Text color="bodyLight">Address</Text>
                    </div>
                    <div className="text-wrap">
                      {_get(data, 'address.full_address', '')}
                    </div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">PAN Ref. ID</Text>
                    </div>
                    <div className="text-wrap">{data.reference_id || '–'}</div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Status</Text>
                    </div>
                    <div className="text-wrap">{data?.status || '–'}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Message</Text>
                    </div>
                    <div className="text-wrap">{data?.message || '–'}</div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Name Pan Card</Text>
                    </div>
                    <div className="text-wrap">
                      {data?.name_pan_card || '–'}
                    </div>
                  </ModalRow>
                </Space>
                <Space fullWidth>
                  <ModalRow singleRow>
                    <div>
                      <Text color="bodyLight">Verification ID</Text>
                    </div>
                    <div className="text-wrap">
                      {data?.verification_id || '–'}
                    </div>
                  </ModalRow>
                </Space>
              </>
            )}
          </div>
          <BtnContainer textAlign="center">
            <Button primary onClick={onClose} data-event-name="Primary_Button">
              Close
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledAlertModal>
  );
};

PANExistsModal.propTypes = {
  type: PropTypes.oneOf(['success', 'info']),
  title: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PANExistsModal;
