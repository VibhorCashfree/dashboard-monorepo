import React from 'react';
import _noop from 'lodash/noop';
import { Copy } from '@dashboard-monorepo/shared';

type Props = {
  value: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const PayoutCopy = ({ value, onClick = _noop }: Props) => (
  <Copy value={value} onClick={onClick} />
);

export default PayoutCopy;
