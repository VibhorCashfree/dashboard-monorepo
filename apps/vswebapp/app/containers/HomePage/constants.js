import React from 'react';

// Utils
import Env from 'utils/env';
// Components
import {
  Summary,
  Accounts,
  Reports,
  Developers,
  Forms,
  Analytics,
  Vault,
  AadhaarOCR,
} from 'components/SidebarIcons';

export const featureItems = [
  {
    rank: 1,
    key: 'home',
    icon: Summary,
    displayText: 'Home',
  },
  {
    rank: 2,
    key: 'analytics',
    icon: Analytics,
    displayText: 'Analytics',
  },
  {
    rank: 3,
    key: 'kyc-link',
    icon: Forms,
    displayText: 'KYC Studio',
    isParent: true,
    children: [
      {
        displayText: 'All Verifications',
        rank: 1,
        key: 'kyc-link',
      },
      {
        displayText: 'KYC Templates',
        rank: 2,
        key: 'kyc-template',
      },
    ],
  },
  {
    rank: 4,
    key: 'vkyc-all',
    icon: Forms,
    displayText: 'Video KYC',
    isParent: true,
    children: [
      {
        displayText: 'All Verifications',
        rank: 1,
        key: 'vkyc-all',
      },
      {
        displayText: 'Agents & Auditors',
        rank: 2,
        key: 'vkyc-role',
      },
    ],
  },
  {
    rank: 5,
    key: '1-click-onboarding',
    icon: Vault,
    displayText: '1-Click Onboarding',
  },
  {
    rank: 6,
    key: 'smart-ocr',
    icon: AadhaarOCR,
    displayText: 'Smart OCR',
  },
];

export const utilitiesItems = [
  {
    rank: 1,
    key: 'developers',
    icon: Developers,
    displayText: 'Developers',
    isParent: true,
    children: [
      {
        displayText: 'API Keys',
        rank: 1,
        key: 'developers/api-keys',
      },
      {
        displayText: 'Two-Factor Authentication',
        rank: 2,
        key: 'developers/2fa',
      },
      {
        displayText: 'Webhook',
        rank: 3,
        key: 'developers/webhook',
      },
    ],
  },
  {
    rank: 11,
    key: 'accounts',
    icon: Accounts,
    displayText: 'Accounts',
  },
  {
    rank: 12,
    key: 'reports',
    icon: Reports,
    displayText: 'Reports',
  },
];
