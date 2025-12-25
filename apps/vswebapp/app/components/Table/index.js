import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@cashfree-intl/coherent';
import _noop from 'lodash/noop';

export const TableContainer = ({
  tableHeadings,
  formattedRowData,
  handleRowClick = _noop,
  fixed,
  singleLine,
}) => (
  <Table fixed={fixed} singleLine={singleLine} $depth>
    <TableHeader>
      <TableRow>
        {tableHeadings.map(heading => (
          <TableHeaderCell
            key={heading.key}
            $colWidth={heading.width}
            textAlign={heading.align}
          >
            {heading.displayName}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {formattedRowData.map(row => (
        <TableRow key={row.id} onClick={handleRowClick(row)}>
          {tableHeadings.map(heading => {
            const cellValue = row[heading.key];

            return (
              <TableCell key={heading.key} textAlign={heading.align}>
                {typeof cellValue === 'function' ? cellValue() : cellValue}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

TableContainer.propTypes = {
  tableHeadings: PropTypes.array.isRequired,
  formattedRowData: PropTypes.array.isRequired,
  handleRowClick: PropTypes.func,
  fixed: PropTypes.bool,
  singleLine: PropTypes.bool,
};

export default TableContainer;
