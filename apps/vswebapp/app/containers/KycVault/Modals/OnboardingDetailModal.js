import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Table,
  Text,
  Modal,
  ModalDescription,
  ModalActions,
  Button,
  Space,
  Image,
  Divider,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Components
import Icon from 'components/Icon';

// Styled
import {
  StyledAccordionContent,
  StyledTableCell,
  StyledAccordion,
  StyledModalContent,
} from '../styled';

const OnboardingDetailModal = ({ modalData, handleClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const accordionActive = isActive => (isActive ? 'minus' : 'plus');

  const formatCurrency = amount => {
    if (!amount) {
      return '–';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = dateStr => {
    if (!dateStr) {
      return '–';
    }
    try {
      return new Date(dateStr).toLocaleDateString('en-IN');
    } catch {
      return dateStr;
    }
  };

  // Helper function to check if an object has meaningful data
  const hasValidData = obj => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
    if (Array.isArray(obj)) {
      return obj.length > 0;
    }

    // For objects, check if any property has a meaningful value
    return Object.values(obj).some(value => {
      if (value === null || value === undefined || value === '') {
        return false;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'object') {
        return hasValidData(value);
      }
      return true;
    });
  };

  const sections = [
    {
      title: 'Personal Details',
      key: 'personal_details',
      condition: () => {
        const data = modalData?.personal_details;
        return hasValidData(data);
      },
    },
    {
      title: 'Phone Numbers',
      key: 'phone_numbers',
      condition: () => {
        const data = modalData?.phone_numbers;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Email Addresses',
      key: 'emails',
      condition: () => {
        const data = modalData?.emails;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'PAN Details',
      key: 'pan_details',
      condition: () => {
        const data = modalData?.pan_details;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Aadhaar Details',
      key: 'aadhaar_details',
      condition: () => {
        const data = modalData?.aadhaar_details;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Driving License Details',
      key: 'driving_license_details',
      condition: () => {
        const data = modalData?.driving_license_details;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Passport Details',
      key: 'passport_details',
      condition: () => {
        const data = modalData?.passport_details;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Ration Card Details',
      key: 'ration_card_details',
      condition: () => {
        const data = modalData?.ration_card_details;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Voter Details',
      key: 'voter_details',
      condition: () => {
        const data = modalData?.voter_details;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Addresses',
      key: 'addresses',
      condition: () => {
        const data = modalData?.addresses;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Bank Account Details',
      key: 'bank_account_details',
      condition: () => {
        const data = modalData?.bank_account_details;
        return Array.isArray(data) && data?.length > 0;
      },
    },
    {
      title: 'Employment Details',
      key: 'employment_details',
      condition: () => {
        const data = modalData?.employment_details;
        return hasValidData(data);
      },
    },
    {
      title: 'Mobile Number Intelligence',
      key: 'mobile_number_intelligence',
      condition: () => {
        const data = modalData?.mobile_number_intelligence;
        return hasValidData(data);
      },
    },
    {
      title: 'Credit Score',
      key: 'credit_score',
      condition: () => {
        const data = modalData?.credit_score;
        return data !== null && data !== undefined;
      },
    },
    {
      title: 'Risk Intelligence',
      key: 'risk_intelligence',
      condition: () => {
        const data = modalData?.risk_intelligence;
        return hasValidData(data);
      },
    },
  ];

  const renderPersonalDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Full Name:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'personal_details.full_name', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Gender:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'personal_details.gender', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Date of Birth:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {formatDate(_get(modalData, 'personal_details.dob'))}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Age:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'personal_details.age', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Occupation:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'personal_details.occupation', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Total Income:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {formatCurrency(_get(modalData, 'personal_details.total_income'))}
          </StyledTableCell>
        </Table.Row>
        {_get(modalData, 'personal_details.relatives_details', [])?.length && (
          <Table.Row>
            <StyledTableCell width={5}>
              <Text color="bodyLight">Relatives:</Text>
            </StyledTableCell>
            <StyledTableCell>
              {_get(modalData, 'personal_details.relatives_details', [])?.map(
                (relative, idx) => (
                  <div
                    key={`relative-${_get(relative, 'relation', idx)}`}
                    className="mb-1"
                  >
                    <Text>
                      {_get(relative, 'relation', '–') || '–'}:{' '}
                      {_get(relative, 'relative_name', '–') || '–'}
                    </Text>
                  </div>
                ),
              )}
            </StyledTableCell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );

  const renderPhoneNumbers = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'phone_numbers', [])?.map((phone, idx) => (
          <React.Fragment key={`phone-${_get(phone, 'phone', idx)}`}>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">
                  Phone {idx + 1} ({_get(phone, 'type', '–') || '–'}):
                </Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(phone, 'phone', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(phone, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            {idx < _get(modalData, 'phone_numbers', [])?.length - 1 && (
              <Table.Row>
                <Table.Cell colSpan="2">
                  <div
                    style={{ height: '8px', borderBottom: '1px solid #eee' }}
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderEmails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'emails', [])?.map((email, idx) => (
          <React.Fragment key={`email-${_get(email, 'email', idx)}`}>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Email {idx + 1}:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(email, 'email', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(email, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            {idx < _get(modalData, 'emails', [])?.length - 1 && (
              <Table.Row>
                <Table.Cell colSpan="2">
                  <div
                    style={{ height: '8px', borderBottom: '1px solid #eee' }}
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderPanDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'pan_details', [])?.map((pan, idx) => (
          <React.Fragment key={`pan-${_get(pan, 'pan_number', idx)}`}>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">PAN Number:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(pan, 'pan_number', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            {_get(pan, 'metadata') && (
              <>
                <Table.Row>
                  <StyledTableCell width={5}>
                    <Text color="bodyLight">Registered Name:</Text>
                  </StyledTableCell>
                  <StyledTableCell>
                    {_get(pan, 'metadata.registered_name', '–') || '–'}
                  </StyledTableCell>
                </Table.Row>
                <Table.Row>
                  <StyledTableCell width={5}>
                    <Text color="bodyLight">Name on PAN Card:</Text>
                  </StyledTableCell>
                  <StyledTableCell>
                    {_get(pan, 'metadata.name_pan_card', '–') || '–'}
                  </StyledTableCell>
                </Table.Row>
                <Table.Row>
                  <StyledTableCell width={5}>
                    <Text color="bodyLight">Type:</Text>
                  </StyledTableCell>
                  <StyledTableCell>
                    {_get(pan, 'metadata.type', '–') || '–'}
                  </StyledTableCell>
                </Table.Row>
                <Table.Row>
                  <StyledTableCell width={5}>
                    <Text color="bodyLight">Aadhaar Linked:</Text>
                  </StyledTableCell>
                  <StyledTableCell>
                    {_get(pan, 'metadata.aadhaar_linked', false) ? 'Yes' : 'No'}
                  </StyledTableCell>
                </Table.Row>
              </>
            )}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderAadhaarDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'aadhaar_details', [])?.map((aadhaar, idx) => (
          <React.Fragment
            key={`aadhaar-${_get(aadhaar, 'masked_aadhaar_number', idx)}`}
          >
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Masked Aadhaar:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(aadhaar, 'masked_aadhaar_number', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(aadhaar, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderDrivingLicenseDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'driving_license_details', [])?.map((dl, idx) => (
          <React.Fragment key={`dl-${_get(dl, 'driving_license_number', idx)}`}>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">DL Number:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(dl, 'driving_license_number', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(dl, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderAddresses = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'addresses', [])?.map((address, idx) => (
          <React.Fragment
            key={`address-${_get(address, 'type', '')}-${_get(
              address,
              'city',
              '',
            )}-${idx}`}
          >
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">
                  Address {idx + 1}
                  {_get(address, 'type', '')
                    ? ` (${_get(address, 'type', '')})`
                    : ''}
                  :
                </Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(address, 'address', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">City:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(address, 'city', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">State:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(address, 'state', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Pincode:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(address, 'pincode', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Country:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(address, 'country', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(address, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            {idx < _get(modalData, 'addresses', [])?.length - 1 && (
              <Table.Row>
                <Table.Cell colSpan="2">
                  <div
                    style={{ height: '8px', borderBottom: '1px solid #eee' }}
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderBankAccountDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'bank_account_details', [])?.map((bank, idx) => (
          <React.Fragment key={`bank-${_get(bank, 'bank_account', idx)}`}>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Account Number:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(bank, 'bank_account', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">IFSC Code:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(bank, 'ifsc', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Bank Address:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(bank, 'bank_address', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(bank, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            {idx < _get(modalData, 'bank_account_details', [])?.length - 1 && (
              <Table.Row>
                <Table.Cell colSpan="2">
                  <div
                    style={{ height: '8px', borderBottom: '1px solid #eee' }}
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderEmploymentDetails = () => (
    <div className="mt-3">
      {_get(modalData, 'employment_details.uan', [])?.length > 0 && (
        <div className="mb-4">
          <Text variant="h16" strong className="mb-2">
            UAN Details
          </Text>
          <Table basic="very" compact>
            <Table.Body>
              {_get(modalData, 'employment_details.uan', [])?.map(
                (uanDetail, idx) => (
                  <React.Fragment key={`uan-${_get(uanDetail, 'uan', idx)}`}>
                    <Table.Row>
                      <StyledTableCell width={5}>
                        <Text color="bodyLight">UAN:</Text>
                      </StyledTableCell>
                      <StyledTableCell>
                        {_get(uanDetail, 'uan', '–') || '–'}
                      </StyledTableCell>
                    </Table.Row>
                    <Table.Row>
                      <StyledTableCell width={5}>
                        <Text color="bodyLight">Member ID:</Text>
                      </StyledTableCell>
                      <StyledTableCell>
                        {_get(uanDetail, 'member_id', '–') || '–'}
                      </StyledTableCell>
                    </Table.Row>
                    <Table.Row>
                      <StyledTableCell width={5}>
                        <Text color="bodyLight">Establishment:</Text>
                      </StyledTableCell>
                      <StyledTableCell>
                        {_get(uanDetail, 'establishment_name', '–') || '–'}
                      </StyledTableCell>
                    </Table.Row>
                    <Table.Row>
                      <StyledTableCell width={5}>
                        <Text color="bodyLight">Joining Date:</Text>
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDate(_get(uanDetail, 'joining_date'))}
                      </StyledTableCell>
                    </Table.Row>
                    <Table.Row>
                      <StyledTableCell width={5}>
                        <Text color="bodyLight">UAN Linked Aadhaar:</Text>
                      </StyledTableCell>
                      <StyledTableCell>
                        {_get(uanDetail, 'uan_linked_aadhaar', false)
                          ? 'Yes'
                          : 'No'}
                      </StyledTableCell>
                    </Table.Row>
                  </React.Fragment>
                ),
              )}
            </Table.Body>
          </Table>
        </div>
      )}

      {_get(modalData, 'employment_details.recent_employment_details') && (
        <div>
          <Text variant="h16" strong className="mb-2">
            Recent Employment Details
          </Text>
          <Table basic="very" compact>
            <Table.Body>
              <Table.Row>
                <StyledTableCell width={5}>
                  <Text color="bodyLight">Employee Name Match:</Text>
                </StyledTableCell>
                <StyledTableCell>
                  {_get(
                    modalData,
                    'employment_details.recent_employment_details.employee_details.employee_name_match',
                  )
                    ? 'Yes'
                    : 'No'}
                </StyledTableCell>
              </Table.Row>
              <Table.Row>
                <StyledTableCell width={5}>
                  <Text color="bodyLight">Currently Employed:</Text>
                </StyledTableCell>
                <StyledTableCell>
                  {_get(
                    modalData,
                    'employment_details.recent_employment_details.employee_details.employed',
                  )
                    ? 'Yes'
                    : 'No'}
                </StyledTableCell>
              </Table.Row>
              <Table.Row>
                <StyledTableCell width={5}>
                  <Text color="bodyLight">Employer:</Text>
                </StyledTableCell>
                <StyledTableCell>
                  {_get(
                    modalData,
                    'employment_details.recent_employment_details.employer_details.establishment_name',
                    '–',
                  ) || '–'}
                </StyledTableCell>
              </Table.Row>
              <Table.Row>
                <StyledTableCell width={5}>
                  <Text color="bodyLight">Employer Confidence Score:</Text>
                </StyledTableCell>
                <StyledTableCell>
                  {_get(
                    modalData,
                    'employment_details.recent_employment_details.employer_details.employer_confidence_score',
                    '–',
                  ) || '–'}
                  {_get(
                    modalData,
                    'employment_details.recent_employment_details.employer_details.employer_confidence_score',
                    '',
                  ) && '%'}
                </StyledTableCell>
              </Table.Row>
              <Table.Row>
                <StyledTableCell width={5}>
                  <Text color="bodyLight">Setup Date:</Text>
                </StyledTableCell>
                <StyledTableCell>
                  {formatDate(
                    _get(
                      modalData,
                      'employment_details.recent_employment_details.employer_details.setup_date',
                    ),
                  )}
                </StyledTableCell>
              </Table.Row>
              <Table.Row>
                <StyledTableCell width={5}>
                  <Text color="bodyLight">Ownership Type:</Text>
                </StyledTableCell>
                <StyledTableCell>
                  {_get(
                    modalData,
                    'employment_details.recent_employment_details.employer_details.ownership_type',
                    '–',
                  ) || '–'}
                </StyledTableCell>
              </Table.Row>
            </Table.Body>
          </Table>

          {_get(
            modalData,
            'employment_details.recent_employment_details.employer_details.pf_filing_details',
            [],
          )?.length && (
            <div className="mt-3">
              <Text variant="h16" strong className="mb-2">
                PF Filing Details
              </Text>
              <Table basic="very" compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Wage Month</Table.HeaderCell>
                    <Table.HeaderCell>Total Amount</Table.HeaderCell>
                    <Table.HeaderCell>Employees Count</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_get(
                    modalData,
                    'employment_details.recent_employment_details.employer_details.pf_filing_details',
                    [],
                  )?.map(filing => (
                    <Table.Row
                      key={`pf-filing-${_get(filing, 'wage_month', '')}-${_get(
                        filing,
                        'total_amount',
                        '',
                      )}`}
                    >
                      <StyledTableCell>
                        {_get(filing, 'wage_month', '–') || '–'}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatCurrency(_get(filing, 'total_amount'))}
                      </StyledTableCell>
                      <StyledTableCell>
                        {_get(filing, 'employees_count', 0)?.toLocaleString(
                          'en-IN',
                        ) || '–'}
                      </StyledTableCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderMobileIntelligence = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Valid Number:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(
              modalData,
              'mobile_number_intelligence.is_valid_number',
              false,
            )
              ? 'Yes'
              : 'No'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Subscriber Status:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(
              modalData,
              'mobile_number_intelligence.subscriber_status',
              '–',
            ) || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Connection Type:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(
              modalData,
              'mobile_number_intelligence.connection_type',
              '–',
            ) || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Current Service Provider:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(
              modalData,
              'mobile_number_intelligence.current_service_provider',
              '–',
            ) || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Original Service Provider:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(
              modalData,
              'mobile_number_intelligence.original_service_provider',
              '–',
            ) || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Network Region:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(
              modalData,
              'mobile_number_intelligence.network_region',
              '–',
            ) || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Number Ported:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'mobile_number_intelligence.is_ported', false)
              ? 'Yes'
              : 'No'}
          </StyledTableCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const renderCreditScore = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Credit Score:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'credit_score', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const renderPassportDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'passport_details', [])?.map((passport, idx) => (
          <React.Fragment
            key={`passport-${_get(passport, 'passport_number', idx)}`}
          >
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Passport Number:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(passport, 'passport_number', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(passport, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderRationCardDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'ration_card_details', [])?.map((rationCard, idx) => (
          <React.Fragment
            key={`rationCard-${_get(rationCard, 'ration_card_number', idx)}`}
          >
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Ration Card Number:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(rationCard, 'ration_card_number', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(rationCard, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderVoterDetails = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        {_get(modalData, 'voter_details', [])?.map((voter, idx) => (
          <React.Fragment key={`voter-${_get(voter, 'voter_id', idx)}`}>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Voter ID:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(voter, 'voter_id', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
            <Table.Row>
              <StyledTableCell width={5}>
                <Text color="bodyLight">Linked To:</Text>
              </StyledTableCell>
              <StyledTableCell>
                {_get(voter, 'linked_to', '–') || '–'}
              </StyledTableCell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  const renderRiskIntelligence = () => (
    <Table basic="very" compact className="mt-3">
      <Table.Body>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Is Safe:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'risk_intelligence.is_safe', false) ? 'Yes' : 'No'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Risk Level:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'risk_intelligence.risk_level', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Risk Reason:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'risk_intelligence.risk_reason', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Risk Description:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {_get(modalData, 'risk_intelligence.risk_description', '–') || '–'}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Added On:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {formatDate(_get(modalData, 'risk_intelligence.added_on'))}
          </StyledTableCell>
        </Table.Row>
        <Table.Row>
          <StyledTableCell width={5}>
            <Text color="bodyLight">Last Updated On:</Text>
          </StyledTableCell>
          <StyledTableCell>
            {formatDate(_get(modalData, 'risk_intelligence.last_updated_on'))}
          </StyledTableCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  const renderSectionContent = sectionKey => {
    switch (sectionKey) {
      case 'personal_details':
        return renderPersonalDetails();
      case 'phone_numbers':
        return renderPhoneNumbers();
      case 'emails':
        return renderEmails();
      case 'pan_details':
        return renderPanDetails();
      case 'aadhaar_details':
        return renderAadhaarDetails();
      case 'driving_license_details':
        return renderDrivingLicenseDetails();
      case 'addresses':
        return renderAddresses();
      case 'bank_account_details':
        return renderBankAccountDetails();
      case 'employment_details':
        return renderEmploymentDetails();
      case 'mobile_number_intelligence':
        return renderMobileIntelligence();
      case 'passport_details':
        return renderPassportDetails();
      case 'ration_card_details':
        return renderRationCardDetails();
      case 'voter_details':
        return renderVoterDetails();
      case 'credit_score':
        return renderCreditScore();
      case 'risk_intelligence':
        return renderRiskIntelligence();
      default:
        return null;
    }
  };

  const visibleSections = sections?.filter(section => section.condition());
  const isDetailsNotFound = _get(modalData, 'status') === 'DETAILS_NOT_FOUND';

  // Determine the icon type based on the modal state
  const getIconType = () => {
    if (isDetailsNotFound) {
      return 'warning';
    }
    return 'success';
  };

  const formatStatus = status => {
    if (!status) {
      return '–';
    }
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusColor = status => {
    if (status === 'SUCCESS') {
      return 'success';
    }
    if (status === 'DETAILS_NOT_FOUND') {
      return 'warning';
    }
    return 'bodyLight';
  };

  return (
    <Modal open $maxWidth="800">
      <StyledModalContent className="p-4" scrolling>
        <ModalDescription>
          {/* Modal Header */}
          <div className="mb-4" style={{ textAlign: 'center' }}>
            <Image inline src={getAlertIcon(getIconType())} className="mb-2" />
            <Text variant="h20" className="mt-2 mb-1">
              {isDetailsNotFound
                ? 'No data found'
                : 'Data fetched successfully'}
            </Text>
          </div>

          {/* Basic Info */}
          <div className="mb-4" style={{ padding: '0px 4px' }}>
            <Table basic="very" compact>
              <Table.Body>
                <Table.Row>
                  <StyledTableCell width={4}>
                    <Text color="bodyLight">Verification ID:</Text>
                  </StyledTableCell>
                  <StyledTableCell>
                    {_get(modalData, 'verification_id', '–') || '–'}
                  </StyledTableCell>
                </Table.Row>
                <Table.Row>
                  <StyledTableCell width={4}>
                    <Text color="bodyLight">Reference ID:</Text>
                  </StyledTableCell>
                  <StyledTableCell>
                    {_get(modalData, 'reference_id', '–') || '–'}
                  </StyledTableCell>
                </Table.Row>
                <Table.Row>
                  <StyledTableCell width={4}>
                    <Text color="bodyLight">Status:</Text>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Text color={getStatusColor(_get(modalData, 'status', ''))}>
                      {formatStatus(_get(modalData, 'status', '–'))}
                    </Text>
                  </StyledTableCell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          {/* No Data Found Message */}
          {isDetailsNotFound && (
            <div
              className="mb-4"
              style={{ textAlign: 'center', padding: '20px' }}
            >
              <Text color="bodyLight" variant="h16">
                No detailed information is available for this verification
                request.
              </Text>
            </div>
          )}

          {/* Detailed Sections - Only show if data is available */}
          {!isDetailsNotFound &&
            visibleSections?.map((section, index) => (
              <React.Fragment key={section.key}>
                <StyledAccordion>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={handleAccordionClick}
                  >
                    <Space justifyContent="space-between" alignItems="center">
                      <span>{section.title}</span>
                      <Icon
                        name={accordionActive(activeIndex === index)}
                        className="ml-1"
                        fill={activeIndex === index ? '#6B6C7B' : undefined}
                      />
                    </Space>
                  </Accordion.Title>
                  <StyledAccordionContent active={activeIndex === index}>
                    <Accordion.Content active={activeIndex === index}>
                      {renderSectionContent(section.key)}
                    </Accordion.Content>
                  </StyledAccordionContent>
                </StyledAccordion>
                {index < visibleSections?.length - 1 && (
                  <Divider style={{ margin: 0, padding: 0 }} />
                )}
              </React.Fragment>
            ))}
        </ModalDescription>
      </StyledModalContent>

      <ModalActions style={{ textAlign: 'center' }}>
        <Button primary onClick={() => handleClose()}>
          Okay
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default OnboardingDetailModal;

OnboardingDetailModal.propTypes = {
  modalData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};
