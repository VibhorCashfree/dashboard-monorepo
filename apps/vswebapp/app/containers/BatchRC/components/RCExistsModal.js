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
import StatusLabel from 'components/StatusLabel';
import IconComponent from 'components/Icon';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow } from 'styled/common';
import { StyledAlertModal } from '../styled';

const RCExistsModal = ({ type, title, data, onClose }) => {
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
                <Text color="bodyLight">RC Number</Text>
              </div>
              <div className="text-wrap">{data.vehicle_number || '–'}</div>
            </ModalRow>

            <Divider contain />

            <ModalRow>
              <div>
                <Text color="bodyLight">Class</Text>
              </div>
              <div className="text-wrap">{data.class || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Chassis</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'chassis', '–') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Engine</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'engine', '–') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Vehicle Manufacturer</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'vehicle_manufacturer_name', '–') || '–'}
              </div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Model</Text>
              </div>
              <div className="text-wrap">{_get(data, 'model', '–') || '–'}</div>
            </ModalRow>
            <ModalRow>
              <div>
                <Text color="bodyLight">Type</Text>
              </div>
              <div className="text-wrap">{_get(data, 'type', '–') || '–'}</div>
            </ModalRow>

            {showMore && (
              <>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Norms Type</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'norms_type', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Body Type</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'body_type', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Owner Count</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'owner_count', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Owner Name</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'owner', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Owner's Father's Name</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'owner_father_name', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Mobile Number </Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'mobile_number', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Status As On</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'status_as_on', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">RC Status</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'rc_status') ? (
                      <StatusLabel>{_get(data, 'rc_status')}</StatusLabel>
                    ) : (
                      '–'
                    )}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Reg. Authority</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'reg_authority', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Reg. Date</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'reg_date', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">
                      Vehicle Manufacturing Month Year
                    </Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'vehicle_manufacturing_month_year', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">RC Expiry Date</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'rc_expiry_date', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Vehicle Tax Upto </Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'vehicle_tax_upto', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">
                      Vehicle Insurance Company Name
                    </Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'vehicle_insurance_company_name', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Vehicle Insurance Upto</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'vehicle_insurance_upto', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Vehicle Insurance Policy No. </Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'vehicle_insurance_policy_number', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">RC Financer</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'rc_financer', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Present Address</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'present_address', '–') || '–'}
                  </div>
                </ModalRow>
                <ModalRow>
                  <div>
                    <Text color="bodyLight">Permanent Address</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'permanent_address', '–') || '–'}
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
                    'https://docs.cashfree.com/reference/vehiclerc',
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

RCExistsModal.propTypes = {
  type: PropTypes.oneOf(['success', 'info']),
  title: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default RCExistsModal;
