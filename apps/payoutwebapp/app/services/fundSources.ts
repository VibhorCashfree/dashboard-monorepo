// Adapters
import listingAdapter from 'adapters/listing';
import fundSourceAdapter from 'adapters/fundSource';
import fundSourcesAdapter from 'adapters/fundSources';
import rechargeAccountsAdapter from 'adapters/rechargeAccounts';
import pendingRechargesAdapter from 'adapters/pendingRecharges';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

// Constants
import { CURRENCY } from 'constants/common';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import {
  CONNECTED_BANK,
  VERIFICATION_STAGE,
} from 'containers/BankAccountSelfServe/constants';

export const upload = async (body: any) => {
  try {
    type Response = {
      fileKey: string;
    };

    const response: unknown = await http.post(
      'payout/paymentInstruments/statement',
      body,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      },
    );

    return (response as Response).fileKey;
  } catch (error) {
    return {
      error,
    };
  }
};

export const create = async (body: {
  fsDisplayType: FS_DISPLAY_TYPE;
  displayName: string;
  bank: {
    leadId?: string;
    supportedModes?: string[];
    accountHolderName?: string;
    ifsc?: string;
    aggregator?: string;
    bankName: string;
    bankAccount: string;
  };
}) => {
  try {
    type Response = { fundSourceId: number };

    const response: unknown = await http.post(
      'payout/paymentInstruments',
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const internalFundTransfer = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/internalFundTransfer', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const createVirtualAccount = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/connected-virtual-account', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const connect = async (id: number, body?: AnyObject) => {
  try {
    type Response = {
      fundSourceId: number;
      status: string;
      data?: {
        url: string;
        payload: string;
        contentType: string;
        method: string;
      };
      rawBankData?: {
        request: string;
        response: string;
      } | null;
      verificationData?: {
        transferType: string;
        request: string;
        response: string;
        verified: boolean;
        bankUrl: string;
        reportUrl: string;
      };
    };

    const response: unknown = await http.post(
      `payout/paymentInstruments/${id}/connect`,
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const recharge = async (body: AnyObject) => {
  try {
    const response = await http.post(
      'payout/paymentInstruments/credit-card/recharge',
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const addBalance = async (
  paymentInstrumentId: string,
  body: AnyObject,
) => {
  try {
    type Response = { message: string };

    const response: unknown = await http.post(
      `payout/connected-wallet/${paymentInstrumentId}/recharge`,
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateDetails = async (id: number, body: AnyObject) => {
  try {
    const response = await http.put(`payout/paymentInstruments/${id}`, body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAll = async () => {
  try {
    type Response = Array<{
      fundSourceId: number;
      fsType: string;
      fsDisplayType: string;
      paymentInstrumentId: string;
      displayName: string;
      fsDescription?: string;
      accountHolderName: string;
      isDefault: boolean;
      isPayoutWallet: boolean;
      isMainAccount: boolean;
      bankAccount: string;
      ifsc: string;
      cfBankId: number;
      cfBankName: string;
      connBankName: string;
      cfBankType: string;
      cfCredId: number;
      cfGatewayId: number;
      preferences: Array<{
        property: string;
        value: string;
      }>;
      fsBalance: FsBalance;
      supportedModes: Array<string>;
      status: string;
      addedOn: string;
      product: string;
      currency: CURRENCY;
      modeRates: ModeRate[];
      fsSlabCharges: Array<FsSlabCharge>;
      virtualAccount?: string;
    }>;

    const response: unknown = await http.get(
      'payout/paymentInstruments?source=DASHBOARD&showAll=true&product=CSP,ONE_ESCROW',
    );

    return fundSourcesAdapter.from(response as Response);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getVirtualAccounts = async () => {
  try {
    type Response = AnyObject[];

    const response: unknown = await http.get(
      'payout/paymentInstruments?source=DASHBOARD&showAll=true&product=ONE_ESCROW',
    );

    return fundSourcesAdapter.from(response as Response);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllFS = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = AnyObject[];

    const response: unknown = await http.get(
      `payout/paymentInstruments?source=DASHBOARD&${queryStr}`,
    );

    return listingAdapter.from(response as Response, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllFSCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/paymentInstruments/count?source=DASHBOARD&${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async (id: number) => {
  try {
    const response = await http.get(`payout/paymentInstruments/${id}`);

    return fundSourceAdapter.from(response);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getYesBusinessType = async () => {
  try {
    type Response = {
      businessType: string;
      connectAllowed: boolean;
    };

    const response: unknown = await http.get(
      'payout/paymentInstruments/eligibility/yesbank',
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const remove = async (id: number) => {
  try {
    type Response = {
      message: string;
    };

    const response: unknown = await http.delete(
      `payout/paymentInstruments/${id}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getStatements = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      batches: Statement[];
    };

    const response: unknown = await http.get(
      `payout/accountStatement?${queryStr}`,
    );

    return listingAdapter.from((response as Response).batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getStatementsCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/accountStatement/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getPendingRecharges = async (id: number) => {
  try {
    type Response = {
      fundSourceId: number;
      Utr: string;
      Amount: number;
      RemitterName: string;
      RemitterAccount: string;
      RemitterIfsc: string;
      AddedOn: string;
      ProcessedOn: string;
    }[];

    const response: unknown = await http.get(
      'payout/recharges/pendingApproval',
    );

    return pendingRechargesAdapter.from((response as Response) || [], id);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRechargeHistory = async (
  id: number,
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      cursor: string;
      pageSize: number;
      data: AnyObject[];
    };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/recharges?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRechargeHistoryCount = async (
  id: number,
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { startTime: string; result: number; endTime: string };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/recharges/count?${queryStr}`,
    );

    return { count: (response as Response).result };
  } catch (error) {
    return {
      error,
    };
  }
};

export const getWeightage = async (queryObj: AnyObject) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = Weightage[];

    const response: unknown = await http.get(
      `payout/paymentInstruments/weightage?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateWeightage = async (body: AnyObject) => {
  try {
    const response = await http.post(
      'payout/paymentInstruments/weightage',
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBalance = async (paymentInstrumentId: string) => {
  try {
    const response: unknown = await http.get(
      `payout/paymentInstruments/${paymentInstrumentId}/balance`,
    );

    return response as FsBalance;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getEvent = async (id: number, queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `payout/paymentInstruments/${id}/recharge?${queryStr}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deactivate = async (id: number) => {
  try {
    const response = await http.delete(`payout/paymentInstruments/${id}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getServiceCharges = async (
  id: number,
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      batches: AnyObject[];
    };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/chargesCollected?${queryStr}`,
    );

    return listingAdapter.from((response as Response).batches || [], queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getServiceChargesCount = async (
  id: number,
  queryObj: {
    startDate?: string;
    endDate?: string;
    size?: number;
    previousId?: string | number;
    lastId?: string | number;
  },
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number; totalAmount: number };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/chargesCollected/summary?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRechargeBankAccounts = async (id: number) => {
  try {
    type Response = {
      entries: {
        accountNumber: string;
        bankName: string;
        ifsc: string;
      }[];
    };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/rechargeBankAccountDetails`,
    );

    return rechargeAccountsAdapter.from((response as Response).entries);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getInternalTransfer = async (id: number) => {
  try {
    type Response = {
      amount: string;
      status: string;
      addedOn: string;
    };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/lastInternalFundTransfer`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getLastRechargeDetails = async (id: number) => {
  try {
    type Response = {
      amount: string;
      utr: string;
      depositTime: string;
    };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/lastRechargeDetails`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getSelfWithdrawals = async (id: number) => {
  try {
    const response = await http.get(
      `payout/paymentInstruments/${id}/recentSelfWithdrawals`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const selfWithdrawals = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/selfWithdrawals', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getLowBalanceThreshold = async (queryObj: {
  fundSourceId: number;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { lowBalance: string; isActive: boolean };

    const response: unknown = await http.get(
      `payout/lowBalanceThreshold?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const setLowBalanceThreshold = async (
  queryObj: { fundSourceId: number },
  body: {
    lowBalance: string;
    isActive: boolean;
  },
) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.post(
      `payout/lowBalanceThreshold?${queryStr}`,
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDowntimes = async (queryObj: AnyObject) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `payout/paymentInstruments/downtime?${queryStr}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBreakup = async (id: number, queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `payout/paymentInstruments/${id}/chargeableAmount?${queryStr}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateCreds = async (
  id: number,
  queryObj: {
    verificationStage: VERIFICATION_STAGE;
  },
  body: AnyObject,
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      fundSourceId: number;
      status: string;
      data?: {
        url: string;
        payload: string;
        contentType: string;
        method: string;
      };
      rawBankData?: {
        request: string;
        response: string;
      } | null;
      verificationData?: {
        transferType: string;
        request: string;
        response: string;
        verified: boolean;
        bankUrl: string;
        reportUrl: string;
      };
    };

    const response: unknown = await http.post(
      `payout/paymentInstruments/${id}/connect?${queryStr}`,
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getCreds = async (
  id: number,
  queryObj: {
    verificationStage: VERIFICATION_STAGE;
  },
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { fundSourceId: number; creds: AnyObject };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/connect/creds?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getReport = async (id: number) => {
  try {
    type Response = {
      fileExists: boolean;
      data: string;
    };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/connect/report`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const selectInvoicingModel = async (id: number, body: AnyObject) => {
  try {
    const response = await http.post(
      `payout/payoutInstruments/${id}/defaultInvoicing`,
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getGateway = async (queryObj: {
  gatewayName: string | undefined;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      id: number;
      cfBankId: number;
      gatewayName: string;
      gatewayType: string;
      status: string;
      supportedModes: string;
      credentialSchema: string;
      ifscSubStr: string;
      operationalSchema: string;
      leadInfoSchema: string;
    };

    const response: unknown = await http.get(
      `payout/gatewaysDetails?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const createLead = async (id: number, body: AnyObject) => {
  try {
    const response = await http.put(
      `payout/paymentInstruments/${id}/leads`,
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllLeads = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = Array<{
      id: number;
      mid: number;
      accountId: number;
      merchantName: string;
      fundSourceId: number;
      gatewayName: string;
      leadInfo: string;
      leadType: string;
      status: string;
      category: string;
      merchantContact: string;
      accountManager: string;
      currentOwner?: string;
      currentStatusAge: number;
      latestComment: string;
      addedOn: string;
      updatedOn: string;
      data: Array<{
        label: string;
        property: string;
        value: string;
      }>;
    }>;

    const response: unknown = await http.get(
      `payout/merchant/leads?${queryStr}`,
    );

    return listingAdapter.from(response as Response, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllLeadsCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      count: number;
    };

    const response: unknown = await http.get(
      `payout/merchant/leads/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getLeadDetails = async (id: number) => {
  try {
    const response = await http.get(`payout/merchant/leads/${id}/audit`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const searchLeads = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = Array<{
      id: number;
      mid: number;
      accountId: number;
      merchantName: string;
      fundSourceId: number;
      gatewayName: string;
      leadInfo: string;
      leadType: string;
      status: string;
      category: string;
      merchantContact: string;
      accountManager: string;
      currentOwner?: string;
      currentStatusAge: number;
      latestComment: string;
      addedOn: string;
      updatedOn: string;
      data: Array<{
        label: string;
        property: string;
        value: string;
      }>;
    }>;

    const response: unknown = await http.get(
      `payout/merchant/leads?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAggregators = async () => {
  try {
    const response = await http.get('payout/aggregators');

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getFundSourceStatusAtBank = async (id: number) => {
  try {
    type Response = {
      bankName: CONNECTED_BANK.CANARA_CONNECTED | CONNECTED_BANK.AU_CONNECTED;
      status: string;
      bankRedirectionUrl: string;
    };

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/fsStatusAtBank`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRefreshAccessTokenForCanara = async (id: number) => {
  try {
    type Response = boolean;

    const response: unknown = await http.get(
      `payout/paymentInstruments/${id}/refreshAccessToken`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const reactivateFundSource = async (id: number) => {
  try {
    const response = await http.post(
      `payout/paymentInstruments/${id}/erp/reactivateFundSource`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const processBankCallBack = async (
  id: number,
  body: {
    code: string | null;
    scope: string | null;
    state: string | null;
  },
) => {
  try {
    const response = await http.post(
      `payout/paymentInstruments/${id}/erp/processBankCallBack`,
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
