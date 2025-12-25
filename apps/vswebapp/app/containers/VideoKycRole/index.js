import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Space,
  Button,
  Text,
  Icon,
  Tab,
  TabPane,
} from '@cashfree-intl/coherent';

// Constants
import { menuConfig } from 'constants/common';

// Components
import Modals from './Modals';
import Tabs from './Tabs';

// Containers
import Agent from 'containers/AllAgent';
import Auditor from 'containers/AllAuditor';

// Styled
import { PageHeading } from 'styled/common';

// Provider
import { ListContext } from 'providers/ListProvider';
import { MODAL_TYPES } from './constants';

const VideoKYC = () => {
  const [modalType, setModalType] = useState();
  const [role, setRole] = useState('AGENT');
  const [fetchCounter, setFetchCounter] = useState(0);

  const addSpecificRole = role => {
    setRole(role);
    setModalType(MODAL_TYPES.CREATE_ROLE);
  };

  return (
    <>
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mb-4"
      >
        <Space direction="column" gap={0.5}>
          <PageHeading className="m-0">
            <span>Video KYC </span>- Agents & Auditors
          </PageHeading>
          <Text variant="h16" color="bodyLight">
            Here’s what’s happening with your agents and auditors
          </Text>
        </Space>

        <Space gap={2} alignItems="center">
          <Button onClick={() => setModalType('GENERATE_REPORT')} secondary>
            Generate Reports
          </Button>
          <Button
            primary
            onClick={() => setModalType('CREATE_ROLE')}
            icon={<Icon name="plus" fill="white" width={16} height={16} />}
          >
            Add Agent / Auditor
          </Button>
        </Space>
      </Space>

      <Routes>
        <Route
          path=":tabId"
          element={
            <Tabs
              fetchCounter={fetchCounter}
              addSpecificRole={addSpecificRole}
            />
          }
        />
        <Route path="*" element={<Navigate to="agent" replace />} />
      </Routes>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          role={role}
        />
      )}
    </>
  );
};

export default VideoKYC;
