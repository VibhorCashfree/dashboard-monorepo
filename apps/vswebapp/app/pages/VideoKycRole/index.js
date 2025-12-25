import React from 'react';

// Containers
import VideoKycRole from 'containers/VideoKycRole';

// Providers
import { ListProvider } from 'providers/ListProvider';

const VideoKycRolePage = () => (
  <ListProvider>
    <VideoKycRole />
  </ListProvider>
);

export default VideoKycRolePage;
