import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import EmailNotifications from 'containers/Settings/components/EmailNotifications';
import SetThreshold from 'containers/Settings/components/SetThreshold';

// Styled
import { StyledSettings } from 'containers/Settings/styled';

const Settings = () => (
  <StyledSettings>
    <Routes>
      <Route path="email-notifications" element={<EmailNotifications />} />
      <Route path="set-threshold" element={<SetThreshold />} />
      <Route path="*" element={<Navigate to="email-notifications" replace />} />
    </Routes>
  </StyledSettings>
);

export default withReadPermission(Settings, {
  code: 2200,
  description: 'access Settings',
});
