import { logout } from 'services/accounts';

export const MENU_ITEMS = [
  {
    key: 'invoice',
    value: 'Invoice',
    onClick: () => {
      setTimeout(() => {
        window.location.href = `${process.env.COMMON_APP_URL}/profile/invoice`;
      }, 50);
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
