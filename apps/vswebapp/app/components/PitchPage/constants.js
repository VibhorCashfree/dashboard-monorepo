// Images
import vrsIcon from 'images/pitch-page/logos/vrs.svg';
import vrsThumbnail from 'images/pitch-page/thumbnails/vrs.png';
import vrsThumbnailWithoutYTIcon from 'images/pitch-page/thumbnails/vrs1.png';
import vrsBanner from 'images/pitch-page/banner.png';
import vaultBanner from 'images/pitch-page/vault-banner.svg';

// Constants
import { PRODUCTS } from 'constants/products';

export const productPitchMap = {
  VRS: {
    productName: 'Secure ID',
    descriptions: [
      'Verify Aadhaar, PAN, Bank Account, UPI VPA and IFSC in real time before making any transactions to ensure legitimate and successful payouts.',
    ],
    viewDocs: PRODUCTS.OFFLINE_AADHAAR_VERIFICATION.docs,
    features: [
      {
        heading: 'Upload File with Beneficiary Bank A/c Details',
        body:
          'Enter bank a/c details - a/c holder name, a/c number, phone number and IFSC, or upload a batch file with all the details of the beneficiaries. You can also verify PAN, UPI VPA and IFSC.',
      },
      {
        heading: 'Cashfree Payments Verifies Details',
        body: 'Beneficiaries details are verified.',
      },
      {
        heading: 'View Verification Status',
        body: 'Get notified about the validity of beneficiaries account.',
      },
    ],
    banner: vrsBanner,
    logo: vrsIcon,
    thumbnail: vrsThumbnail,
  },
  // PAN_OCR: {
  //   productName: 'Start verifying user’s identity using the PAN OCR APIs',
  //   descriptions: [
  //     'With our PAN OCR APIs, you can quickly verify if the PAN is valid, identify the registered name of the card holder for both individual or business.',
  //   ],
  //   viewDocs: PRODUCTS.PAN_OCR_V.docs,
  //   features: [
  //     {
  //       heading: 'Integrate PAN OCR API',
  //       body:
  //         'Integrate the API to verify and validate the PAN information quick and seamlessly.',
  //     },
  //     {
  //       heading: 'Image Capture or Upload',
  //       body:
  //         'User provides the image of PAN either by capturing it via camera or uploading it from their gallery.',
  //     },
  //     {
  //       heading: 'API Response',
  //       body:
  //         'On submitting image, OCR API will be triggered & details are fetched successfully.',
  //     },
  //   ],
  //   banner: vrsBanner,
  //   thumbnail: vrsThumbnail,
  //   embedKey: '',
  // },
  'PAN 360': {
    productName: 'Verify PAN and retrieve more information with PAN 360 API',
    descriptions: [
      'The most reliable way to verify sensitive information that complies with data protection and privacy regulation.',
    ],
    viewDocs: PRODUCTS.PAN_ADVANCE.docs,
    features: [
      {
        heading: 'Activate PAN 360',
        body: 'Contact your account manager to get the PAN 360 API.',
      },
      {
        heading: 'Verify PAN',
        body:
          "Use our PAN 360 API to verify your customer's information and ensure a smooth verification process.",
      },
      {
        heading: 'Prevent Identity Theft',
        body:
          'Ensure the identification of your customers is legit to prevent financial fraud, promote transparency, and build a solid foundation for financial integrity.',
      },
    ],
    banner: vrsBanner,
    thumbnail: vrsThumbnailWithoutYTIcon,
  },
  // AADHAAR_OCR: {
  //   productName: 'Verify the Aadhaar information of your users',
  //   descriptions: [
  //     'With our Aadhaar OCR APIs, quickly verify whether the user identity matches the aadhar information.',
  //   ],
  //   viewDocs: PRODUCTS.AADHAAR_OCR_V.docs,
  //   features: [
  //     {
  //       heading: 'Integrate Aadhaar OCR API',
  //       body:
  //         'Integrate our APIs to verify and validate the Aadhaar information seamlessly.',
  //     },
  //     {
  //       heading: 'Capture or Upload Image',
  //       body:
  //         'Users provide the Aadhaar image by capturing it via phone camera or uploading it from their media.',
  //     },
  //     {
  //       heading: 'View API Response',
  //       body:
  //         'Upon submission, our OCR API triggers and fetches the details successfully.',
  //     },
  //   ],
  //   banner: vrsBanner,
  //   thumbnail: vrsThumbnail,
  // },
  BAV: {
    productName: 'Verify the bank account details of your users in seconds!',
    descriptions: [
      'Validate the bank account number and the account holder name with Bank Account Verification. Enter the bank account number and verify Bank Account Validity, Bank Name and Account Holder Name',
    ],
    viewDocs: PRODUCTS.BANKDETAILS_VALIDATION.docs,
    features: [
      {
        heading: 'Individual Verification',
        body: 'Enter the bank account number and get the status in no time.',
      },
      {
        heading: 'Bulk verification',
        body:
          'Upload upto 10000 bank accounts via a file, and get the statuses in seconds',
      },
      {
        heading: 'Bulk Verification via API',
        body:
          'Integrate our APIs and verify the bank details seamlessly. You can also check the response of the APIs, with the bank account and IFSC validity in seconds.',
      },
    ],
    banner: vrsBanner,
    thumbnail: vrsThumbnail,
  },
  // 'UPI VPA': {
  //   productName: 'Verify the UPI VPA of your users in no time!',
  //   descriptions: [
  //     'With UPI VPA Verification, verify if the users UPI VPA handle exists.',
  //   ],
  //   viewDocs: PRODUCTS.UPIDETAILS_VALIDATION.docs,
  //   features: [
  //     {
  //       heading: 'Integrate UPI VPA API',
  //       body:
  //         'Integrate our APIs to verify and validate the UPI VPA information seamlessly.',
  //     },
  //     {
  //       heading: 'Enter UPI VPA Information',
  //       body: 'Enter the UPI VPA information of the individual.',
  //     },
  //     {
  //       heading: 'View API Response',
  //       body:
  //         'View the customer name registered at the bank in the response for valid UPIs.',
  //     },
  //   ],
  //   banner: vrsBanner,
  //   thumbnail: vrsThumbnail,
  // },
  // 'UPI MOBILE': {
  //   productName: 'Verify UPI VPA of your users in seconds! ',
  //   descriptions: [
  //     'Enter the mobile number of your user to verify the UPI VPA information along with the name registered at the bank.',
  //   ],
  //   viewDocs: 'https://docs.cashfree.com/reference/get-vpa-mobile',
  //   features: [
  //     {
  //       heading: 'Enter Mobile Number',
  //       body: 'Enter your user mobile number using our UI.',
  //     },
  //     {
  //       heading: 'Click Verify',
  //       body:
  //         "Use the Verify button and validate your user's UPI VPA information in seconds.",
  //     },
  //     {
  //       heading: 'Verify UPI VPA via API',
  //       body:
  //         'Integrate our API and verify UPI VPA information along with the account holder name of your users using their mobile number.',
  //     },
  //   ],
  //   banner: vrsBanner,
  //   thumbnail: vrsThumbnail,
  // },
  // 'UPI 360': {
  //   productName:
  //     'Verify IFSC, MCC, and more along with the UPI VPA of your customers.',
  //   descriptions: [
  //     'To ensure the integrity of transactions and prevent fraudulent activities, we verify additional details along with UPI VPA with UPI 360 API.',
  //   ],
  //   viewDocs: 'https://docs.cashfree.com/reference/upi-360',
  //   features: [
  //     {
  //       heading: 'Activate UPI 360',
  //       body: 'Contact your account manager to get the UPI 360 API.',
  //     },
  //     {
  //       heading: 'Verify UPI',
  //       body:
  //         "Use our UPI 360 API to verify your customer's information and ensure a smooth verification process.",
  //     },
  //     {
  //       heading: 'Secure Transactions',
  //       body:
  //         'Reduce the risk of fraud and ensure that you receive payments from verified customers with UPI 360 API.',
  //     },
  //   ],
  //   banner: vrsBanner,
  //   thumbnail: vrsThumbnail,
  // },
  PAN: {
    productName: 'Verify the PAN information of your users',
    descriptions: [
      'With our PAN APIs, you can validate the identify of individuals and businesses.',
    ],
    viewDocs: PRODUCTS.PANDETAILS_VERIFICATION.docs,
    features: [
      {
        heading: 'Integrate PAN API',
        body:
          'Integrate our APIs to verify and validate the PAN information seamlessly.',
      },
      {
        heading: 'Enter PAN Information',
        body: 'Enter the PAN information of the individual or business.',
      },
      {
        heading: 'View API Response',
        body:
          'View the name registered with the PAN and the PAN type (Individual or Business) in the response for a valid PAN.',
      },
    ],
    banner: vrsBanner,
    thumbnail: vrsThumbnail,
  },
  IFSC: {
    productName: 'Verify the IFSC information of your users',
    descriptions: [
      'With our IFSC APIs, you can verify if the given IFSC exists.',
    ],
    viewDocs: PRODUCTS.IFSC.docs,
    features: [
      {
        heading: 'Integrate IFSC API',
        body:
          'Integrate our APIs to verify and validate the IFSC information seamlessly.',
      },
      {
        heading: 'Enter IFSC Information',
        body: 'Enter the IFSC information of the individual or business.',
      },
      {
        heading: 'View API Response',
        body:
          'View the bank name, its branch name, transfer modes supported, and the respective MICR code in the response.',
      },
    ],
    banner: vrsBanner,
    thumbnail: vrsThumbnail,
  },
  AADHAAR: {
    productName: 'Verify the Aadhaar information of your users',
    descriptions: [
      'With our Aadhaar OKYC APIs, quickly verify whether the user identify matches the aadhaar information.',
    ],
    viewDocs: PRODUCTS.OFFLINE_AADHAAR_VERIFICATION.docs,
    features: [
      {
        heading: 'Integrate Aadhaar OKYC API',
        body:
          'Integrate our APIs to verify and validate the aadhaar information seamlessly.',
      },
      {
        heading: 'Generate and Submit OTP',
        body:
          'Use our APIs to generate and submit the OTP received on the phone number.',
      },
      {
        heading: 'View API Response',
        body:
          'View the status and the complete aadhaar information of the user in the API response.',
      },
    ],
    banner: vrsBanner,
    thumbnail: vrsThumbnail,
  },
  GSTIN: {
    productName: 'Verify the GSTIN information of your users',
    descriptions: [
      'With our GSTIN APIs, quickly verify whether the GSTIN assigned to the business is valid.',
    ],
    viewDocs: PRODUCTS.GSTIN_VERIFICATION.docs,
    features: [
      {
        heading: 'Integrate GSTIN API',
        body:
          'Integrate our APIs to verify and validate the GSTIN information seamlessly.',
      },
      {
        heading: 'Enter GSTIN Information',
        body: 'Enter the GSTIN information of the business.',
      },
      {
        heading: 'View API Response',
        body: 'View the GST status and other information for valid GSTINs.',
      },
    ],
    banner: vrsBanner,
    thumbnail: vrsThumbnail,
  },
  'Bank Account using RPD': {
    productName: 'Verify your bank account using RPD',
    descriptions: [
      'With our Bank account verification using RPD solution you can verify your customers without taking their bank account details and a 1 Rs UPI payment by the user.',
    ],
    viewDocs: PRODUCTS.REVERSE_PENNY_DROP_V.docs,
    features: [
      {
        heading: 'Integrate Bank account verification RPD API',
        body:
          'To verify bank account details of users without taking bank account details of the user.',
      },
      {
        heading: 'Create Bank account verification RPD requests',
        body:
          'Create UPI intent link using create request api to redirect the user to PSP app for 1rs payment',
      },
      {
        heading: 'View API Response',
        body: 'View the API response using webhooks or get status api.',
      },
    ],
    banner: vrsBanner,
    thumbnail: vrsThumbnail,
  },
  // 'Aadhaar E - Sign': {
  //   productName:
  //     'Send document links to your customers for Aadhaar based e-signature.',
  //   descriptions: [
  //     'A reliable and easy way to send, track, and request your customers to e-sign documents using their Aadhaar.',
  //   ],
  //   viewDocs: PRODUCTS.ESIGN_VRS.docs,
  //   features: [
  //     {
  //       heading: 'Request Document Signature',
  //       body:
  //         "Use our API to upload the document with signing details (position, page), and send it to the customer's email/phone or let them sign in your app.",
  //     },
  //     {
  //       heading: 'Receive Signature Status',
  //       body:
  //         'Customer receives the document link and signs it using their Aadhaar. The status of the signature is sent to you over webhooks.',
  //     },
  //     {
  //       heading: 'E - Sign Reports',
  //       body:
  //         'Reports allow you to run, download, and print the reports of documents uploaded for Aadhaar based e-sign.',
  //     },
  //   ],
  //   banner: vrsBanner,
  // },
  'DigiLocker API': {
    productName:
      'Retrieve your user’s information like Aadhaar, Pan & DL with DigiLocker API',
    descriptions: [
      "Embed our API in your application to retrieve and verify your user’s information from our government's DigiLocker app.",
    ],
    viewDocs: PRODUCTS.DGL_AADHAAR.docs,
    features: [
      {
        heading: 'Integrate DigiLocker API',
        body:
          'User enters mobile number, OTP, and security PIN in your app that has our DigiLocker API.',
      },
      {
        heading: 'Retrieve Aadhaar, Pan & DL',
        body:
          'User allows consent to share the DigiLocker document with Cashfree Payments.',
      },
      {
        heading: 'Process KYC',
        body:
          'We share the document details in the response to you for verification.',
      },
    ],
    banner: vrsBanner,
  },
  'KYC Link': {
    productName:
      'Verify the KYC information of your users with minimal effort!',
    descriptions: [
      'Use our KYC Link to select what your users need to verify and send the link via email, SMS, or WhatsApp.',
    ],
    tryVerificationText: 'How do KYC Links work?',
    viewDocs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/kyc-links/get-form-status',
    features: [
      {
        heading: 'Customise KYC Link',
        body:
          'Select the documents you need to verify from your customers, choose how you want to send it, and download the sample file.',
      },
      {
        heading: 'Generate the link',
        body:
          'Enter the details of your customers, upload the file, generate and send the links.',
      },
      {
        heading: 'Verify via API',
        body: 'Integrate our APIs and user our KYC Links seamlessly.',
      },
    ],
    banner: vrsBanner,
  },
  RC: {
    productName:
      'Verify the authenticity of vehicle details with Cashfree Payments',
    descriptions: [
      'We help you find out the complete information of the vehicle including the owner, chassis number, registration date, registration number, and more.',
    ],
    viewDocs: PRODUCTS.VEHICLE_RC.docs,
    features: [
      {
        heading: 'Enter Vehicle Number',
        body:
          'Enter the vehicle number (registration number) shared by your customer.',
      },
      {
        heading: 'Retrieve Vehicle Information',
        body:
          'You receive the exhaustive list of the vehicle information in the API response instantaneously.',
      },
      {
        heading: 'Verify Vehicle Data',
        body:
          'Ensure the accuracy of the vehicle information and the ownership by verifying RC. Stop fraudsters from using fake/stolen vehicles.',
      },
    ],
    banner: vrsBanner,
  },
  'Driving License': {
    productName:
      'Verify the driving licence information of your customer with Cashfree Payments',
    descriptions: [
      'We provide details of the driving licence that includes the type of licence, issue date, expiry date, and more.',
    ],
    viewDocs: PRODUCTS.DRIVING_LICENSE.docs,
    features: [
      {
        heading: 'Enter DL Information',
        body:
          'Enter the driving licence number in the API request and retrieve information immediately.',
      },
      {
        heading: 'Retrieve DL Information',
        body:
          'We provide the complete driving licence information of the individual that are stored in the database. Use the information for a smoother onboarding process or identity verification.',
      },
      {
        heading: 'Verify DL Information',
        body:
          'Ensure the driving licence information provided by your customer is accurate to precent fraud and maintain secure business practices.',
      },
    ],
    banner: vrsBanner,
  },
  'PAN GSTIN': {
    productName: 'Verify PAN and fetch the list of GSTIN associated with it',
    descriptions: [
      'You can fetch the list of GSTIN assigned to businesses and confirm whether you are dealing with legitimate entities.',
    ],
    tryVerificationText: 'Why opt for PAN to GSTIN?',
    viewDocs: PRODUCTS.PAN_TO_GSTIN.docs,
    features: [
      {
        heading: 'Protect Your Business',
        body:
          'Avoid dealing with unregistered or fake businesses by verifying the GSTIN information of the entity.',
      },
      {
        heading: 'Fetch GSTIN Immediately',
        body:
          'We use the PAN information you provide to fetch the GSTIN information right away.',
      },
      {
        heading: 'Verify via API and Dashboard',
        body:
          'You can fetch the list of GSTN and status details either through the dashboard or use our efficient APIs.',
      },
    ],
    banner: vrsBanner,
  },
  PASSPORT: {
    productName:
      'Verify passport information of your customers with Cashfree Payments',
    descriptions: [
      'Ensure the identity of your customer to prevent fraud and maintain the security and integrity of your operations.',
    ],
    viewDocs: PRODUCTS.PASSPORT.docs,
    tryVerificationText: 'Why opt for Passport Verification?',
    features: [
      {
        heading: 'Safe and Secure Environment',
        body:
          'Strengthen your security measures, comply with legal requirements, prevent fraud, and foster a trustworthy environment with us.',
      },
      {
        heading: 'Dependable and Instant Verification',
        body:
          'We verify the passport information of your customers instantaneously while also maintaining reliability to the verification.',
      },
      {
        heading: 'Dashboard and API Availability',
        body:
          'You can use the effective feature on the dashboard or the efficient APIs to verify information.',
      },
    ],
    banner: vrsBanner,
  },
  'FACE MATCH': {
    productName:
      'Verify your customer identity by facial recognition with Cashfree Payments',
    descriptions: [
      'Compare the facial features of your customers in their ID and the photo taken in real time.',
    ],
    viewDocs: PRODUCTS.FACE_MATCH.docs,
    features: [
      {
        heading: 'Upload an ID',
        body:
          'Upload an ID of your customer that is issued by the Indian government.',
      },
      {
        heading: 'Upload a Selfie',
        body: 'Upload a real time photo (selfie) of your customer.',
      },
      {
        heading: 'Verify Facial Features',
        body:
          'We will analyse and compare the selfie with the photograph in the ID and provide you the result.',
      },
    ],
    banner: vrsBanner,
    tryVerificationText: 'How does Face Match work?',
  },
  CIN: {
    productName:
      'Verify CIN information of your customer companies with Cashfree Payments',
    descriptions: [
      'We retrieve information such as business incorporation date, director(s) details, CIN status, and more.',
    ],
    tryVerificationText: 'Why opt for CIN Verificaton?',
    viewDocs: PRODUCTS.CIN.docs,
    features: [
      {
        heading: 'Authenticate Business Information',
        body:
          'Ensures the business identity, confirms the legal and regulatory compliance, and mitigates the risk of fraudulent activities.',
      },
      {
        heading: 'Foster Safe Environment',
        body:
          'Enhances transparency and accountability after verifying the legitimacy of the involved entities.',
      },
      {
        heading: 'Verify via API and Dashboard',
        body:
          'You can verify the CIN details using  the dashboard and/or our APIs.',
      },
    ],
    banner: vrsBanner,
  },
  RGC: {
    productName:
      'Verify the location shared by your customer matches the provided physical address',
    descriptions: [
      'Convert geographic coordinates into readable location information with Reverse Geocoding for verification purposes.',
    ],
    viewDocs: PRODUCTS.REVERSE_GEOCODING.docs,
    features: [
      {
        heading: 'Enter Coordinates',
        body:
          'Enter the latitude and longitude of the location shared by your customer.',
      },
      {
        heading: 'Retrieve Address Information',
        body:
          'We provide the location information of the coordinates that includes the name of the city, state, and PIN code.',
      },
      {
        heading: 'Verify Customer Data',
        body:
          'Ensure the accuracy of your customer’s address information and maintain secure business practices, prevent fraud, and build trust with customers.',
      },
    ],
    banner: vrsBanner,
  },
  'NAME MATCH': {
    productName:
      'Solve verifying names that have enormous variations with Cashfree Payments',
    descriptions: [
      'Give us with the names you want to verify, and we will tell you whether they match and provide the reason',
    ],
    tryVerificationText: 'Why opt for Name Match?',
    viewDocs: PRODUCTS.NAME_MATCH.docs,
    features: [
      {
        heading: 'Verify Identity',
        body:
          "The fundamental step to confirm an individual's identity is to verify and match names. It helps prevent identity theft and fraud.",
      },
      {
        heading: 'Automate Process',
        body:
          'Automate the process of manually ensuring the names match and reduce the risk of errors in processes such as onboarding, account verification, and others',
      },
      {
        heading: 'View Match Score',
        body:
          'We verify the names and give you a match score to tell you how well the names match.',
      },
    ],
    banner: vrsBanner,
  },
  'voter-id': {
    productName:
      'Verify voter ID authenticity of your customers with Cashfree Payments',
    descriptions: [
      'Provide the Electoral Photo Identity Card (EPIC) number and get complete details of the voter ID including assembly and parliamentary constituency details.',
    ],
    viewDocs: PRODUCTS.VOTER_ID.docs,
    tryVerificationText: 'Why opt for Voter ID Verification?',
    features: [
      {
        heading: 'Mitigate Risks',
        body:
          'Verify the identity of your customer and ensure that you are interacting with real entities and not an imposter.',
      },
      {
        heading: 'Meet Diligence Requirements',
        body:
          'Comply with legal and regulatory standards by including identity verification as a part of the due diligence that is expected from you during customer relationships.',
      },
      {
        heading: 'Dashboard and API Availability',
        body:
          'You can use the effective feature on the dashboard or the efficient APIs to verify information.',
      },
    ],
    banner: vrsBanner,
  },
  AADHAAR_MASKING: {
    productName: 'Mask aadhaar card of your customers and ensure privacy',
    descriptions: [
      'We help you mask the first 8 digits of the aadhaar number and block the QR code to store in your database.',
    ],
    viewDocs: PRODUCTS.AADHAAR_MASKING.docs,
    tryVerificationText: 'Why opt for Aadhaar Masking?',
    features: [
      {
        heading: 'Privacy Regulation',
        body:
          'Handle personal data that adheres to specific standards and practices that safeguards the rights of individuals.',
      },
      {
        heading: 'Security Measure',
        body:
          'You can prevent identity theft, fraud, and information leak by storing masked aadhaar information of your customers.',
      },
      {
        heading: 'Government Mandate',
        body:
          'Masking the first 8 digits of aadhaar applies to all businesses before they store them in the database.',
      },
    ],
    banner: vrsBanner,
  },
  FACE_LIVENESS: {
    productName:
      'Verify if the customer is genuine and not a bot with Cashfree Payments',
    descriptions: [
      'We analyse the facial features of your customer in the picture (selfie) for identification.',
    ],
    viewDocs: PRODUCTS.FACE_LIVENESS.docs,
    tryVerificationText: 'How does Face Liveness Check work?',
    features: [
      {
        heading: 'Fraud Prevention',
        body:
          'With the rise of AI generated pictures, verifying facial features in pictures helps prevent fraud in various scenarios, such as identity theft, financial transactions, or online services.',
      },
      {
        heading: 'User Authentication',
        body:
          'Verifying that your customer is a human helps ensure that only authorised individuals gain access to specific resources or services.',
      },
      {
        heading: 'Follow Automation',
        body:
          'Face Liveness Check can be integrated into automated processes, streamlining various tasks that require human identification. This can include attendance tracking, customer authentication, or any process where identifying individuals is necessary.',
      },
    ],
    banner: vrsBanner,
  },
  ADVANCE_EMPLOYMENT: {
    productName:
      'Verify the employment information of the individual with Cashfree Payments',
    descriptions: [
      'We help you retrieve an individual’s recent employment details such as member ID, joining date, and exit date of the company.',
    ],
    tryVerificationText: 'Why opt for Employment 360?',
    viewDocs: PRODUCTS.ADVANCE_EMPLOYMENT.docs,
    features: [
      {
        heading: 'Background Check',
        body:
          "Assess an individual's suitability for employment by verifying the information provided on their resume, application, or during the hiring process is accurate and truthful.",
      },
      {
        heading: 'Risk Mitigation',
        body:
          'Mitigate the risk of hiring individuals who may have falsified their employment history, qualifications, or other relevant information.',
      },
      {
        heading: 'Fraud Prevention',
        body:
          'Do not let your hiring process be jeopardised by fraudsters who submit false or identities or fraudulent documentation.',
      },
    ],
    banner: vrsBanner,
  },
  PAN_LITE: {
    productName: 'Verify PAN information by cross-referring with NSDL records.',
    descriptions: [
      'A crucial tool that helps you verify user identity by ensuring the provided details align with official records.',
    ],
    tryVerificationText: 'Why opt for PAN Lite?',
    viewDocs: PRODUCTS.PAN_LITE.docs,
    features: [
      {
        heading: 'Combat Identity Theft',
        body:
          'Reduce the risk of fraud and identity theft by verifying the authenticity of user information against the official NSDL records.',
      },
      {
        heading: 'Mitigate Financial Loss',
        body:
          'Verify user identity and reduce the risk of financial losses due to unauthorised access and other criminal activities.',
      },
      {
        heading: 'Verify via Dashboard and API',
        body:
          'You can verify the PAN information through the dashboard or through our seamless API functionality.',
      },
    ],
    banner: vrsBanner,
  },
  // 'MOBILE 360': {
  //   productName:
  //     'Retrieve information related to an individual using their mobile number',
  //   descriptions: [
  //     'Depending on the depth of information needed, Cashfree Payment offers two options: Lite and Advanced.',
  //   ],
  //   tryVerificationText: 'How does the Mobile 360 API work?',
  //   viewDocs: PRODUCTS.MOBILE_ADVANCE.docs,
  //   features: [
  //     {
  //       heading: 'Enter Mobile Number',
  //       body: 'Enter the mobile number of the individual in the API request.',
  //     },
  //     {
  //       heading: 'Choose Type',
  //       body:
  //         'Choose whether you want to retrieve information at a surface level (lite) or perform a deep dive (advanced).',
  //     },
  //     {
  //       heading: 'Retrieve Information',
  //       body: `Fetch the account holder's name along with the associated UPI VPA and IFSC information (lite) or details such as PAN and more (advanced) associated with the mobile number of the individual.`,
  //     },
  //   ],
  //   banner: vrsBanner,
  // },
  SECURE_SHARE: {
    productName:
      'Retrieve information related to an individual using their mobile number',
    descriptions: [
      'Depending on the depth of information needed, Cashfree Payment offers two options: Lite and Advanced.',
    ],
    tryVerificationText: 'How does the Mobile 360 API work?',
    viewDocs:
      'https://www.cashfree.com/docs/api-reference/vrs/v2/secure-share/data-availability',
    features: [
      {
        heading: 'Enter Mobile Number',
        body: 'Enter the mobile number of the individual in the API request.',
      },
      {
        heading: 'Choose Type',
        body:
          'Choose whether you want to retrieve information at a surface level (lite) or perform a deep dive (advanced).',
      },
      {
        heading: 'Retrieve Information',
        body: `Fetch the account holder's name along with the associated UPI VPA and IFSC information (lite) or details such as PAN and more (advanced) associated with the mobile number of the individual.`,
      },
    ],
    banner: vaultBanner,
  },
  GENERIC_OCR: {
    productName: 'Beyond Extraction: Generative AI based OCR for Smarter KYC',
    descriptions: [
      'Our cutting-edge Generative AI OCR technology not only extracts data from Indian IDs with exceptional accuracy but also classifies documents and enhances image quality for fraud prevention and reduces drop offs during user onboarding.',
    ],
    tryVerificationText: 'Pain-points / Solutions',
    viewDocs: PRODUCTS.GENERIC_OCR.docs,
    features: [
      {
        heading: 'Document Overload? Focus on Use Cases, Not Documents.',
        body:
          'Stop worrying about the complexities of different ID types. We handle classification, extraction, quality checks, and forgery detection, allowing you to focus on your core business use cases.',
      },
      {
        heading: 'Rising Fraudulent Activities',
        body:
          'Our advanced forgery detection capabilities leverage Generative AI to identify tampering, safeguarding your business.',
      },
      {
        heading: 'High Image Rejection Rates & Lack of Actionable Feedback',
        body:
          'We not only enhance images but also provide specific feedbacks on issues like blur, glare, obscured images and many more, reducing rejections',
      },
      {
        heading: 'Multiple APIs and Engineering Overhead',
        body:
          'We provide a single, unified API for all document types, simplifying integration and reducing engineering bandwidth by upto 8 weeks of effort.',
      },
      {
        heading: 'High User Drop-off Rates During Onboarding?',
        body:
          'We simplify KYC, reduce errors, and speed up verification, leading to higher completion rates.',
      },
      {
        heading: 'Manual Data Entry Errors',
        body:
          'It automates data extraction with exceptional accuracy, eliminating manual entry and reducing errors.',
      },
    ],
    banner: vrsBanner,
  },
};

export const MODAL_TYPES = {
  CONFIRM: 'CONFIRM',
  EMBED: 'EMBED',
};
