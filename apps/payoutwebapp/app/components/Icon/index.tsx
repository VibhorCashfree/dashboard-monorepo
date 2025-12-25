import React from 'react';
import { withTheme } from 'styled-components';

// Types
import type { StyledProps } from './types';

// Images
import {
  Add,
  AutoCollect,
  Bass,
  Burger,
  BurgerClose,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleTick,
  Copy,
  Cross,
  CrossBorder,
  Csv,
  Delete,
  Download,
  Ellipsis,
  Info,
  InOut,
  Logout,
  Minus,
  OpenLink,
  Payout,
  Pencil,
  Pg,
  Profile,
  Refresh,
  Send,
  Settings,
  StatusPage,
  Stop,
  Subscriptions,
  Switch,
  Test,
  Tick,
  TickOutline,
  TopRightArrow,
  VerificationSuite,
  Xls,
} from '../CustomIcons';

export const map = {
  add: Add,
  'auto-collect': AutoCollect,
  baas: Bass,
  burger: Burger,
  'burger-close': BurgerClose,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  copy: Copy,
  cross: Cross,
  crossborder: CrossBorder,
  csv: Csv,
  delete: Delete,
  download: Download,
  ellipsis: Ellipsis,
  info: Info,
  'in-out': InOut,
  logout: Logout,
  minus: Minus,
  'open-link': OpenLink,
  payout: Payout,
  pencil: Pencil,
  pg: Pg,
  profile: Profile,
  refresh: Refresh,
  send: Send,
  settings: Settings,
  'status-page': StatusPage,
  stop: Stop,
  subscriptions: Subscriptions,
  switch: Switch,
  test: Test,
  tick: Tick,
  'circle-tick': CircleTick,
  'tick-outline': TickOutline,
  'top-right-arrow': TopRightArrow,
  'verification-suite': VerificationSuite,
  xls: Xls,
};

const Icon = ({ name, verticalAlign = 'middle', ...props }: StyledProps) => {
  const Component = map[name];

  return (
    <Component
      style={{ verticalAlign }}
      role={name}
      data-testid={name}
      {...props}
    />
  );
};

export default withTheme(Icon);
