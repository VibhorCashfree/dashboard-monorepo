import React, { useState } from 'react';
import {
  Accordion,
  Button,
  Icon,
  Text,
  Conditional,
  Space,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

import { openBase64ImageInNewTab } from 'utils/image';
import Loader from 'components/Loader';

// Styled
import { StyledAccordion, StyledAccordionContent } from '../styled';
import { DetailsRow } from 'styled/common';

const DocumentDetailsAccordion = ({ documentData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const accordionActive = isActive =>
    isActive ? 'chevron-up' : 'chevron-down';

  const getTitle = data => {
    if (_get(data, 'uid')) {
      return 'Aadhaar Details';
    }

    if (_get(data, 'pan')) {
      return 'Pan Details';
    }

    if (_get(data, 'dl_number')) {
      return 'Driving Licence Details';
    }

    return 'Details';
  };

  return (
    <>
      {documentData?.map((doc, index) =>
        !_get(doc, 'error') ? (
          <StyledAccordion key={index}>
            <Accordion.Title
              active={activeIndex === index}
              index={index}
              onClick={handleAccordionClick}
            >
              <Space justifyContent="space-between" alignItems="center">
                <span>{getTitle(doc)}</span>
                <Icon
                  name={accordionActive(activeIndex === index)}
                  className="ml-1"
                />
              </Space>
            </Accordion.Title>
            <StyledAccordionContent active={activeIndex === index}>
              <Accordion.Content active={activeIndex === index}>
                <Conditional if={getTitle(doc) === 'Aadhaar Details'}>
                  <div className="mt-3">
                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Aadhaar Number:</Text>
                      </div>
                      <div>XXXX XXXX {_get(doc, 'uid', '–')?.slice(8) || '–'}</div>
                      <div>
                        <Text color="bodyLight">Name:</Text>
                      </div>
                      <div>{_get(doc, 'name', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Date of Birth:</Text>
                      </div>
                      <div>{_get(doc, 'dob', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Gender:</Text>
                      </div>
                      <div>{_get(doc, 'gender', '–') === 'M' ? 'Male' : _get(doc, 'gender', '–') === 'F' ? 'Female' : _get(doc, 'gender', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Care Of / Guardian:</Text>
                      </div>
                      <div>{_get(doc, 'care_of', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Photo Link:</Text>
                      </div>
                      <div>
                        {_get(doc, 'photo_link', '–') ? (
                          <Button
                            className="p-0"
                            fluid
                            link
                            onClick={() =>
                              openBase64ImageInNewTab(
                                `data:image/png;base64,${_get(doc, 'photo_link', '–')}`,
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
                        )}
                      </div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Reference ID:</Text>
                      </div>
                      <div>{_get(doc, 'reference_id', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Status:</Text>
                      </div>
                      <div>{_get(doc, 'status', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Verification ID:</Text>
                      </div>
                      <div>{_get(doc, 'verification_id', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">XML File:</Text>
                      </div>
                      <div>
                        <a
                          href={_get(doc, 'xml_file', '–')}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#1a0dab',
                            textDecoration: 'underline',
                          }}
                        >
                          View XML
                        </a>
                      </div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Address:</Text>
                      </div>
                      <div>{_get(doc, 'address', '–') || '–'}</div>
                      {/* Empty cells for alignment */}
                      <div />
                      <div />
                    </DetailsRow>
                  </div>
                </Conditional>

                <Conditional if={getTitle(doc) === 'Pan Details'}>
                  <div className="mt-3">
                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">PAN Number:</Text>
                      </div>
                      <div>{_get(doc, 'pan', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Name:</Text>
                      </div>
                      <div>{_get(doc, 'name_pan_card', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Date of Birth:</Text>
                      </div>
                      <div>{_get(doc, 'dob', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Gender:</Text>
                      </div>
                      <div>{_get(doc, 'gender', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Type:</Text>
                      </div>
                      <div>{_get(doc, 'type', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Reference ID:</Text>
                      </div>
                      <div>{_get(doc, 'reference_id', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Status:</Text>
                      </div>
                      <div>{_get(doc, 'status', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Verification ID:</Text>
                      </div>
                      <div>{_get(doc, 'verification_id', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">XML File:</Text>
                      </div>
                      <div>
                        <a
                          href={_get(doc, 'xml_file', '–')}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#1a0dab',
                            textDecoration: 'underline',
                          }}
                        >
                          View XML
                        </a>
                      </div>
                      {/* Empty cells for alignment */}
                      <div />
                      <div />
                    </DetailsRow>
                  </div>
                </Conditional>

                <Conditional if={getTitle(doc) === 'Driving Licence Details'}>
                  <div className="mt-3">
                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">DL Number:</Text>
                      </div>
                      <div>{_get(doc, 'dl_number', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Name:</Text>
                      </div>
                      <div>{_get(doc, 'name', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Gender:</Text>
                      </div>
                      <div>{_get(doc, 'gender', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Date of Birth:</Text>
                      </div>
                      <div>{_get(doc, 'dob', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Issued At:</Text>
                      </div>
                      <div>{_get(doc, 'issued_at', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Issue Date:</Text>
                      </div>
                      <div>{_get(doc, 'issue_date', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Expiry Date:</Text>
                      </div>
                      <div>{_get(doc, 'expiry_date', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Present Address:</Text>
                      </div>
                      <div>{_get(doc, 'present_address', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Permanent Address:</Text>
                      </div>
                      <div>{_get(doc, 'permanent_address', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Care Of:</Text>
                      </div>
                      <div>{_get(doc, 'care_of', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Photo Link:</Text>
                      </div>
                      <div>
                        {_get(doc, 'photo_link', '–') ? (
                          <Button
                            className="p-0"
                            fluid
                            link
                            onClick={() =>
                              openBase64ImageInNewTab(
                                `data:image/png;base64,${_get(doc, 'photo_link', '–')}`,
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
                        )}
                      </div>
                      <div>
                        <Text color="bodyLight">Reference ID:</Text>
                      </div>
                      <div>{_get(doc, 'reference_id', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">Status:</Text>
                      </div>
                      <div>{_get(doc, 'status', '–') || '–'}</div>
                      <div>
                        <Text color="bodyLight">Verification ID:</Text>
                      </div>
                      <div>{_get(doc, 'verification_id', '–') || '–'}</div>
                    </DetailsRow>

                    <DetailsRow>
                      <div>
                        <Text color="bodyLight">XML File:</Text>
                      </div>
                      <div>
                        <a
                          href={_get(doc, 'xml_file', '–')}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#1a0dab',
                            textDecoration: 'underline',
                          }}
                        >
                          View XML
                        </a>
                      </div>
                      <div>
                        <Text color="bodyLight">Categories:</Text>
                      </div>
                      <div>
                        {_get(doc, 'categories', [])?.map((category, idx) => (
                          <Space
                            key={idx}
                            alignItems="flex-start"
                            gap={2}
                            className="mb-1"
                          >
                            <Text>{idx + 1}.</Text>
                            <Space direction="column" gap={1}>
                              <Text>
                                Class of Vehicle: {_get(category, 'class_of_vehicle', '–') || '–'}
                              </Text>
                              <Text>Description: {_get(category, 'description', '–') || '–'}</Text>
                              <Text>Issue Date: {_get(category, 'issue_date', '–') || '–'}</Text>
                            </Space>
                          </Space>
                        ))}
                      </div>
                    </DetailsRow>
                  </div>
                </Conditional>
              </Accordion.Content>
            </StyledAccordionContent>
          </StyledAccordion>
        ) : null,
      )}
    </>
  );
};

export default DocumentDetailsAccordion;
