import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  ModalContent,
  ModalDescription,
  Image,
  Space,
} from '@cashfree-intl/coherent';
import _startCase from 'lodash/startCase';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Components
import NameMatchLabel from 'components/NameMatchLabel';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';
import { StyledAlertModal } from '../styled';

const BankAccountExistsModal = ({ onClose, type, title, data }) => (
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
              <div className="text-wrap">{data.name || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Bank A/c No.</Text>
              </div>
              <div className="text-wrap">{data.bank_account || '–'}</div>
            </ModalRow>
          </Space>
          <Space fullWidth gap={1}>
            <ModalRow>
              <div>
                <Text color="bodyLight">IFSC</Text>
              </div>
              <div className="text-wrap">{data.ifsc || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Account Status Code</Text>
              </div>
              <div className="text-wrap">
                {_startCase(data.account_status_code) || '–'}
              </div>
            </ModalRow>
          </Space>

          {type === 'success' && (
            <>
              <Divider contain />
              <Space fullWidth gap={1}>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Name at Bank</Text>
                  </div>
                  <div className="text-wrap">{data.name_at_bank || '–'}</div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Bank</Text>
                  </div>
                  <div className="text-wrap">{data.bank_name || '–'}</div>
                </ModalRow>
              </Space>
              <Space fullWidth gap={1}>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Branch</Text>
                  </div>
                  <div className="text-wrap">{data.branch || '–'}</div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">City</Text>
                  </div>
                  <div className="text-wrap">{data.city || '–'}</div>
                </ModalRow>
              </Space>
              <Space fullWidth gap={1}>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Reference Id</Text>
                  </div>
                  <div className="text-wrap">{data?.reference_id || '–'}</div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">MICR</Text>
                  </div>
                  <div className="text-wrap">{data?.micr || '–'}</div>
                </ModalRow>
              </Space>
              <Space fullWidth gap={1}>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">UTR</Text>
                  </div>
                  <div className="text-wrap">{data?.utr || '-'}</div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Name Match Result</Text>
                  </div>
                  <div className="text-wrap">
                    {data.name_match_score && data.name_match_result !== '-' ? (
                      <NameMatchLabel
                        score={data.name_match_score}
                        result={data.name_match_result}
                      />
                    ) : (
                      '–'
                    )}
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

BankAccountExistsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'info']),
  title: PropTypes.string,
  data: PropTypes.object,
};

export default BankAccountExistsModal;
