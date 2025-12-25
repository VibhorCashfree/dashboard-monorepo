// Containers
import ReportsContainer from 'containers/Reports';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import { MENU, LABEL_BY_MENU } from 'constants/menuItems';

export default withReadPermission(ReportsContainer, {
  code: 2600,
  description: `access ${LABEL_BY_MENU[MENU.REPORTS]}`,
});
