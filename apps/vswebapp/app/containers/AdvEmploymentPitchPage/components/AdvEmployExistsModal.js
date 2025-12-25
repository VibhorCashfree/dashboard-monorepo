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

// Components
import IconComponent from 'components/Icon';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';
import { StyledAlertModal, StyledScore } from '../styled';

const AdvEmployExistsModal = ({ type, title, data, onClose }) => {
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
              <Text variant="b14" strong>
                GENERAL DETAILS
              </Text>
              <div />
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">UAN</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].uan') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Gender</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].basic_details.gender') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Date of Birth</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].basic_details.dob') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Employee Confidence Score</Text>
              </div>
              <div>
                <StyledScore as="span">
                  {_get(
                    data,
                    'uan_details[0].basic_details.employee_confidence_score',
                    '–',
                  )}
                </StyledScore>
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Employee Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].basic_details.employee_name') ||
                  '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Phone Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].basic_details.phone') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Aadhaar</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].additional_details.aadhaar') || '–'}
              </div>
            </ModalRow>

            <Divider contain />

            <ModalRow>
              <Text variant="b14" strong>
                EMPLOYMENT DETAILS
              </Text>
              <div />
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Member ID</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].employment_details.member_id') ||
                  '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Establishment ID</Text>
              </div>
              <div className="text-wrap">
                {_get(
                  data,
                  'uan_details[0].employment_details.establishment_id',
                ) || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Exit Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].employment_details.exit_date') ||
                  '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Leave Reason</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'uan_details[0].employment_details.leave_reason') ||
                  '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Establishment Name</Text>
              </div>
              <div className="text-wrap">
                {_get(
                  data,
                  'uan_details[0].employment_details.establishment_name',
                ) || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Employer Confidence Score</Text>
              </div>
              <div>
                <StyledScore as="span">
                  {_get(
                    data,
                    'uan_details[0].employment_details.employer_confidence_score',
                    '–',
                  )}
                </StyledScore>
              </div>
            </ModalRow>
            {showMore && (
              <>
                <Divider contain />

                <ModalRow>
                  <Text variant="b14" strong>
                    ADDITIONAL DETAILS
                  </Text>
                  <div />
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Email</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'uan_details[0].additional_details.email') ||
                      '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Pan</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'uan_details[0].additional_details.pan') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">IFSC</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'uan_details[0].additional_details.ifsc') ||
                      '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Bank Account</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(
                      data,
                      'uan_details[0].additional_details.bank_account',
                    ) || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Bank Address</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(
                      data,
                      'uan_details[0].additional_details.bank_address',
                    ) || '–'}
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
            <Space justifyContent="space-between" alignItems="center">
              <Space
                alignItems="center"
                justifyContent="center"
                gap={1}
                className="pointer"
                onClick={() =>
                  window.open(
                    'https://docs.cashfree.com/reference/advanceemploymentapi',
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

AdvEmployExistsModal.propTypes = {
  type: PropTypes.oneOf(['success', 'info']),
  title: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default AdvEmployExistsModal;
