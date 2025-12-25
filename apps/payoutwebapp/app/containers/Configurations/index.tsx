import React from 'react';
import { Text, Popup, CustomAccordion } from '@cashfree-intl/coherent';
import _identity from 'lodash/identity';

// Hocs
import withReadPermission from 'hocs/withReadPermission';
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Icon from 'components/Icon';
import DefaultWeightage from './components/DefaultWeightage';
import ModeWeightage from './components/ModeWeightage';

const Configurations: React.FC = () => {
  const { preferences } = useAccount();

  return (
    <>
      <PageHeader>
        Router - {LABEL_BY_SUBMENU[SUBMENU.CONFIGURATIONS]}
      </PageHeader>
      <MetaTags
        title={`Router - ${LABEL_BY_SUBMENU[SUBMENU.CONFIGURATIONS]}`}
      />

      <Text className="mb-2" color="bodyLight">
        Configure your transfer routing rules here and manage them.
      </Text>

      <div style={{ width: 600 }}>
        <CustomAccordion
          title={null}
          contents={[
            {
              index: 0,
              title: (
                <Text variant="h16">
                  Default Routing
                  <Popup
                    position="right center"
                    content="Define what percentage of transfers should be routed through each fund
          source. This is applicable only when percentage or fund source is not
          specified during transfers"
                    trigger={
                      <span>
                        <Icon
                          name="info"
                          className="pointer ml-1"
                          verticalAlign="bottom"
                        />
                      </span>
                    }
                  />
                </Text>
              ),
              content: <DefaultWeightage />,
            },
            preferences.enableRouter && preferences.enableModeRouting
              ? {
                  index: 1,
                  title: (
                    <Text variant="h16">
                      Mode Weightage Routing
                      <Popup
                        position="right center"
                        content="Define what percentage of transfers should be routed through each fund source for each mode. This is applicable when fund source is not specified during transfers."
                        trigger={
                          <span>
                            <Icon
                              name="info"
                              className="pointer ml-1"
                              verticalAlign="bottom"
                            />
                          </span>
                        }
                      />
                    </Text>
                  ),
                  content: <ModeWeightage />,
                }
              : null,
          ].filter(_identity)}
        />
      </div>
    </>
  );
};

export default withErrorBoundary(
  withReadPermission(Configurations, {
    code: 27001,
    description: `access ${LABEL_BY_MENU[MENU.FUND_SOURCES]}`,
  }),
);
