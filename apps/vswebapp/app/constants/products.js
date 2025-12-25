export const PRODUCTS = {
  OFFLINE_AADHAAR_VERIFICATION: {
    rank: 1,
    displayText: 'Aadhaar OKYC',
    code: 'OFFLINE_AADHAAR_VERIFICATION',
    icon: 'AadhaarOKYC',
    key: 'okyc',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/aadhaar/generate-otp-to-verify-aadhaar',
    description:
      'Verify an aadhaar number offline by generating and submitting the OTP.',
  },
  // AADHAAR_OCR_V: {
  //   displayText: 'Aadhaar OCR',
  //   code: 'AADHAAR_OCR_V',
  //   icon: 'AadhaarOCR',
  //   key: 'aadhaar-ocr',
  //   docs:
  //     'https://www.cashfree.com/docs/api-reference/vrs/v2/aadhaar/get-status-of-aadhaar-verification-via-ocr',
  //   description:
  //     'Extract the aadhaar information by uploading the image of an aadhaar card.',
  // },
  AADHAAR_MASKING: {
    displayText: 'Aadhaar Masking',
    code: 'AADHAAR_MASKING',
    icon: 'AadhaarMasking',
    key: 'aadhaar-masking',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/aadhaar/aadhaar-masking',
    description:
      'Mask the first eight digits of the aadhaar and block the QR code to store aadhaar information in your database.',
  },
  DGL_AADHAAR: {
    displayText: 'DigiLocker - Aadhaar',
    code: 'DGL_AADHAAR',
    icon: 'Digilocker',
    key: 'digilocker',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/digilocker/get-digilocker-verification-status',
    description:
      'Verify aadhaar information of an individual by retrieving the document from DigiLocker.',
  },
  PANDETAILS_VERIFICATION: {
    displayText: 'PAN',
    code: 'PANDETAILS_VERIFICATION',
    icon: 'Pan',
    key: 'pan',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/pan/verify-pan-sync',
    description: 'Verify PAN to ensure the identity of an individual. ',
  },
  PAN_ADVANCE: {
    displayText: 'PAN 360',
    code: 'PAN_ADVANCE',
    icon: 'Pan360',
    key: 'pan-360',
    docs: 'https://www.cashfree.com/docs/api-reference/vrs/v2/pan/pan-360',
    description:
      'Retrieve every bit of detail from an individual’s PAN information such as masked aadhaar number, address, contact, and more.',
  },
  // PAN_OCR_V: {
  //   displayText: 'PAN OCR',
  //   code: 'PAN_OCR_V',
  //   icon: 'PanOCR',
  //   key: 'pan-ocr',
  //   docs:
  //     'https://www.cashfree.com/docs/api-reference/vrs/v2/pan/pan-verification-via-ocr',
  //   description: 'Upload the PAN card image and extract the information.',
  // },
  GENERIC_OCR: {
    displayText: 'Smart OCR',
    code: 'GENERIC_OCR',
    icon: 'AadhaarOCR',
    key: 'smart-ocr',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/smart-ocr/smart-ocr',
    description:
      'Extract the aadhaar information by uploading the image of an aadhaar card.',
  },
  DRIVING_LICENSE: {
    displayText: 'Driving License',
    code: 'DRIVING_LICENSE',
    icon: 'DL',
    key: 'driving-license',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/driving-license/verify-driving-licence-details',
    description:
      'Verify and view the details of a driving licence such as its type, issue date, expiry date, and more. ',
  },
  VOTER_ID: {
    displayText: 'Voter ID',
    code: 'VOTER_ID',
    icon: 'VoterId',
    key: 'voter-id',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/voter-id/verify-voter-id',
    description:
      'Get the complete details of the voter ID including assembly and parliamentary constituency details.',
  },
  PASSPORT: {
    displayText: 'Passport',
    code: 'PASSPORT',
    icon: 'Passport',
    key: 'passport',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/passport/verify-passport',
    description:
      'Ensure whether the passport information is legit to prevent fraud and maintain security of your operations.',
  },
  VEHICLE_RC: {
    displayText: 'Vehicle RC',
    code: 'VEHICLE_RC',
    icon: 'VehicleRC',
    key: 'RC',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/vehicle-rc/get-vehicle-rc-details',
    description:
      'Collect the complete information of a vehicle including the owner, chassis number, registration date, registration number, and more.',
  },
  ADVANCE_EMPLOYMENT: {
    displayText: 'Employment 360',
    code: 'ADVANCE_EMPLOYMENT',
    icon: 'AdvanceEmployment',
    key: 'advance-employment',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/advanced-employment/get-employment-details',
    description:
      "Find an individual's recent employment details such as member ID, joining date, and exit date of the company.",
  },
  FACE_MATCH: {
    displayText: 'Face Match',
    code: 'FACE_MATCH',
    icon: 'FaceMatch',
    key: 'face-match',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/face-match/face-match',
    description:
      'Compare and verify the facial features of an individual between two images, or between an image and the photo on an ID.',
  },
  FACE_LIVENESS: {
    displayText: 'Face Liveness Check',
    code: 'FACE_LIVENESS',
    icon: 'LivelinessCheck',
    key: 'faceLiveness',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/face-liveness/face-liveness',
    description:
      'Analyse the facial features of an individual in the picture and verify whether it is genuine or a bot.',
  },
  NAME_MATCH: {
    displayText: 'Name Match',
    code: 'NAME_MATCH',
    icon: 'NameMatch',
    key: 'name-match',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/name-match/name-match',
    description:
      'Give us the names you want to verify, and we will tell you whether they match with a reason. ',
  },
  // ESIGN_VRS: {
  //   displayText: 'Aadhaar E-sign',
  //   code: 'ESIGN_VRS',
  //   icon: 'Esign',
  //   key: 'esign',
  //   docs:
  //     'https://www.cashfree.com/docs/api-reference/vrs/v2/e-sign/get-e-sign-status',
  //   description:
  //     'A reliable and easy way to send, track, and request your customers to e-sign documents using their Aadhaar.',
  // },
  REVERSE_GEOCODING: {
    displayText: 'Reverse Geocoding',
    code: 'REVERSE_GEOCODING',
    icon: 'ReverseGeocoding',
    key: 'reverse-geocoding',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/reverse-geocoding/reverse-geocoding',
    description:
      'Convert geographic coordinates into readable location information to verify the location and match the provided physical address.',
  },
  PAN_TO_GSTIN: {
    displayText: 'PAN to GSTIN',
    code: 'PAN_TO_GSTIN',
    icon: 'PanGstin',
    key: 'pan-gstin',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/pan-to-gstin/fetch-gstin-with-pan',
    description:
      'We fetch you the list of GSTIN associated with the PAN information to help you confirm that you are dealing with legitimate entities. ',
  },
  CIN: {
    displayText: 'CIN',
    code: 'CIN',
    icon: 'Cin',
    key: 'cin',
    docs: 'https://www.cashfree.com/docs/api-reference/vrs/v2/cin/verify-cin',
    description:
      'Retrieve details such as business incorporation date, director(s) information, CIN status, and more.',
  },
  GSTIN_VERIFICATION: {
    displayText: 'GSTIN',
    code: 'GSTIN_VERIFICATION',
    icon: 'Gstin',
    key: 'gstIn',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/gstin/verify-gstin',
    description:
      'Verify whether the given GSTIN information exists using our product. ',
  },
  BANKDETAILS_VALIDATION: {
    displayText: 'Bank Account',
    code: 'BANKDETAILS_VALIDATION',
    icon: 'Bav',
    key: 'bav',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/bav-v2/bank-account-verification-sync-v2',
    description:
      'The most reliable way to verify bank account information of individuals.',
  },
  REVERSE_PENNY_DROP_V: {
    displayText: 'Bank Account - Reverse Penny Drop',
    code: 'REVERSE_PENNY_DROP_V',
    icon: 'ReversePennyDrop',
    key: 'bav-rpd',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/reverse-penny-drop/get-reverse-penny-drop-request-details',
    description:
      'Verify bank account information by creating a reverse penny drop request. ',
  },
  UPIDETAILS_VALIDATION: {
    displayText: 'UPI',
    code: 'UPIDETAILS_VALIDATION',
    icon: 'Upi',
    key: 'upi',
    docs: 'https://docs.cashfree.com/reference/upi-verification',
    description:
      'Verify whether the given VPA information exists using our product. ',
  },
  // UPI_ADVANCE: {
  //   displayText: 'UPI 360',
  //   code: 'UPI_ADVANCE',
  //   icon: 'Upi360',
  //   key: 'upi-360',
  //   docs: 'https://docs.cashfree.com/reference/upi-360',
  //   description:
  //     'Retrieve every bit of detail from an individual’s VPA information such as IFSC, registered name, and more. ',
  // },
  // UPI_MOBILE_V: {
  //   displayText: 'UPI/VPA from Phone Number',
  //   code: 'UPI_MOBILE_V',
  //   icon: 'UPIVPA',
  //   key: 'upi-mobile',
  //   docs: 'https://docs.cashfree.com/reference/get-vpa-mobile',
  //   description:
  //     'Find out the VPA information associated with a phone number. ',
  // },
  IFSC: {
    displayText: 'IFSC',
    code: 'IFSC_VERIFICATION',
    icon: 'IFSC',
    key: 'ifsc',
    docs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/ifsc/ifsc-verification-v2',
    description:
      'Verify IFSC information and obtain additional details such as bank name, branch, address, and supported payment modes instantly.',
  },
  PAN_LITE: {
    displayText: 'PAN Lite',
    code: 'PAN_LITE',
    icon: 'PanLite',
    key: 'pan-lite',
    docs: 'https://www.cashfree.com/docs/api-reference/vrs/v2/pan/pan-lite',
    description:
      'A crucial tool that helps you verify user identity by ensuring the provided details align with official records.',
  },
  // MOBILE_ADVANCE: {
  //   displayText: 'Mobile 360',
  //   code: 'MOBILE_ADVANCE',
  //   icon: 'DL',
  //   key: 'mobile-360',
  //   docs: 'https://docs.cashfree.com/reference/mobile-360-lite',
  //   description:
  //     'https://www.cashfree.com/docs/api-reference/vrs/v2/mobile-360-otp-flow/mobile-360-send-otp-request',
  // },
};

