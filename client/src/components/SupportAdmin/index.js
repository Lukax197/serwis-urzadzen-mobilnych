import React from 'react';

import { ChatEngine } from 'react-chat-engine'

const SupportAdmin = () => {
  return (
    <ChatEngine 
      projectID={process.env.REACT_APP_CE_PROJECT_ID}
      userName={process.env.REACT_APP_USERNAME}
      userSecret={process.env.REACT_APP_USER_SECRET}
      height='calc(100vh - 250px)'
    />
  );
}

export default SupportAdmin;
