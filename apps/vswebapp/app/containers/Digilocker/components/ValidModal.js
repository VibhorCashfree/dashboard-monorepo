import React, { useState } from 'react';
import {
  Accordion,
  Button,
  Icon,
  Table,
  Text,
  AlertModal,
  Conditional,
  Space,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

import { openBase64ImageInNewTab } from 'utils/image';

// Styled
import { StyledAccordion, StyledAccordionContent } from '../styled';

const ValidModal = ({ modalData, handleClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const accordionActive = isActive =>
    isActive ? 'chevron-up' : 'chevron-down';

  const getTitle = data => {
    if (data.uid) {
      return 'Aadhaar Details';
    }

    if (data.pan) {
      return 'Pan Details';
    }

    if (data.dl_number) {
      return 'Driving Licence Details';
    }

    return 'Details';
  };

  return (
    <AlertModal
      type="success"
      title="Document Details"
      closeText="Okay"
      onClose={() => handleClose()}
      maxWidth="600"
    >
      {modalData?.map((doc, index) =>
        !doc.error ? (
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
                  <Table basic="very" compact className="mt-3">
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">Aadhaar Number:</Text>
                        </Table.Cell>
                        <Table.Cell>
                          XXXX XXXX {_get(doc, 'uid')?.slice(8)}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">Name:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.name}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">Date of Birth:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.dob}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Gender</Text>
                        </Table.Cell>
                        <Table.Cell>
                          {doc.gender === 'M' ? 'Male' : 'Female'}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Care Of / Guardian</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.care_of}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Photo Link</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            {doc.photo_link ? (
                              <Button
                                className="p-0"
                                fluid
                                link
                                onClick={() =>
                                  openBase64ImageInNewTab(`data:image/png;base64,${doc.photo_link}`)
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
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Reference ID</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.reference_id}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Status</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.status}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Verification ID</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.verification_id}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">XML File</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href={doc.xml_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#1a0dab',
                              textDecoration: 'underline',
                            }}
                          >
                            View XML
                          </a>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">Address:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.address}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Conditional>
                <Conditional if={getTitle(doc) === 'Pan Details'}>
                  <Table basic="very" compact className="mt-3">
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">PAN Number:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.pan}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">Name:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.name_pan_card}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">Date of Birth:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.dob}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Gender</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.gender}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={5}>
                          <Text color="bodyLight">Type:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.type}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Reference ID</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.reference_id}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Status</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.status}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Verification ID</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.verification_id}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">XML File</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href={doc.xml_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#1a0dab',
                              textDecoration: 'underline',
                            }}
                          >
                            View XML
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Conditional>
                <Conditional if={getTitle(doc) === 'Driving Licence Details'}>
                  <Table basic="very" compact fixed className="mt-3">
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">DL Number:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.dl_number}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Name:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.name}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Gender</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.gender}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Date of Birth:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.dob}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Issued At:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.issued_at}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Issue Date:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.issue_date}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Expiry Date:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.expiry_date}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Present Address:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.present_address}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Permanent Address:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.permanent_address}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Care Of:</Text>
                        </Table.Cell>
                        <Table.Cell>{doc?.care_of}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Photo Link</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            {doc.photo_link ? (
                              <Button
                                className="p-0"
                                fluid
                                link
                                onClick={() =>
                                  openBase64ImageInNewTab(`data:image/png;base64,${doc.photo_link}`)
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
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Reference ID</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.reference_id}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Status</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.status}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">Verification ID</Text>
                        </Table.Cell>
                        <Table.Cell>{doc.verification_id}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell width={6}>
                          <Text color="bodyLight">XML File</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href={doc.xml_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#1a0dab',
                              textDecoration: 'underline',
                            }}
                          >
                            View XML
                          </a>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Text color="bodyLight">Categories:</Text>
                        </Table.Cell>
                        <Table.Cell>
                          {doc?.categories?.map((category, idx) => (
                            <Space
                              key={idx}
                              alignItems="flex-start"
                              gap={2}
                              className="mb-1"
                            >
                              <Text>{idx + 1}.</Text>
                              <Space direction="column" gap={1}>
                                <Text>
                                  Class of Vehicle: {category.class_of_vehicle}
                                </Text>
                                <Text>Description: {category.description}</Text>
                                <Text>Issue Date: {category.issue_date}</Text>
                              </Space>
                            </Space>
                          ))}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Conditional>
              </Accordion.Content>
            </StyledAccordionContent>
          </StyledAccordion>
        ) : null,
      )}
    </AlertModal>
  );
};

export default ValidModal;
