declare module '@cashfree-intl/coherent';
declare module '@cashfree-intl/auth';
declare module '@cashfree-intl/analytics';
declare module 'recharts';
declare module 'react-helmet';

declare module 'CommonModule/NotificationPopover';
declare module 'CommonModule/NotificationBar';
declare module 'CommonModule/NotificationProvider';
declare module 'RiskShieldWebApp/RiskShield';
declare module 'RiskShieldWebApp/ApproveAndWhiteList';
declare module 'RiskShieldWebApp/PayoutProtectImpact';

declare module 'images/semantic-icons/*';

/* custom declarations */
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module 'components/StatusLabel' {
  interface StatusLabelProps {
    className?: string;
    children: STATUS;
    animation?: boolean;
    filled?: boolean;
  }

  const StatusLabel: React.FC<StatusLabelProps>;

  export default StatusLabel;
}
