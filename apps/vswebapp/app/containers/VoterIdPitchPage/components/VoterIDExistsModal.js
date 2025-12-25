import React, { useState } from 'react';
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

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';
import { StyledAlertModal } from '../styled';

const VoterIDExistsModal = ({ type, title, data, onClose }) => {
  const [showMore, setShowMore] = useState(false);

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
                <Text color="bodyLight">Voter ID Number</Text>
              </div>
              <div className="text-wrap">{data.epic_number || '–'}</div>
            </ModalRow>

            <Divider contain />

            <ModalRow>
              <div>
                <Text color="bodyLight">Name</Text>
              </div>
              <div className="text-wrap">{data.name || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Name In Regional Language</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'name_in_regional_lang', '–')}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Relation Type</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'relation_type', '–')}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Relation Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'relation_name', '–')}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">
                  Relation Name In Regional Language
                </Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'relation_name_in_regional_lang', '–')}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Father Name</Text>
              </div>
              <div className="text-wrap">{_get(data, 'father_name', '–')}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Date Of Birth</Text>
              </div>
              <div className="text-wrap">{_get(data, 'dob', '–')}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Gender</Text>
              </div>
              <div className="text-wrap">{_get(data, 'gender', '–')}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-wrap">{_get(data, 'address', '–')}</div>
            </ModalRow>

            {showMore && (
              <>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">State</Text>
                  </div>
                  <div className="text-wrap">{_get(data, 'state', '–')}</div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Assembly Constituency No.</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'assembly_constituency_number', '–')}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Assembly Constituency</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'assembly_constituency', '–')}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">
                      Parliamentary Constituency No.
                    </Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'parliamentary_constituency_number', '–')}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Parliamentary Constituency</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'parliamentary_constituency', '–')}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Part No.</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'part_number', '–')}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Part Name</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'part_name', '–')}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Serial No.</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'serial_number', '–')}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Polling Station</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'polling_station', '–')}
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
              <Text color="primary" variant="b14">
                View {showMore ? 'Less' : 'More'} Details
              </Text>
              <Icon name={showMore ? 'chevron-up' : 'chevron-down'} />
            </Space>
          </div>

          <BtnContainer>
            <Button primary onClick={onClose} data-event-name="Primary_Button">
              Okay, Got It
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledAlertModal>
  );
};

VoterIDExistsModal.propTypes = {
  type: PropTypes.oneOf(['success', 'info']),
  title: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default VoterIDExistsModal;
