// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getBaseURL, getQueryString } from 'utils/common';

// Constants
import { CURRENCY } from 'constants/common';

export const createBatch = async (body: any) => {
  try {
    const response = await http.post('payout/transfers/batch', body, {
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
    const response = await http.patch('payout/transfers/batch', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateBatchEntries = async (body: AnyObject) => {
  try {
    const response = await http.patch('payout/transfers/batch/record', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const update = async (body: AnyObject) => {
  try {
    type Response = {
      message: string;
    };

    const response: unknown = await http.patch('payout/transfers', body);

    return response as Response;
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
      `payout/transfers/batch/${batchId}/download/error-log`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const create = async (body: AnyObject, isSame = false) => {
  try {
    type Response = {
      message: string;
      data: {
        referenceId: string;
        utr: string;
        acknowledged: number;
      };
      status: string;
      subCode: string;
    };

    const response: unknown = await http.post(
      `payout/transfers?quickTransfer=${!isSame}`,
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAll = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      cursor: string;
      pageSize: number;
      data: Array<{
        addedOn: string;
        amount: number;
        bankAccount: string;
        beneId?: string;
        beneName: string;
        beneficiaryId: string;
        currencyCode: string;
        description: string;
        email?: string;
        iban?: string;
        id?: string;
        ifsc: string;
        mode: string;
        paymentInstrumentId: string;
        phone?: string;
        referenceId: number;
        serviceCharge: number;
        serviceTax: number;
        status: string;
        transferId: string;
        utr: string;
        vpa?: string;
      }>;
    };

    const response: unknown = await http.get(`payout/transfers?${queryStr}`);

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
      `payout/transfers/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllReversed = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      transfers: Array<{
        id: number;
        transferId: string;
        beneficiaryId: number;
        referenceId: number;
        utr: string;
        amount: string;
        processedOn: string;
        reason: string;
        currency: CURRENCY;
      }>;
    };

    const response: unknown = await http.get(
      `payout/transfers/reversed?${queryStr}`,
    );

    return listingAdapter.from((response as Response).transfers, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllReversedCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/transfers/reversed/count?${queryStr}`,
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
        countTransfers: number;
        addedOn: string;
        valid: number;
        invalid: number;
        uploadedBy: string;
        approvalCount: number;
        totalApprovalCount: number;
        fileType: string;
        totalAmount: string;
        currencyCode: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/transfers/batch?${queryStr}`,
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
      `payout/transfers/batch/count?${queryStr}`,
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
      `payout/transfers/batch/${batchId}/approvalsDetails`,
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
      transfers: Array<{
        transferId: string;
        referenceId: number;
        beneficiaryId: string;
        addedOn: string;
        processedOn: string;
        utr: string;
        amount: string;
        status: string;
        id: number;
        bankAccount: string;
        ifsc: string;
        phone: string;
        vpa: string;
        iban: string;
        transferMode: string;
        email: string;
        name: string;
        reason: string;
        remarks: string;
        approvalCount: number;
        totalApprovalCount: number;
        currencyCode: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/transfers/batch/${batchId}?${queryStr}`,
    );

    return listingAdapter.from((response as Response).transfers, queryObj);
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
      `payout/transfers/batch/${batchId}/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async (
  transferId: number,
  fileType: string,
  fromBatch = false,
) => {
  const queryStr = getQueryString({ fileType });

  try {
    type Response = {
      transferId: string;
      beneId: string;
      referenceId: number;
      bankAccount: string;
      iban: string;
      amount: string;
      status: string;
      ifsc: string;
      utr: string;
      mode: string;
      vpa: string;
      name: string;
      phone: string;
      addedOn: string;
      processedOn: string;
      acknowledged: string;
      remarks: string;
      email: string;
      statusDescription: string;
      bankStatus: string;
      approvals: Array<{ name: string; date: string }>;
      rejections: Array<{ name: string; date: string }>;
      paymentInstrumentId: string;
      description: string;
      detailedDescription: string;
      currency: CURRENCY;
      purposeCode: string;
    };

    const response: unknown = await http.get(
      `payout/transfers/${
        fromBatch ? 'batch/record/' : ''
      }${transferId}?${queryStr}`,
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
      `payout/transfers/batch/${id}/stats?approveSection=${toBeApproved}`,
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
      `payout/transfers/batch/${id}/download/report`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRiskInsights = async (queryObj: {
  bankAccount: string;
  ifsc: string;
  startDate: string;
  endDate: string;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http({
      baseURL: getBaseURL(true),
      url: `risk-platform/po/insights?${queryStr}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
