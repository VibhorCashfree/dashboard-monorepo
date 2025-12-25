import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

// Hooks
import useToggle from 'hooks/useToggle';

// Types
import type { Props } from './types';

const Collapse = ({ label = '', children }: Props) => {
  const [value, setToggle] = useToggle(false);

  return (
    <>
      <Button link className="p-0 mb-2" onClick={() => setToggle()}>
        {value ? 'Hide' : 'Show'} {label}{' '}
        <Icon name={value ? 'chevron-down' : 'chevron-up'} />
      </Button>
      <div
        className={classNames({
          hide: !value,
        })}
      >
        {children}
      </div>
    </>
  );
};

Collapse.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Collapse;
