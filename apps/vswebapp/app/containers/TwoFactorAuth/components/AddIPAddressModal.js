import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Label,
  Space,
  toast,
  Conditional,
} from '@cashfree-intl/coherent';
import _trim from 'lodash/trim';

// Services
import { addIPs } from 'services/developers';

// Utils
import Regex from 'utils/regex';
import { isIpDisabled } from '../utils';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';
import { LabelWrapper, WarningLabel } from '../styled';

// Components
import IPLabelWithPopup from './IPLabelWithPopup';

const AddIPAddressModal = ({ onClose, onSubmit }) => {
  const [value, setValue] = useState('');
  const [ips, setIps] = useState([]);
  const [failedIPs, setFailedIPs] = useState([]);

  const handleAddIP = async () => {
    const uniqueIPs = Array.from(new Set(ips));

    // Include input field value if it exists and is not duplicate
    let body = uniqueIPs;
    if (value.trim()) {
      const inputIP = value.trim();
      if (!uniqueIPs.includes(inputIP)) {
        body = [...uniqueIPs, inputIP];
      } else {
        setValue('');
        return;
      }
    }

    const response = await addIPs(body);

    if (!response.error) {
      if (response?.failedIPs && response?.failedIPs?.length > 0) {
        setFailedIPs(response.failedIPs);

        // Keep only failed IPs in the labels
        const failedIPAddresses = response.failedIPs.map(failed => failed.ip);
        setIps(failedIPAddresses);
        // Clear input field
        setValue('');
      } else {
        onClose();
      }
      toast.success(response?.message || 'IP Addresses added successfully');
      onSubmit();
    }
  };

  const handleKeyDown = e => {
    // comma
    if (e.keyCode === 188) {
      e.preventDefault();
    }

    // enter, space & comma
    if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188) {
      const ip = _trim(value);

      if (Regex.ip(ip)) {
        // Check if IP already exists
        if (!ips.includes(ip)) {
          setIps(prev => prev.concat(ip));
        }
        setValue('');
      }
    }
  };

  const handleIPRemove = selectedIP => {
    setIps(prev => prev.filter(ip => ip !== selectedIP));
    // Also remove from failed IPs if it exists
    setFailedIPs(prev => prev.filter(failed => failed.ip !== selectedIP));
  };

  const getFailedIPReason = ip => {
    const failedIP = failedIPs.find(failed => failed.ip === ip);
    return failedIP ? failedIP.reason : null;
  };

  const isFailedIP = ip => {
    return failedIPs.some(failed => failed.ip === ip);
  };

  return (
    <Modal $maxWidth="440" open>
      <ModalHeader>
        Add IP Address{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_AddIPAddress_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text color="bodyLight">IP Address</Text>
          <LabelWrapper>
            <Space wrap gap={0.5}>
              {ips.map(ip => {
                const isFailed = isFailedIP(ip);
                const reason = getFailedIPReason(ip);
                const LabelComponent = isFailed ? WarningLabel : Label;

                return (
                  <IPLabelWithPopup
                    key={ip}
                    ip={ip}
                    isFailed={isFailed}
                    reason={reason}
                    onRemove={handleIPRemove}
                    LabelComponent={LabelComponent}
                  />
                );
              })}
            </Space>
            <input
              type="text"
              value={value}
              onKeyDown={handleKeyDown}
              onChange={e => setValue(e.target.value)}
              placeholder="Ex: 000.000.00.000, 111.111.11.111"
            />
          </LabelWrapper>
          <Conditional if={!failedIPs?.length}>
            <Text variant="b12" color="bodyLight">
              Use comma (&#44;) or press &#34;space bar&#34; key to add multiple
              IPs
            </Text>
          </Conditional>
          <Conditional if={failedIPs?.length}>
            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                Hover over the IP to see the reason for failure.
              </Text>
            </StyledRateBanner>
          </Conditional>
          <BtnContainer>
            <Button
              as="a"
              link
              onClick={onClose}
              data-event-name="Form_AddIPAddress_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              primary
              className="ml-4"
              onClick={handleAddIP}
              disabled={isIpDisabled(ips, value) || failedIPs?.length}
              data-event-name="Form_AddIPAddress_PrimaryButton"
            >
              Add IP Address
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

AddIPAddressModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddIPAddressModal;
