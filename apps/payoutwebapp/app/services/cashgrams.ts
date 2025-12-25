// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const createBatch = async (body: any) => {
  try {
    const response = await http.post('payout/cashgrams/batch/upload', body, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateBatch = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/cashgrams/batch/update', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateBatchEntries = async (body: AnyObject) => {
  try {
    const response = await http.patch(
      'payout/cashgrams/batch/record/update',
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getErrorLog = async (batchId: number) => {
  try {
    type Response = ReportFile;

    const response: unknown = await http.get(
      `payout/cashgrams/batch/${batchId}/download/error-log`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAll = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      cashgrams: Array<{
        id: number;
        cashgramId: string;
        amount: string;
        name: string;
        addedOn: string;
        status: string;
        phone: string;
        cashgram: string;
        expiry: string;
        email: string;
      }>;
    };

    const response: unknown = await http.get(`payout/cashgrams?${queryStr}`);

    return listingAdapter.from((response as Response).cashgrams, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const searchCashgram = async (cashgramId: string) => {
  const queryStr = getQueryString({ cashgramId });

  try {
    type Response = {
      cashgrams: Array<{
        id: number;
        cashgramId: string;
        amount: string;
        name: string;
        addedOn: string;
        status: string;
        phone: string;
        cashgram: string;
        expiry: string;
        email: string;
      }>;
    };

    const response: unknown = await http.get(`payout/cashgrams?${queryStr}`);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/cashgrams/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatches = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      batches: Array<{
        fileName: string;
        id: number;
        status: string;
        countCashgrams: number;
        addedOn: string;
        valid: number;
        invalid: number;
        uploadedBy: string;
        approvalCount: number;
        totalApprovalCount: number;
        totalAmount: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/cashgrams/batch?${queryStr}`,
    );

    return listingAdapter.from((response as Response).batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchesCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/cashgrams/batch/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchStats = async (id: number, toBeApproved = false) => {
  try {
    type Response = Record<string, number>;

    const response: unknown = await http.get(
      `payout/cashgrams/batch/${id}/stats?approveSection=${toBeApproved}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchApprovalDetails = async (batchId: number) => {
  try {
    type Response = {
      approvals: Array<{ name: string; date: string }>;
      rejections: Array<{ name: string; date: string }>;
    };

    const response: unknown = await http.get(
      `payout/cashgrams/batch/${batchId}/details`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const downloadBatchReport = async (id: number) => {
  try {
    type Response = ReportFile;

    const response: unknown = await http.get(
      `payout/cashgrams/batch/${id}/download/report`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchEntries = async (
  batchId: number,
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      cashgrams: Array<{
        id: number;
        cashgramId: string;
        amount: string;
        name: string;
        addedOn: string;
        status: string;
        phone: string;
        expiry: string;
        approvalCount: number;
        totalApprovalCount: number;
      }>;
    };

    const response: unknown = await http.get(
      `payout/cashgrams/batch/${batchId}?${queryStr}`,
    );

    return listingAdapter.from((response as Response).cashgrams, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchEntriesCount = async (
  batchId: number,
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/cashgrams/batch/${batchId}/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const send = async (body: {
  sendEmail: boolean;
  sendSMS: boolean;
  id: string;
}) => {
  try {
    type Response = { message: string };

    const response: unknown = await http.post('payout/cashgrams/notify', body);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deactivate = async (cashgramId: string) => {
  try {
    type Response = { message: string };

    const response: unknown = await http.delete(
      `payout/cashgrams/${cashgramId}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const create = async (body: AnyObject) => {
  try {
    type Response = {
      cashgramLink: string;
      message: string;
      referenceId: number;
      cashgramId: string;
      status: string;
      refId: number;
      utr: string;
      retryCount: number;
    };

    const response: unknown = await http.post('payout/cashgrams', body);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getVerifyBeneficiaries = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      cashgrams: AnyObject[];
    };

    const response: unknown = await http.get(
      `payout/cashgrams/premium?${queryStr}`,
    );

    return listingAdapter.from((response as Response).cashgrams, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getVerifyBeneficiariesCount = async (
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/cashgrams/premium/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyBeneficiaries = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/cashgrams/verify', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const rejectBeneficiaries = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/cashgrams/reject', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async (id: number, fromBatch = false) => {
  const key = fromBatch ? 'cfBulkCashgramEntryID' : 'cfCashgramID';

  const queryStr = getQueryString({
    [key]: id,
  });

  try {
    type Response = {
      beneficiary: {
        name: string;
        phone: string;
        email: string;
      };
      createdAt: string;
      validTill: string;
      addedBy: {
        name: string;
        source: string;
      };
      link: string;
      status: string;
      approvals: Array<any>;
      rejections: Array<any>;
      redemption: {
        redeemedAt: string;
        utr: string;
        transferMethod: string;
        accountHolder: string;
        accountNumber: string;
        ifsc: string;
        vpa: string;
        phone: string;
        maskedCard: string;
      };
      verificationDetails: {
        name: string;
        date: string;
        status: boolean;
      };
      reason: string;
      type: string;
      description: string;
      remarks: string;
    };

    const response: unknown = await http.get(
      `payout/cashgrams/details?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
