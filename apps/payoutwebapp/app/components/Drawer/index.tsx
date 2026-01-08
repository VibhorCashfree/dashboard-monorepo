import { Drawer as SharedDrawer } from '@dashboard-monorepo/shared';
import { StyledOverlay, AlertBody } from './styled';

interface DrawerComponent extends React.FC<any> {
  AlertBody: typeof AlertBody;
}

const Drawer = SharedDrawer as DrawerComponent;
Drawer.AlertBody = AlertBody;

// Re-export styled for backward compatibility
export { StyledOverlay, AlertBody };

export default Drawer;
