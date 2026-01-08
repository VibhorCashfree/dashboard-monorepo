import React from 'react';
import { withTheme } from 'styled-components';
import * as Icons from '../CustomIcons';

export interface IconProps {
  name: string;
  verticalAlign?: 'bottom' | 'middle' | 'top';
  fill?: string;
  theme?: any;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const iconMap: Record<string, React.FC<any>> = {
  add: Icons.Add,
  'auto-collect': Icons.AutoCollect,
  baas: Icons.Bass,
  burger: Icons.Burger,
  'burger-close': Icons.BurgerClose,
  'chevron-down': Icons.ChevronDown,
  'chevron-left': Icons.ChevronLeft,
  'chevron-right': Icons.ChevronRight,
  'chevron-up': Icons.ChevronUp,
  copy: Icons.Copy,
  cross: Icons.Cross,
  crossborder: Icons.CrossBorder,
  csv: Icons.Csv,
  delete: Icons.Delete,
  download: Icons.Download,
  ellipsis: Icons.Ellipsis,
  info: Icons.Info,
  'in-out': Icons.InOut,
  logout: Icons.Logout,
  minus: Icons.Minus,
  'open-link': Icons.OpenLink,
  payout: Icons.Payout,
  pencil: Icons.Pencil,
  pg: Icons.Pg,
  profile: Icons.Profile,
  refresh: Icons.Refresh,
  send: Icons.Send,
  settings: Icons.Settings,
  'status-page': Icons.StatusPage,
  stop: Icons.Stop,
  subscriptions: Icons.Subscriptions,
  switch: Icons.Switch,
  test: Icons.Test,
  tick: Icons.Tick,
  'circle-tick': Icons.CircleTick,
  'tick-outline': Icons.TickOutline,
  'top-right-arrow': Icons.TopRightArrow,
  'verification-suite': Icons.VerificationSuite,
  xls: Icons.Xls,
  // VS Specific names (aliases or unique)
  developers: (Icons as any).Developers || Icons.Settings, // Fallback if not yet migrated
  settlements: (Icons as any).Settlements,
  Aadhaar: (Icons as any).Aadhaar,
  BAV: (Icons as any).Bav,
  UPI: (Icons as any).Upi,
  PAN: (Icons as any).Pan,
  AADHAAR_OCR: (Icons as any).AadhaarOCR,
  PAN_OCR: (Icons as any).PanOCR,
  SecureIdentityVerification: (Icons as any).SecureIdentityVerification,
  Cashfree: (Icons as any).Cashfree,
  MobileKeypad: (Icons as any).MobileKeypad,
  'navigate-right': (Icons as any).NavigateRight,
  reset: (Icons as any).Reset,
  'plus-edge': (Icons as any).PlusEdge,
  'primary-plus': (Icons as any).PrimaryPlus,
  condition: (Icons as any).Condition,
  mobile: (Icons as any).Mobile,
  'circular-left': (Icons as any).CircularChevronLeft,
  'circular-right': (Icons as any).CircularChevronRight,
  'send-kyc-forms': (Icons as any).SendKycForm,
  'api-twotone': (Icons as any).ApiTwoTone,
  'create-new': (Icons as any).CreateNew,
  'employee-onboarding': (Icons as any).EmployeeOnboarding,
  others: (Icons as any).LendingUser,
  undo: (Icons as any).Undo,
  redo: (Icons as any).Redo,
  APIKey: (Icons as any).APIKey,
  Thunder: (Icons as any).Thunder,
  Share: (Icons as any).Share,
  Certified: (Icons as any).Certified,
  vault: (Icons as any).Vault,
  'cashfree-logo': (Icons as any).CashfreeLogo,
  drag: (Icons as any).Drag,
  plus: (Icons as any).Plus,
};

const Icon = ({ name, verticalAlign = 'middle', ...props }: IconProps) => {
  const Component = iconMap[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <Component
      style={{ verticalAlign, ...props.style }}
      role={name}
      data-testid={name}
      {...props}
    />
  );
};

export default withTheme(Icon);
