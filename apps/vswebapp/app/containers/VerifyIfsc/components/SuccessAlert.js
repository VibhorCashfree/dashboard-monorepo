import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from '@cashfree-intl/coherent';

// Utils
import getAlertIcon from 'utils/getAlertIcon';
import { getSupportedModes } from '../utils';

// Styled
import { Divider, BtnContainer } from 'styled/common';

const SuccessAlert = ({ data }) => (
  <>
    <Divider contain />

    <BtnContainer textAlign="center">
      <Image inline src={getAlertIcon('success')} />
      <Text variant="h20" className="mt-2">
        Valid IFSC
      </Text>
    </BtnContainer>

    <Table basic="very" compact>
      <TableBody>
        <TableRow>
          <TableCell className="text-grey px-0">Bank Name</TableCell>
          <TableCell className="pr-0">{data.bank || '–'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-grey px-0">Branch Name</TableCell>
          <TableCell className="pr-0">{data.branch || '–'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-grey px-0">Address</TableCell>
          <TableCell className="pr-0 text-wrap">
            {data.address || '–'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-grey px-0">City</TableCell>
          <TableCell className="pr-0">{data.city || '–'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-grey px-0">State</TableCell>
          <TableCell className="pr-0">{data.state || '–'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-grey px-0">IFSC Code</TableCell>
          <TableCell className="pr-0">{data.ifsc || '–'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-grey px-0">MICR Code</TableCell>
          <TableCell className="pr-0">{data.micr || '–'}</TableCell>
        </TableRow>
        {data.swift_code && (
          <TableRow>
            <TableCell className="text-grey px-0">SWIFT Code</TableCell>
            <TableCell className="pr-0">{data.swift_code || '–'}</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell className="text-grey px-0">Supported Modes</TableCell>
          <TableCell className="pr-0">{getSupportedModes(data)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>
);

SuccessAlert.propTypes = {
  data: PropTypes.object,
};

export default SuccessAlert;
