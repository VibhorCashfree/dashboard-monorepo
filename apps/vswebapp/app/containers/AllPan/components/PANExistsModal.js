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
import NameMatchLabel from 'components/NameMatchLabel';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';
import { StyledAlertModal } from '../styled';

// Helpers
import { formattedDate } from 'helpers/common';

const PANExistsModal = ({ type, title, data, onClose }) => {
  const { preferences } = useContext(AccountContext);

  const isPanValid = data?.valid ? 'Yes' : 'No';

  return (
    <StyledAlertModal open>
      <ModalContent>
        <ModalDescription>
          <div className="mt-1 text-center">
            <Image inline src={getAlertIcon(type)} />
            <Text variant="h16" strong className="my-3">
              {title}
            </Text>
            <Space fullWidth gap={1}>
              <ModalRow>
                <div>
                  <Text color="bodyLight">Name Provided</Text>
                </div>
                <div className="text-wrap">{data?.name_provided || '–'}</div>
              </ModalRow>
              <ModalRow>
                <div>
                  <Text color="bodyLight">PAN</Text>
                </div>
                <div className="text-wrap">{data?.pan || '–'}</div>
              </ModalRow>
            </Space>
            {type === 'success' && (
              <>
                <Divider contain />
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Registered Name</Text>
                    </div>
                    <div className="text-wrap">
                      {data?.registered_name || '–'}
                    </div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">PAN Type</Text>
                    </div>
                    <div className="text-wrap">{data?.type || '–'}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">PAN Ref. ID</Text>
                    </div>
                    <div className="text-wrap">{data?.reference_id || '–'}</div>
                  </ModalRow>
                  {preferences?.pan?.nameMatch ? (
                    <ModalRow>
                      <div>
                        <Text color="bodyLight">Name Match Score</Text>
                      </div>
                      <div className="text-wrap">
                        {data?.name_match_score || '–'}
                      </div>
                    </ModalRow>
                  ) : (
                    <ModalRow>
                      <div />
                      <div />
                    </ModalRow>
                  )}
                </Space>
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Valid</Text>
                    </div>
                    <div className="text-wrap">{isPanValid || '–'}</div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Message</Text>
                    </div>
                    <div className="text-wrap">{data?.message || '–'}</div>
                  </ModalRow>
                </Space>
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Name Match Result</Text>
                    </div>
                    <div className="text-wrap">
                      {data?.name_match_score &&
                      data?.name_match_result !== '-' ? (
                          <NameMatchLabel
                            score={data?.name_match_score}
                            result={data?.name_match_result}
                          />
                        ) : (
                          '–'
                        )}
                    </div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Aadhaar Seeding Status</Text>
                    </div>
                    <div className="text-wrap">
                      {data?.aadhaar_seeding_status || '–'}
                    </div>
                  </ModalRow>
                </Space>
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Last updated at</Text>
                    </div>
                    <div className="text-wrap">
                      {data?.last_updated_at || '-'}
                    </div>
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
                <Space fullWidth gap={1}>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">Pan Status</Text>
                    </div>
                    <div className="text-wrap">{data?.pan_status || '-'}</div>
                  </ModalRow>
                  <ModalRow>
                    <div>
                      <Text color="bodyLight">
                        Aadhaar Seeding Status Description
                      </Text>
                    </div>
                    <div className="text-wrap">
                      {data?.aadhaar_seeding_status_desc || '–'}
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
