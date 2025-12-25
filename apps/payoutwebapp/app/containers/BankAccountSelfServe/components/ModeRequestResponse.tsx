import React from 'react';
import { Space, Text, Paper } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import Copy from 'components/Copy';

// Styled
import { CodeWrapper } from 'styled/common';

// Types
import type { ModeRequestResponseProps } from '../types';

const ModeRequestResponse: React.FC<ModeRequestResponseProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  let response: string;

  try {
    response = JSON.stringify(JSON.parse(data.response), null, 2);
  } catch (error) {
    response = data.response;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '25%',
        maxWidth: '500px',
      }}
    >
      <Text variant="h16" className="mb-2">
        Logs: {data.transferType}
      </Text>

      <Space justifyContent="space-between">
        <Text className="mb-1" color="bodyLight">
          Request:
        </Text>
        <Copy
          value={`curl --request POST 
  --url '${data.bankUrl}' 
  --header 'accept: application/json' 
  --header 'content-type: application/json'
  --data-raw '${data.request}'`}
        />
      </Space>
      <CodeWrapper className="mb-4">
        <pre>
          {`curl --request POST 
--url '${data.bankUrl}' 
--header 'accept: application/json' 
--header 'content-type: application/json'
--data-raw '${data.request}'`}
        </pre>
      </CodeWrapper>

      <Space justifyContent="space-between">
        <Text className="mb-1" color="bodyLight">
          Response:
        </Text>
        <Copy value={response} />
      </Space>
      <CodeWrapper className="mb-4">
        <pre>{response}</pre>
      </CodeWrapper>

      <Text className="mb-1" color="bodyLight">
        Comment:
      </Text>
      <Paper>
        {data.verified
          ? 'The credentials for this mode are successfully verified. You may verify the credentials for the other modes.'
          : 'The credentials for this mode could not be successfully verified. This is typically the case when the credentials are incorrect. Please copy the request & response logs and send it to the bank.'}
      </Paper>
    </div>
  );
};

export default withErrorBoundary(ModeRequestResponse);