export const PRODUCT_MAPPING = {
  bav: [
    PRODUCTS.BANKDETAILS_VALIDATION,
    PRODUCTS.REVERSE_PENNY_DROP_V,
    // PRODUCTS.UPIDETAILS_VALIDATION,
    // PRODUCTS.UPI_ADVANCE,
    // PRODUCTS.UPI_MOBILE_V,
    PRODUCTS.IFSC,
  ],
  'aadhar-pan': [
    // PRODUCTS.OFFLINE_AADHAAR_VERIFICATION, // Commented out to remove Aadhaar OKYC from UI
    // PRODUCTS.AADHAAR_OCR_V,
    PRODUCTS.AADHAAR_MASKING,
    PRODUCTS.DGL_AADHAAR,
    // PRODUCTS.ESIGN_VRS,
    PRODUCTS.PANDETAILS_VERIFICATION,
    PRODUCTS.PAN_ADVANCE,
    // PRODUCTS.PAN_OCR_V,
    PRODUCTS.PAN_LITE,
  ],
  'digital-kyc': [
    PRODUCTS.FACE_MATCH,
    PRODUCTS.FACE_LIVENESS,
    PRODUCTS.NAME_MATCH,
    PRODUCTS.REVERSE_GEOCODING,
  ],
  'alternate-id': [
    PRODUCTS.DRIVING_LICENSE,
    PRODUCTS.VOTER_ID,
    PRODUCTS.PASSPORT,
    PRODUCTS.ADVANCE_EMPLOYMENT,
    PRODUCTS.VEHICLE_RC,
    // PRODUCTS.MOBILE_ADVANCE,
  ],
  kyb: [PRODUCTS.PAN_TO_GSTIN, PRODUCTS.CIN, PRODUCTS.GSTIN_VERIFICATION],
};
