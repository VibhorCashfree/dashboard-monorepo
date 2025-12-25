import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  ModalContent,
  ModalDescription,
  Image,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@cashfree-intl/coherent';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer, Divider } from 'styled/common';

const PANExistsModal = ({ type, title, data, onClose }) => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <ModalContent>
        <ModalDescription>
          <div className="mt-1 text-center">
            <Image inline src={getAlertIcon(type)} />
            <Text variant="h16" strong className="my-3">
              {title}
            </Text>
            <Table basic="very" compact>
              <TableBody>
                <TableRow>
                  <TableCell width={4}>
                    <Text color="bodyLight">Name Provided</Text>
                  </TableCell>
                  <TableCell width={4}>{data.nameProvided || '–'}</TableCell>
                  <TableCell width={4}>
                    <Text color="bodyLight">PAN</Text>
                  </TableCell>
                  <TableCell width={4}>{data.pan}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {type === 'success' && (
              <>
                <Divider contain />
                <Table basic="very" compact>
                  <TableBody>
                    <TableRow>
                      <TableCell width={4}>
                        <Text color="bodyLight">Registered Name</Text>
                      </TableCell>
                      <TableCell width={4}>{data.registeredName}</TableCell>
                      <TableCell width={4}>
                        <Text color="bodyLight">PAN Type</Text>
                      </TableCell>
                      <TableCell width={4}>{data.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={4}>
                        <Text color="bodyLight">PAN Ref. ID</Text>
                      </TableCell>
                      <TableCell width={4}>{data.referenceId}</TableCell>
                      {preferences?.pan?.nameMatch && (
                        <>
                          <TableCell width={4}>
                            <Text color="bodyLight">Name Match Score</Text>
                          </TableCell>
                          <TableCell width={4}>
                            {data.nameMatchScore || '–'}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
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
    </>
  );
};

PANExistsModal.propTypes = {
  type: PropTypes.oneOf(['success', 'info']),
  title: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PANExistsModal;
