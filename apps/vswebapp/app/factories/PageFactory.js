import React, { memo } from 'react';
import PropTypes from 'prop-types';

// Pages
import Summary from 'pages/Summary/Loadable';
import Accounts from 'pages/Accounts/Loadable';
import BankAccount from 'pages/BankAccount/Loadable';
import Ifsc from 'pages/Ifsc/Loadable';
import UPI from 'pages/UPI/Loadable';
import UPImobile from 'pages/UPImobile';
import Reports from 'pages/Reports/Loadable';
import Pan from 'pages/Pan/Loadable';
import PanOCR from 'pages/PanOCR/Loadable';
import GSTIN from 'pages/GSTIN/Loadable';
import OKYC from 'pages/OKYC/Loadable';
import AadhaarOCR from 'pages/AadhaarOCR/Loadable';
import BankAccountRPD from 'pages/BankAccountRPD/Loadable';
import Forms from 'pages/Forms/Loadable';
import Developers from 'pages/Developers';
import Settings from 'pages/Settings';
import ESign from 'pages/E-Sign';
import DigiLocker from 'pages/Digilocker';
import UPIAdvance from 'pages/UPIAdvance';
import PanAdvance from 'pages/PanAdvance';
import RC from 'pages/RC';
import DrivingLicense from 'pages/DrivingLicense';
import PanGstin from 'pages/PanGstin';
import Passport from 'pages/Passport';
import FaceMatch from 'pages/FaceMatch';
import CIN from 'pages/CIN';
import ReverseGeocoding from 'pages/ReverseGeocoding';
import NameMatch from 'pages/NameMatch';
import VoterId from 'pages/VoterId';
import AadhaarMasking from 'pages/AadhaarMasking';
import FaceLiveness from 'pages/FaceLivenessCheck'
import AdvanceEmployment from 'pages/AdvanceEmployment';
import Analytics from 'pages/Analytics';
import PanLite from 'pages/PanLite';
import MobileAdvance from 'pages/MobileAdvance/Loadable';
import Template from 'pages/KYC-Template/Loadable';
import KycVault from 'pages/KYC-Vault';
import GenericOCR from 'pages/GenericOCR';
import VideoKycRole from 'pages/VideoKycRole';
import VideoKyc from 'pages/VideoKyc';

const map = {
  home: Summary,
  accounts: Accounts,
  bav: BankAccount,
  'bav-rpd': BankAccountRPD,
  ifsc: Ifsc,
  upi: UPI,
  'upi-mobile': UPImobile,
  reports: Reports,
  pan: Pan,
  'pan-ocr': PanOCR,
  gstIn: GSTIN,
  // okyc: OKYC, // Commented out to remove Aadhaar OKYC from routing
  'aadhaar-ocr': AadhaarOCR,
  'kyc-link': Forms,
  'kyc-template': Template,
  developers: Developers,
  settings: Settings,
  esign: ESign,
  digilocker: DigiLocker,
  'upi-360': UPIAdvance,
  'pan-360': PanAdvance,
  RC,
  'driving-license': DrivingLicense,
  'pan-gstin': PanGstin,
  passport: Passport,
  'face-match': FaceMatch,
  cin: CIN,
  'reverse-geocoding': ReverseGeocoding,
  'name-match': NameMatch,
  'voter-id': VoterId,
  'aadhaar-masking': AadhaarMasking,
  faceLiveness: FaceLiveness,
  'advance-employment': AdvanceEmployment,
  analytics: Analytics,
  'pan-lite': PanLite,
  'mobile-360': MobileAdvance,
  '1-click-onboarding': KycVault,
  'smart-ocr': GenericOCR,
  'vkyc-role': VideoKycRole,
  'vkyc-all': VideoKyc,
};

const PageFactory = ({ componentName, ...props }) => {
  const TagName = map[componentName] || Summary;

  return <TagName {...props} />;
};

PageFactory.propTypes = {
  componentName: PropTypes.string.isRequired,
};

export default memo(PageFactory);
