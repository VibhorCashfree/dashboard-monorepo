import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow, TableCell } from '@cashfree-intl/coherent';
import _isUndefined from 'lodash/isUndefined';

// Utils
import { formatAmount } from 'utils/common';

const ApprovalsModalInfo = ({ fileName, count, amount }) => (
  <Table basic="very" compact className="mt-3">
    <TableBody>
      {!_isUndefined(fileName) && (
        <TableRow>
          <TableCell width={4} className="text-grey">
            File Name
          </TableCell>
          <TableCell>{fileName}</TableCell>
        </TableRow>
      )}
      <TableRow>
        <TableCell width={4} className="text-grey">
          Count
        </TableCell>
        <TableCell>{count}</TableCell>
      </TableRow>
      {!_isUndefined(amount) && (
        <TableRow>
          <TableCell width={4} className="text-grey">
            Amount
          </TableCell>
          <TableCell>{formatAmount(amount)}</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

ApprovalsModalInfo.propTypes = {
  fileName: PropTypes.string,
  count: PropTypes.string,
  amount: PropTypes.string,
};

export default ApprovalsModalInfo;
