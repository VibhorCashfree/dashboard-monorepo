import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Providers
import { ListProvider } from 'providers/ListProvider';

// Containers
import Digilocker from 'containers/Digilocker';
import DigilockerDetails from 'containers/DigilockerDetails';

const DigiLocker = () => (
  <ListProvider>
    <PageHeader>DigiLocker</PageHeader>
    <MetaTags title="Secure ID – DigiLocker" />

    {/* <Digilocker /> */}
    <Routes>
      <Route exact path=":id/details" element={<DigilockerDetails />} />
      <Route path="/" element={<Digilocker />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </ListProvider>
);

export default DigiLocker;
