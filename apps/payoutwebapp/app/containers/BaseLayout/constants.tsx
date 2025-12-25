// Services
import { logout } from 'services/accounts';

export const menuItems = [
  {
    key: 'invoice',
    value: 'Invoice',
    onClick: () => {
      window.location.href = `${process.env.DASHBOARD_URL}/${process.env.COMMON_APP_BASE_PATH}/profile/invoice`;
    },
  },
  {
    key: 'logout',
    value: 'Sign Out',
    onClick: () => {
      logout();
    },
  },
];
