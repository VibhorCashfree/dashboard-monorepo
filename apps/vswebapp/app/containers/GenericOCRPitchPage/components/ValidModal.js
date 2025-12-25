import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  ModalContent,
  ModalDescription,
  Image,
  Space,
  Icon,
  Conditional,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import moment from 'moment';

// Helpers
import { getFraudCheckValues } from '../helper';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider, ModalRow, AlignedRow } from 'styled/common';
import { StyledAlertModal } from '../styled';

const ValidModal = ({ data, onClose }) => (
  <StyledAlertModal open>
    <ModalContent className="p-0">
      <ModalDescription>
        <div className="mt-1 text-center">
          <Image inline src={getAlertIcon('success')} />
          <Text variant="h16" strong className="my-3">
            Document is Valid
          </Text>
          <ModalRow>
            <Text variant="b14" strong>
              Details
            </Text>
            <div />
          </ModalRow>
          <Conditional if={data?.document_type === 'VEHICLE_RC'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">Registration Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.registration_number', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Owner Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.owner_name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Relation Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.relation_name', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Vehicle Model</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.vehicle_model', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Vehicle Type</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.vehicle_type', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Manufacturer Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.manufacturer_name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Manufacturing Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.manufacturing_date', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Registration Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.registration_date', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Registration Validity</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.registration_validity', '–') ||
                  '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Chassis Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.chassis_number', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Engine Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.engine_number', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow style={{ alignItems: 'flex-start' }}>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-left text-wrap" style={{ flex: '1 1 51%' }}>
                {_get(data, 'document_fields.address', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'DRIVING_LICENCE'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">License Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.license_number', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Full Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.full_name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Guardian Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.guardian_name', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Date of Birth</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.date_of_birth', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Blood Group</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.blood_group', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">License Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.license_issue_date', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">License Expiry Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.license_expiry_date', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Issuing Authority</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.issuing_authority', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">PIN</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.pin', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow style={{ alignItems: 'flex-start' }}>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-left text-wrap" style={{ flex: '1 1 51%' }}>
                {_get(data, 'document_fields.address', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>

          <Conditional if={data?.document_type === 'VOTER_ID_BACK'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">EPIC Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.epic_number', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Date of Birth</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.dob', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Age on Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.age_on_issue_date', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Gender</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.gender', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.issue_date', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Voter ID Type</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.type_voter_id', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">State</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.state', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow style={{ alignItems: 'flex-start' }}>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-left text-wrap" style={{ flex: '1 1 51%' }}>
                {_get(data, 'document_fields.address', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'VOTER_ID_FRONT'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">EPIC Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.epic_number', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Relative Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.relative_name', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Date of Birth</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.dob', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Gender</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.gender', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.issue_date', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Voter ID Type</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.type_voter_id', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>

          <Conditional if={data?.document_type === 'PASSPORT_BACK'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">Passport Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.passport_num', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Father's Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.father_name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Mother's Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.mother_name', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">File Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.file_number', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">PIN Code</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.pin', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Old Passport Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.old_passport_number', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Old Issue City</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.old_issue_city', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Old Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.old_issue_date', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Spouse Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.spouse_name', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow style={{ alignItems: 'flex-start' }}>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-left text-wrap" style={{ flex: '1 1 51%' }}>
                {_get(data, 'document_fields.address', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'PASSPORT_FRONT'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">Passport Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.passport_number', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Given Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.given_name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Surname</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.surname', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Date of Birth</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.dob')
                  ? moment(data.document_fields.dob).format('DD/MM/YYYY')
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">Birth City</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.birth_city', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Gender</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.gender', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Nationality</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.nationality', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Country Code</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.country_code', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Issue City</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.issue_city', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.issue_date')
                  ? moment(data.document_fields.issue_date).format('DD/MM/YYYY')
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">Expiry Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.expiry_date')
                  ? moment(data.document_fields.expiry_date).format(
                      'DD/MM/YYYY',
                    )
                  : '–'}
              </div>
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'PAN'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">PAN</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.pan', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">DOB</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.dob')
                  ? moment(data?.document_fields.dob).format('DD/MM/YYYY')
                  : '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Father</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.father', '–') || '–'}
              </div>
              <div />
              <div />
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'AADHAAR_FRONT'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">UID</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.uid', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.name', '–') || '–'}
              </div>
              <div>
                <Text color="bodyLight">Father</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.father', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div>
                <Text color="bodyLight">DOB</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.dob')
                  ? moment(data?.document_fields.dob).format('DD/MM/YYYY')
                  : '–'}
              </div>
              <div>
                <Text color="bodyLight">Gender</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.gender', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow style={{ alignItems: 'flex-start' }}>
              <div>
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-left text-wrap" style={{ flex: '1 1 51%' }}>
                {_get(data, 'document_fields.address', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'AADHAAR_BACK'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {' '}
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">UID</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.uid', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Father</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.father_name', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Pincode</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.pincode', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">State</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.state', '–') || '–'}
              </div>
              <div />
              <div />
            </AlignedRow>
            <AlignedRow style={{ alignItems: 'flex-start' }}>
              <div className="text-left">
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-left text-wrap" style={{ flex: '1 1 51%' }}>
                {_get(data, 'document_fields.address', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'INVOICE'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Vendor</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.vendor.name', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Vendor Address</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.vendor.address', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Vendor GSTIN</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.vendor.gstin', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Vendor Contact</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.vendor.contact', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Vendor Email</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.vendor.email', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Buyer</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.buyer.name', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Buyer Address</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.buyer.address', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Buyer Contact Person</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.buyer.contact_person', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Buyer Contact</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.buyer.contact', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Buyer GSTIN</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.buyer.gstin', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Buyer State</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.buyer.state', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Invoice Number</Text>
              </div>
              <div className="text-wrap">
                {_get(
                  data,
                  'document_fields.invoice_details.invoice_number',
                  '–',
                ) || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Invoice Date</Text>
              </div>
              <div className="text-wrap">
                {_get(
                  data,
                  'document_fields.invoice_details.invoice_date',
                  '–',
                ) || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Order Reference Number</Text>
              </div>
              <div className="text-wrap">
                {_get(
                  data,
                  'document_fields.invoice_details.order_reference.order_ref_no',
                  '–',
                ) || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Order Reference Date</Text>
              </div>
              <div className="text-wrap">
                {_get(
                  data,
                  'document_fields.invoice_details.order_reference.order_ref_date',
                  '–',
                ) || '–'}
              </div>
            </AlignedRow>
          </Conditional>
          <Conditional if={data?.document_type === 'CANCELLED_CHEQUE'}>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Document Type</Text>
              </div>
              <div className="text-wrap">
                {data?.document_type
                  ? _startCase(data?.document_type.replace(/_/g, ' '))
                  : '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Cheque Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.cheque_number', '–') || '–'}
              </div>
            </AlignedRow>

            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Account Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.account_number', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">IFSC</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.ifsc', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Pincode</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.pincode', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Bank Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.bank_name', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Account Type</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.account_type', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Micro Code</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.micr_code', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Contact Number</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.contact', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Branch</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.branch', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Name</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.name', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.issue_date', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Expiry Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.name', '–') || '–'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Issue Date</Text>
              </div>
              <div className="text-wrap">
                {_get(data, 'document_fields.expiry_date', '–') || '–'}
              </div>
            </AlignedRow>
            <AlignedRow style={{ alignItems: 'flex-start' }}>
              <div className="text-left">
                <Text color="bodyLight">Address</Text>
              </div>
              <div className="text-left text-wrap" style={{ flex: '1 1 51%' }}>
                {_get(data, 'document_fields.address_line', '–') || '–'}
              </div>
            </AlignedRow>
          </Conditional>
          {_get(data, 'quality_checks') &&
            ['AADHAAR_FRONT', 'AADHAAR_BACK', 'PAN'].includes(
              data?.document_type,
            ) && (
              <>
                <Divider contain />
                <ModalRow>
                  <Text variant="b14" strong>
                    Quality Check
                  </Text>
                  <div />
                </ModalRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Partially Present</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'quality_checks.partially_present')
                      ? 'Yes'
                      : 'No'}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">Black & White</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'quality_checks.black_and_white')
                      ? 'Yes'
                      : 'No'}
                  </div>
                </AlignedRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Face Present</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'quality_checks.face_present') ? 'Yes' : 'No'}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">QR Present</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'quality_checks.qr_present') ? 'Yes' : 'No'}
                  </div>
                </AlignedRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Face Clear</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'quality_checks.face_clear') ? 'Yes' : 'No'}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">Blur</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'quality_checks.blur') ? 'Yes' : 'No'}
                  </div>
                </AlignedRow>
              </>
            )}
          {_get(data, 'fraud_checks') &&
            ['AADHAAR_FRONT', 'AADHAAR_BACK', 'PAN'].includes(
              data?.document_type,
            ) && (
              <>
                <Divider contain />
                <ModalRow>
                  <Text variant="b14" strong>
                    Fraud Check
                  </Text>
                  <div />
                </ModalRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Is screenshot?</Text>
                  </div>
                  <div className="text-wrap">
                    {getFraudCheckValues(
                      _get(data, 'fraud_checks.is_screenshot'),
                    )}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">Is photo of screen?</Text>
                  </div>
                  <div className="text-wrap">
                    {getFraudCheckValues(
                      _get(data, 'fraud_checks.is_photo_of_screen'),
                    )}
                  </div>
                </AlignedRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Is overwritten?</Text>
                  </div>
                  <div className="text-wrap">
                    {getFraudCheckValues(
                      _get(data, 'fraud_checks.is_overwritten'),
                    )}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">Is photo imposed?</Text>
                  </div>
                  <div className="text-wrap">
                    {getFraudCheckValues(
                      _get(data, 'fraud_checks.is_photo_imposed'),
                    )}
                  </div>
                </AlignedRow>
              </>
            )}

          {_get(data, 'verification_details') &&
            ['PAN'].includes(data?.document_type) && (
              <>
                <Divider contain />
                <ModalRow>
                  <Text variant="b14" strong>
                    Verification Details
                  </Text>
                  <div />
                </ModalRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Status</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'verification_details.status', '–')}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">PAN</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'verification_details.pan', '–')}
                  </div>
                </AlignedRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Name</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'verification_details.name', '–')}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">Date of Birth</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'verification_details.dob')
                      ? moment(data.verification_details.dob).format(
                          'DD/MM/YYYY',
                        )
                      : '–'}
                  </div>
                </AlignedRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Name Match</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'verification_details.name_match') === 'Y'
                      ? 'Yes'
                      : 'No'}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">DOB Match</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'verification_details.dob_match') === 'Y'
                      ? 'Yes'
                      : 'No'}
                  </div>
                </AlignedRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">PAN Status</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(data, 'verification_details.pan_status', '–') === 'E'
                      ? 'Exists'
                      : _get(data, 'verification_details.pan_status', '–')}
                  </div>
                  <div className="text-left">
                    <Text color="bodyLight">Aadhaar Seeding Status</Text>
                  </div>
                  <div className="text-wrap">
                    {_get(
                      data,
                      'verification_details.aadhaar_seeding_status',
                    ) === 'Y'
                      ? 'Yes'
                      : 'No'}
                  </div>
                </AlignedRow>
                <AlignedRow>
                  <div className="text-left">
                    <Text color="bodyLight">Aadhaar Seeding Description</Text>
                  </div>
                  <div className="text-wrap" style={{ flex: '1 1 51%' }}>
                    {_get(
                      data,
                      'verification_details.aadhaar_seeding_status_desc',
                      '–',
                    )}
                  </div>
                </AlignedRow>
              </>
            )}
        </div>
        <BtnContainer textAlign="center">
          <Button primary onClick={onClose} data-event-name="Primary_Button">
            Close
          </Button>
        </BtnContainer>
      </ModalDescription>
    </ModalContent>
  </StyledAlertModal>
);

ValidModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.any,
};

export default ValidModal;
