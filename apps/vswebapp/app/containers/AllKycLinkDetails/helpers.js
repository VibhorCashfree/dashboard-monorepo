import React from 'react';
import { Text, Button } from '@cashfree-intl/coherent';
import _chunk from 'lodash/chunk';
import _get from 'lodash/get';
import _isNull from 'lodash/isNull';
import _omitBy from 'lodash/omitBy';
import _isEmpty from 'lodash/isEmpty';

// Constants
import { VERIFICATIONS_MAPPING } from './constants';

// Utils
import { openBase64ImageInNewTab } from 'utils/image';

// Styled
import { DetailsRow } from 'styled/common';

export const getReferenceAndVerificationType = verificationDetails =>
  verificationDetails.map(detail => ({
    referenceId: detail.reference_id,
    verificationType: detail.type,
  }));

export const getVerificationDetailsObj = verificationDetailsArr =>
  verificationDetailsArr.reduce(
    (acc, curr) => ({ ...acc, [curr.verificationType]: curr.details }),
    {},
  );

export const getChunkedArray = (list = []) => _chunk(list, 2);

export const getAccordionData = (
  data,
  verificationDetails,
  documentDetails = {},
) => {
  const filteredNullData = _omitBy(data, _isNull);

  return _get(filteredNullData, 'verification_details', [])
    .map(item => {
      const verificationType = item.type;
      const VERIFICATION_FIELD = VERIFICATIONS_MAPPING[verificationType];

      // If mapping dont exist, will not show accordion
      if (!VERIFICATION_FIELD) return;

      // Special handling for DigiLocker verification
      if (verificationType === 'DIGILOCKER_VERIFICATION') {
        const digilockerData = verificationDetails[(VERIFICATION_FIELD?.key)];
        const documentData = documentDetails[(VERIFICATION_FIELD?.key)];

        return {
          title: <Text variant="h16">{VERIFICATION_FIELD.title}</Text>,
          status: item.status,
          content: (
            <div>{renderDigilockerRows(digilockerData, documentData)}</div>
          ),
        };
      }

      const FIELD_KEYS = Object.keys(_get(VERIFICATION_FIELD, 'fieldsKey', ''));
      const chunkedFieldKeys = getChunkedArray(FIELD_KEYS);

      const renderFieldContent = fieldKey => {
        const field = VERIFICATION_FIELD.fieldsKey[fieldKey];
        const fieldTitle = field.title || '';
        const value =
          !_isEmpty(_omitBy(verificationDetails, _isNull)) &&
          _get(
            verificationDetails[(VERIFICATION_FIELD?.key)],
            `${fieldKey}`,
            '',
          );
        const fieldValue = field.action
          ? value
            ? field.action(value)
            : '–'
          : value || '–';

        return (
          <>
            <div>
              <Text color="bodyLight">{fieldTitle}</Text>
            </div>

            <div className="text-wrap">{fieldValue}</div>
          </>
        );
      };

      return {
        title: <Text variant="h16">{VERIFICATION_FIELD.title}</Text>,
        status: item.status,
        content: (
          <div>
            {chunkedFieldKeys.map(row => (
              <DetailsRow>
                {row.map(renderFieldContent)}

                {row.length === 1 && (
                  <>
                    <div />
                    <div />
                  </>
                )}
              </DetailsRow>
            ))}
          </div>
        ),
      };
    })
    .filter(Boolean);
};

