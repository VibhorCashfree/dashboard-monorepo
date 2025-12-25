import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Space,
  Paper,
  Text,
  Conditional,
  toast,
  Button,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import { triggerDownload } from 'utils/common';
import http from 'utils/http';

// Components
import Copy from 'components/Copy';
import StatusLabel from 'components/StatusLabel';
import Loader from 'components/Loader';
import Icon from 'components/Icon';

// Styled
import { DetailsRow, BackButtonWrapper, Divider, Action } from 'styled/common';

const VideoKycDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const rowDetails = _get(location.state, 'rowDetails', {});

  // Download recording function
  const downloadRecording = async referenceId => {
    try {
      const response = await http.get(
        `/verification/vkyc?reference_id=${referenceId}`,
      );

      if (response?.recording_link) {
        triggerDownload({
          type: 'URL',
          payload: response.recording_link,
        });
        toast.success('Recording download started!');
      } else {
        toast.error('Recording link not found.');
      }
    } catch (error) {
      toast.error('Failed to fetch recording. Please try again.');
    }
  };

  useEffect(() => {
    (async function fetchData() {
      try {
        setLoading(true);
        setData(rowDetails);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, rowDetails]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>
      <Paper>
        <Space justifyContent="space-between">
          <div>
            <Text color="bodyLight" className="mb-1">
              Reference ID
            </Text>
            <Text variant="h16">
              <Space gap={1} justifyContent="center" alignItems="center">
                <span>{_get(data, 'referenceId') || '–'}</span>
                <Action>
                  <Copy value={_get(data, 'referenceId')} />
                </Action>
              </Space>
            </Text>
          </div>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {_get(data, 'status')}
            </StatusLabel>
          </div>
        </Space>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Session Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">ID</Text>
          </div>
          <div>{_get(data, 'id') || '–'}</div>
          <div>
            <Text color="bodyLight">Customer Name</Text>
          </div>
          <div>{_get(data, 'customerName') || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Initiated At</Text>
          </div>
          <div>{formattedDate(_get(data, 'initiatedAt')) || '–'}</div>
          <div>
            <Text color="bodyLight">Phone Number</Text>
          </div>
          <div>{_get(data, 'phone') || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Session Duration</Text>
          </div>
          <div>
            {_get(data, 'recordingAvailable') ? (
              <Button
                link
                onClick={() => downloadRecording(_get(data, 'referenceId'))}
                style={{ textAlign: 'left', padding: 0 }}
              >
                <Text
                  color="primary"
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {_get(data, 'sessionDuration') || '–'}
                </Text>
              </Button>
            ) : (
              <Text>{_get(data, 'sessionDuration') || '–'}</Text>
            )}
          </div>
          <div>
            <Text color="bodyLight">Recording</Text>
          </div>
          <div>
            <Space gap={1} alignItems="center">
              <Button
                link
                disabled={!_get(data, 'recordingAvailable')}
                onClick={() => downloadRecording(_get(data, 'referenceId'))}
                style={{ padding: 0, minWidth: 0 }}
                icon={
                  <Icon
                    name="download"
                    fill={!_get(data, 'recordingAvailable') ? '#6B6C7B' : null}
                  />
                }
              />
            </Space>
          </div>
        </DetailsRow>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Agent</Text>
          </div>
          <div>{_get(data, 'agent') || '–'}</div>
          <div>
            <Text color="bodyLight">Auditor</Text>
          </div>
          <div>{_get(data, 'auditor') || '–'}</div>
        </DetailsRow>

        <DetailsRow>
          <Conditional if={_get(data, 'status') !== 'COMPLETED'}>
            <div>
              <Text color="bodyLight">Video KYC Link</Text>
            </div>
            <div className="text-wrap">
              {_get(data, 'vkycLink') ? (
                <Space gap={1} alignItems="center">
                  <Text
                    color="primary"
                    style={{
                      wordBreak: 'break-all',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '200px',
                      display: 'inline-block',
                    }}
                  >
                    {_get(data, 'vkycLink')}
                  </Text>
                  <Action>
                    <Copy value={_get(data, 'vkycLink')} />
                  </Action>
                </Space>
              ) : (
                '–'
              )}
            </div>
          </Conditional>
          <div />
          <div />
        </DetailsRow>

        <Divider />
        <Text variant="h16" strong className="my-3">
          Verification Status
        </Text>

        <DetailsRow className="mb-0">
          <div>
            <Text color="bodyLight">Current Status</Text>
          </div>
          <div>
            <StatusLabel>{_get(data, 'status')}</StatusLabel>
          </div>
          <div>
            <Text color="bodyLight">Last Updated</Text>
          </div>
          <div>
            {formattedDate(
              _get(data, 'lastUpdated') || _get(data, 'initiatedAt'),
            ) || '–'}
          </div>
        </DetailsRow>
      </Paper>
    </>
  );
};

export default VideoKycDetails;
