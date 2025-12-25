import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Cross, Popup, Space } from '@cashfree-intl/coherent';

const IPLabelWithPopup = ({
  ip,
  isFailed,
  reason,
  onRemove,
  LabelComponent,
}) => {
  const labelRef = useRef(null);

  return (
    <Space wrap ref={labelRef} style={{ width: 'fit-content' }}>
      <Popup
        position="top center"
        content={isFailed ? reason : null}
        disabled={!isFailed}
        context={labelRef}
        trigger={
          <LabelComponent>
            {ip}
            <Cross size="sm" className="pl-1" onClick={() => onRemove(ip)} />
          </LabelComponent>
        }
      />
    </Space>
  );
};

IPLabelWithPopup.propTypes = {
  ip: PropTypes.string.isRequired,
  isFailed: PropTypes.bool.isRequired,
  reason: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  LabelComponent: PropTypes.elementType.isRequired,
};

export default IPLabelWithPopup;
