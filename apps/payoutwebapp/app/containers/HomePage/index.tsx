import React, { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate,
  useMatch,
  useLocation,
} from 'react-router-dom';
import { ShellV2 } from '@cashfree-intl/coherent';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

// Factories
import PageFactory from 'factories/PageFactory';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Components
import Alert from 'components/Alert';
import ErrorBoundary from 'components/ErrorBoundary';

// Utils
import Emitter from 'utils/emitter';
import Analytics from 'utils/analytics';
import { getMenuItems } from './utils';

// Styled
import { MainContent } from './styled';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { merchantDetails, featureFlags } = useMerchant();
  const { preferences } = useAccount();

  const [hasLocalError, setHasLocalError] = useState(false);
  const [hasGlobalError, setHasGlobalError] = useState(false);

  const match = useMatch(`/:main/:others`);
  const previousMatch = usePrevious(match);

  const { activePageId } = useParams<{ activePageId: string }>();

  const pathName = location.pathname;

  useEffect(() => {
    Emitter.on('LOCAL_ERROR', function () {
      setHasLocalError(true);

      setTimeout(() => {
        setHasLocalError(false);
      }, 3000);
    });

    Emitter.on('GLOBAL_ERROR', function () {
      setHasGlobalError(true);
    });

    return () => {
      Emitter.off('LOCAL_ERROR');
      Emitter.off('GLOBAL_ERROR');
    };
  }, []);

  useEffect(() => {
    if (match && previousMatch) {
      Emitter.emit('MENU_CHANGE');
    }
  }, [match]);

  const handleMenuItemClick = (selectedMenu: string): void => {
    navigate(`../${selectedMenu}`);

    if (hasGlobalError) {
      navigate(0);
    }

    if (!match) {
      Emitter.emit('MENU_CHANGE');
    }
  };

  if (!activePageId) {
    return null;
  }

  const items = getMenuItems(
    merchantDetails.cfProductStatus,
    featureFlags,
    preferences,
  );

  const activeItem: string = window.location.pathname
    .split('/')
    .slice(2, 4)
    .join('/');

  const handleMount = () => {
    Analytics.track(`Page_Viewed_${activeItem}`, {
      actionType: 'view',
    });

    Analytics.track(`Page_Scrolled_${activeItem}`, {
      scrollTrackingId: 'dashboard_page_scroll',
      scrollSelector: '.children-wrapper',
      actionType: 'scroll',
    });
  };

  let hasSidebar = true;

  const splittedPathname = pathName.split('/');
  if (splittedPathname.includes('payout-protect-pricing')) {
    hasSidebar = false;
  }

  return (
    <MainContent>
      {hasSidebar && (
        <ShellV2.MainLayout.Sidebar
          activeItem={activeItem}
          sidebarItems={items}
          onMenuItemClick={handleMenuItemClick}
        />
      )}

      <ShellV2.MainLayout.MainContent
        style={{ overflowX: 'hidden' }}
        onMount={handleMount}
      >
        <div className="children-wrapper">
          {hasLocalError && (
            <Alert className="mb-2" type="danger" bordered rounded>
              <Alert.Content size="md">
                An unknown error occurred; we&apos;re working to fix it. Please
                try again later.
              </Alert.Content>
            </Alert>
          )}
          <ErrorBoundary>
            <PageFactory componentName={activePageId} />
          </ErrorBoundary>
        </div>
      </ShellV2.MainLayout.MainContent>
    </MainContent>
  );
};

export default HomePage;