export const renderDigilockerRows = (digilockerData, documentData = null) => {
  if (!digilockerData) {
    return null;
  }

  const userDetails = _get(digilockerData, 'user_details', {});

  // Basic DigiLocker verification info
  const digilockerFields = [
    [
      {
        label: 'Verification ID',
        value: _get(digilockerData, 'verification_id', '–'),
      },
      {
        label: 'Name',
        value: _get(userDetails, 'name', '–'),
      },
    ],
    [
      {
        label: 'Date of Birth',
        value: _get(userDetails, 'dob', '–'),
      },
      {
        label: 'Gender',
        value: (() => {
          const gender = _get(userDetails, 'gender', '–');
          if (gender === 'M') return 'Male';
          if (gender === 'F') return 'Female';
          return gender === '–' ? '–' : gender;
        })(),
      },
    ],
    [
      {
        label: 'E-Aadhaar',
        value: _get(userDetails, 'eaadhaar', '–'),
      },
      {
        label: 'Mobile',
        value: _get(userDetails, 'mobile', '–'),
      },
    ],
    [
      {
        label: 'Document Requested',
        value: (() => {
          const docs = _get(digilockerData, 'document_requested', []);
          return Array.isArray(docs) ? docs.join(', ') : docs || '–';
        })(),
      },
      {
        label: 'Document Consent',
        value: (() => {
          const docs = _get(digilockerData, 'document_consent', []);
          return Array.isArray(docs) ? docs.join(', ') : docs || '–';
        })(),
      },
    ],
  ];

  // Render basic DigiLocker info
  const basicRows = digilockerFields.map((pair, index) => (
    <DetailsRow key={`digilocker-row-${index}`}>
      <div>
        <Text color="bodyLight">{pair[0].label}</Text>
      </div>
      <div className="text-wrap">{pair[0].value}</div>

      {pair[1] ? (
        <>
          <div>
            <Text color="bodyLight">{pair[1].label}</Text>
          </div>
          <div className="text-wrap">{pair[1].value}</div>
        </>
      ) : (
        <>
          <div />
          <div />
        </>
      )}
    </DetailsRow>
  ));

  // If we have document data (Aadhaar), render additional details
  if (documentData && !documentData.error) {
    const aadhaarRows = [
      [
        {
          label: 'Aadhaar Number',
          value: `XXXX XXXX ${_get(documentData, 'uid', '–')?.slice(8) || '–'}`,
        },
        {
          label: 'Care Of / Guardian',
          value: _get(documentData, 'care_of', '–'),
        },
      ],
      [
        {
          label: 'Address',
          value: _get(documentData, 'address', '–'),
        },
        {
          label: 'Photo Link',
          value: _get(documentData, 'photo_link', '–') ? (
            <Button
              className="p-0"
              fluid
              link
              onClick={() =>
                openBase64ImageInNewTab(
                  `data:image/png;base64,${_get(
                    documentData,
                    'photo_link',
                    '–',
                  )}`,
                )
              }
              style={{
                textAlign: 'left',
                color: '#1a0dab',
                textDecoration: 'underline',
              }}
            >
              View Image
            </Button>
          ) : (
            '–'
          ),
        },
      ],
      [
        {
          label: 'XML File',
          value: _get(documentData, 'xml_file', '–') ? (
            <a
              href={_get(documentData, 'xml_file', '–')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#1a0dab',
                textDecoration: 'underline',
              }}
            >
              View XML
            </a>
          ) : (
            '–'
          ),
        },
        {
          label: 'Document Status',
          value: _get(documentData, 'status', '–'),
        },
      ],
    ];

    const documentRows = aadhaarRows.map((pair, index) => (
      <DetailsRow key={`aadhaar-row-${index}`}>
        <div>
          <Text color="bodyLight">{pair[0].label}</Text>
        </div>
        <div className="text-wrap">{pair[0].value}</div>

        {pair[1] ? (
          <>
            <div>
              <Text color="bodyLight">{pair[1].label}</Text>
            </div>
            <div className="text-wrap">{pair[1].value}</div>
          </>
        ) : (
          <>
            <div />
            <div />
          </>
        )}
      </DetailsRow>
    ));

    return [...basicRows, ...documentRows];
  }

  return basicRows;
};

// Enhanced version with better field name formatting and ordering
export const renderMetaDataRows = (metaData, customOrder = []) => {
  if (!metaData || typeof metaData !== 'object') {
    return null;
  }

  try {
    // Function to format field names (convert camelCase/snake_case to readable format)
    const formatFieldName = key => {
      return key
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
        .trim();
    };

    let entries = Object.entries(metaData);

    // Apply custom ordering if provided
    if (customOrder.length > 0) {
      const orderedEntries = [];
      const remainingEntries = [...entries];

      // Add entries in custom order
      customOrder.forEach(key => {
        const entryIndex = remainingEntries.findIndex(([k]) => k === key);
        if (entryIndex !== -1) {
          orderedEntries.push(remainingEntries[entryIndex]);
          remainingEntries.splice(entryIndex, 1);
        }
      });

      // Add remaining entries
      entries = [...orderedEntries, ...remainingEntries];
    }

    // Group entries into pairs for 2-column layout
    const groupedEntries = [];
    for (let i = 0; i < entries.length; i += 2) {
      groupedEntries.push(entries.slice(i, i + 2));
    }

    return groupedEntries.map((pair, index) => (
      <DetailsRow key={`meta-row-${index}`}>
        {/* First column */}
        <div>
          <Text color="bodyLight">{formatFieldName(pair[0][0])}</Text>
        </div>
        <div className="text-wrap">{pair[0][1] || '–'}</div>

        {/* Second column (if exists) */}
        {pair[1] ? (
          <>
            <div>
              <Text color="bodyLight">{formatFieldName(pair[1][0])}</Text>
            </div>
            <div className="text-wrap">{pair[1][1] || '–'}</div>
          </>
        ) : (
          // Empty cells to maintain grid structure
          <>
            <div />
            <div />
          </>
        )}
      </DetailsRow>
    ));
  } catch (error) {
    console.error('Error rendering meta data rows:', error);
    return null; // Fail gracefully
  }
};
