import React from 'react';
import classNames from 'classnames';
import { Text } from '@cashfree-intl/coherent';
import _isFunction from 'lodash/isFunction';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { DetailsRow } from 'styled/common';

// Types
import type { Props } from './types';

const DetailsFormatBlock = ({ title, renderBy }: Props) => {
  const labels = Object.keys(renderBy);

  if (labels.length === 0) {
    return null;
  }

  let items: any[] = [];

  for (let index = 0; index < labels.length; index = index + 2) {
    const firstLabel = labels[index];
    const firstValue = renderBy[firstLabel];

    const secondLabel = labels[index + 1];
    const secondValue = renderBy[secondLabel];

    items = items.concat(
      <DetailsRow
        className={classNames({
          'm-0': index >= labels.length - 2, // for last <DetailsRow />
        })}
      >
        <div>
          <Text color="bodyLight">{firstLabel}</Text>
        </div>
        <div>
          <Text className="text-wrap">
            {_isFunction(firstValue) ? firstValue() : firstValue}
          </Text>
        </div>
        <div>
          <Text color="bodyLight">{secondLabel}</Text>
        </div>
        <div>
          <Text className="text-wrap">
            {_isFunction(secondValue) ? secondValue() : secondValue}
          </Text>
        </div>
      </DetailsRow>,
    );
  }

  return (
    <>
      <Text variant="h16" strong className="my-3">
        {title}
      </Text>

      {items}
    </>
  );
};

export default withErrorBoundary(DetailsFormatBlock);
