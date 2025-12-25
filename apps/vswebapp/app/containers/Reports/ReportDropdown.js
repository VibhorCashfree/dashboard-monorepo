import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Space,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

const ReportDropdown = ({
  reportType,
  validReportTypes,
  handleReportSelect,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      button
      icon={null}
      className="mr-2"
      style={{ minWidth: 328 }}
      trigger={
        <Space justifyContent="space-between" fullWidth>
          <Text>{reportType ? reportType.text : 'Select'}</Text>
          <Icon name={open ? 'chevron-up' : 'chevron-down'} className="ml-1" />
        </Space>
      }
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      data-testid="reports-dropdown"
    >
      <DropdownMenu
        style={{
          minWidth: 328,
          zIndex: 1001,
          height: '500px',
          overflowY: 'scroll',
        }}
      >
        {validReportTypes.map(report => (
          <DropdownItem
            onClick={() => handleReportSelect(report)}
            key={report.type}
            selected={!!reportType && report.type === reportType.type}
          >
            <Space gap={1} direction="column">
              <Text>{report.name}</Text>
              <Text
                variant="b12"
                color="bodyLight"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {report.description}
              </Text>
            </Space>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

ReportDropdown.propTypes = {
  reportType: PropTypes.object.isRequired,
  validReportTypes: PropTypes.array.isRequired,
  handleReportSelect: PropTypes.func.isRequired,
};

export default ReportDropdown;
