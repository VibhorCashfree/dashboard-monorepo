import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@cashfree-intl/coherent';

function NavigationBar({
  navigationOptions,
  handleNavigationClick,
  activeNavigation,
  ...props
}) {
  return (
    <Tab
      menu={{
        secondary: true,
        pointing: true,
      }}
      panes={navigationOptions.map(n => ({
        menuItem: n,
      }))}
      onTabChange={(e, data) =>
        handleNavigationClick(e, {
          name: navigationOptions[data.activeIndex],
          activeIndex: data.activeIndex,
        })
      }
      activeIndex={navigationOptions.indexOf(activeNavigation)}
      {...props}
    />
  );
}

NavigationBar.propTypes = {
  navigationOptions: PropTypes.array.isRequired,
  handleNavigationClick: PropTypes.func.isRequired,
  activeNavigation: PropTypes.string.isRequired,
};

export default memo(NavigationBar);
