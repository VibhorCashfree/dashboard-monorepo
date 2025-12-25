import { DefaultTheme } from 'styled-components';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }

  interface WithTheme {
    theme: DefaultTheme;
  }

  interface PaginationQueryObj {
    size: number;
    previousId?: string | number;
    lastId?: string | number;
    [key: string]: any;
  }

  type AnyObject = Record<string, any>;
  type StringObject = Record<string, string>;

  type Option = {
    label?: string;
    description?: string;
    disabled?: boolean;
    text: string;
    value: any;
    icon?: React.ReactNode;
  };

  type FsBalance = {
    balance: string;
    availableBalance: string;
    fundsOnHold: string;
    overdraft: string;
    lastUpdated: string;
  };

  type DateRangeValue = { displayText: string; range: [Date, Date] };

  type AccountSlabCharge = {
    modeId: number;
    lBound: string;
    uBound: string;
    charge: string;
  };

  type FsSlabCharge = {
    id: number;
    modeId: number;
    lBound: string;
    uBound: string;
    charge: string;
  };

  type ModeRate = {
    id: number;
    floor: string;
    tdr: string;
    fixedCharge: string;
    cappedAt: string;
    perLakh: string;
    isQueued: number;
    modeId: number;
    mode: string;
    status: string;
  };

  type AccountConfigMode = {
    ID: number;
    IsQueued: number;
    ModeID: number;
    Mode: string;
    Status: string;
    Floor: string;
    Tdr: string;
    FixedCharge: string;
    CappedAt: string;
    PerLakh: string;
  };

  type TableData = { data: AnyObject[]; count: number; hasNext: boolean };

  type RowAction<T> = {
    key: T;
    text: string;
    type?: string;
    primary?: boolean;
    danger?: boolean;
    value: T;
    image?: (props: AnyObject) => JSX.Element;
  };

  type Account = {
    accountId: number;
    accountType: string;
    accountName: string;
    phone: string;
    rechargeAccount: string;
    availableBalance: string;
  };

  type Weightage = {
    id: number;
    name: string;
    weightage: string;
  };

  type Schema = {
    properties: {
      [key: string]: {
        type: string;
        displayName?: string;
        description?: string;
        extensions?: string[];
      };
    };
    required?: string[];
    allOf?: { required?: string[] }[];
  };

  type FieldTransform = {
    property: string;
    type: string;
    label: string;
    description?: string;
    extensions?: string[];
    required: string;
  };

  type ApprovalRejectionItem = {
    name: string;
    type: 'success' | 'warning' | 'danger' | 'info';
    date: string | Date;
  };

  type AccountInfo = {
    name: string;
    phone: string;
    email: string;
    state: string;
    address: string;
    city: string;
    bankAccount: string;
    ifsc: string;
    accountHolder: string;
    isActive: string;
    bankname: string;
    id: number;
  };

  type Statement = {
    id: number;
    txTime: string;
    eventType: string;
    maskedEventType: string;
    event: string;
    amount: string;
    remarks: string;
    closingBalance: string;
  };

  type AccountManager = {
    adminEmail: string;
    adminName: string;
    adminPhone: string;
    profileImage: string;
  };

  type ReportFile = { name: string; file: string; fileUrl: string };

  type AuthSettings = {
    data: {
      phone?: string;
      email?: string;
      countryCode: string;
      authType: 'OTP' | 'G2FA';
      otpChannel: string[];
    };
    status: string;
    message: string;
  };
}
