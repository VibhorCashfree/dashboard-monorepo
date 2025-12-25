import React, { useState } from 'react';
import _pick from 'lodash/pick';
import { Space, toast, Button, Text, Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import { copyToClipboard, triggerDownload } from 'utils/common';
import http from 'utils/http';

// Components
import StatusLabel from 'components/StatusLabel';
import Icon from 'components/Icon';

export const TAB_KEY = 'all';

const STATUSES = [
  'PRE_VIDEO_CALL',
  'VIDEO_CALL',
  'FAILED',
  'AGENT_REVIEWED',
  'AUDITOR_REVIEWED',
  'RECEIVED',
];

export const options = [
  // { text: 'Auditor Name', value: 'auditorName' },
  // { text: 'Agent Name', value: 'agentName' },
  { text: 'Mobile Number', value: 'mobile' },
];

// Reusable download recording function
const downloadRecording = async referenceId => {
  try {
    const data = await http.get(
      `/verification/vkyc?reference_id=${referenceId}`,
    );

    if (data?.recording_link) {
      triggerDownload({
        type: 'URL',
        payload: data.recording_link,
      });
      toast.success('Recording download started!');
    } else {
      toast.error('Recording link not found.');
    }
  } catch (error) {
    toast.error('Failed to fetch recording. Please try again.');
  }
};

export const COLUMN_ID = [
  {
    accessorKey: 'initiatedAt',
    header: 'Initiated At',
    width: 200,
    cell: ({ initiatedAt }) => formattedDate(initiatedAt),
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
    cell: ({ customerName }) => customerName || '–',
  },
  {
    accessorKey: 'referenceId',
    header: 'Reference ID',
    cell: ({ referenceId }) => referenceId || '–',
  },
  {
    accessorKey: 'phone',
    header: 'Phone Number',
    cell: ({ phone }) => phone || '–',
  },
  {
    accessorKey: 'sessionDuration',
    header: 'Session Duration',
    cell: row => {
      const { sessionDuration } = row;

      const handleSessionClick = e => {
        e.stopPropagation();
        downloadRecording(row.referenceId);
      };

      return row?.recordingAvailable ? (
        <Button
          link
          onClick={handleSessionClick}
          style={{ textAlign: 'left', padding: 0 }}
        >
          <Text
            color="primary"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {sessionDuration || '-'}
          </Text>
        </Button>
      ) : (
        <Text>{sessionDuration || '–'}</Text>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
  {
    accessorKey: 'actions',
    cell: row => {
      const onCopyClick = e => {
        e.stopPropagation();
        copyToClipboard(row.vkycLink || '');
        toast.success('Verification link copied to clipboard!');
      };

      const onDownloadClick = e => {
        e.stopPropagation();
        downloadRecording(row.referenceId);
      };

      return (
        <Space gap={1} justifyContent="flex-end">
          <Popup
            content="Copy Video KYC link"
            trigger={
              <Button
                disabled={row?.status === 'COMPLETED'}
                className="p-0 m-0"
                style={{ minWidth: 0 }}
                link
                onClick={onCopyClick}
                icon={
                  <Icon
                    name="copy"
                    fill={row?.status === 'COMPLETED' ? '#6B6C7B' : null}
                  />
                }
              />
            }
          />
          <Popup
            content="Download video recording"
            trigger={
              <Button
                className="p-0 m-0"
                style={{ minWidth: 0 }}
                link
                onClick={onDownloadClick}
                disabled={!row?.recordingAvailable}
                icon={
                  <Icon
                    name="download"
                    fill={!row?.recordingAvailable ? '#6B6C7B' : null}
                  />
                }
              />
            }
          />
        </Space>
      );
    },
  },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  Status: {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const MODAL_TYPES = {
  CREATE_LINK: 'CREATE_LINK',
  LINK_CREATED: 'LINK_CREATED',
  VIEW_TEMPLATE: 'VIEW_TEMPLATE',
};

// Required fields for each step of the session creation
export const REQUIRED_FIELDS = {
  STEP_ONE: ['name', 'phone'],
};

export const CHANNELS = [
  {
    key: 'sms',
    text: 'SMS',
  },
  {
    key: 'whatsapp',
    text: 'WhatsApp',
  },
];
