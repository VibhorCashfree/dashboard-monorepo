import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Containers
import AllVideoKyc from 'containers/AllVideoKyc';
import VideoKycDetails from 'containers/VideoKycDetails';

// Provider
import { ListProvider } from 'providers/ListProvider';

const VideoKyc = () => (
  <ListProvider>
    <Routes>
      <Route path=":id/details" element={<VideoKycDetails />} />
      <Route path="*" element={<AllVideoKyc />} />
    </Routes>
  </ListProvider>
);

export default VideoKyc;
