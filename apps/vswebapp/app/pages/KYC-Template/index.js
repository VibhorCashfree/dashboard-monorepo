import React, { useState } from 'react';
import { WorkFlowProvider } from '@cashfree-intl/workflow';
import { Routes, Route, Navigate } from 'react-router-dom';
import _remove from 'lodash/remove';

// Providers
import { ListProvider } from 'providers/ListProvider';

// Containers
import Journey from 'containers/JourneysKycLink';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

const Template = () => {
  return (
    <ListProvider>
      <PageHeader>KYC Studio - Templates</PageHeader>
      <MetaTags title="Secure ID – KYC Link" />

      <WorkFlowProvider>
        <Journey />
      </WorkFlowProvider>
    </ListProvider>
  );
};

export default Template;
