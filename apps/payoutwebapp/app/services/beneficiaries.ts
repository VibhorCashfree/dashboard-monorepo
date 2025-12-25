// Constants
import { BENE_PURPOSE } from 'constants/common';

// Adapters
import listingAdapter from 'adapters/listing';
import beneficiaryAdapter from 'adapters/beneficiary';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

// Types
import type { Mode } from 'containers/AllTransfers/types';

export const getAll = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      entries: Array<{
        id: number;
        addedOn: string;
        beneId: string;
        name: string;
        email: string;
        phone: string;
        vpa: string;
        bankAccount: string;
        ifsc: string;
        iban: string;
        status: string;
        benePurpose: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/beneficiaries/paginatedBeneList?${queryStr}`,
    );

    return listingAdapter.from((response as Response).entries, queryObj);
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
      `payout/beneficiaries/paginatedBeneList/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async (beneId: string) => {
  try {
    type Response = {
      id: string;
      name: string;
      email: string;
      phone: string;
      address1: string;
      iban: string;
      bankAccount: string;
      ifsc: string;
      vpa: string;
      addedOn: string;
      reason: string;
      benePurpose: string;
      beneficiaryKycDocData: Array<AnyObject>;
    };

    const response: unknown = await http.get(
      `payout/beneficiaries/info/${beneId}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const remove = async (beneId: string) => {
  try {
    type Response = { message: string };

    const response: unknown = await http.delete(
      `payout/beneficiaries/delete/${beneId}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const create = async (body: AnyObject) => {
  if (body.benePurpose === BENE_PURPOSE.BULK_BENE) {
    body.benePurpose = '';
  }

  try {
    type Response = { message: string };

    const response: unknown = await http.post(
      'payout/beneficiaries/createBene',
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getSuggestions = async (id: string) => {
  try {
    type Response = {
      entries: {
        beneId: string;
        modes: Mode[];
        name: string;
      }[];
    };

    const response: unknown = await http.get(
      `payout/beneficiaries/beneSuggestions?query=${id}`,
    );

    return (response as Response).entries.slice(0, 5);
  } catch (error) {
    return {
      error,
    };
  }
};

export const createBatch = async (body: any) => {
  try {
    const response = await http.post('payout/beneficiaries/batch', body, {
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
    const response = await http.patch(
      'payout/beneficiaries/batch/update',
      body,
    );

    return response;
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
        name: string;
        id: number;
        status: string;
        total: number;
        addedOn: string;
        valid: number;
        invalid: number;
        uploadedBy: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/beneficiaries/batch?${queryStr}`,
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
      `payout/beneficiaries/batch/count?${queryStr}`,
    );

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
      `payout/beneficiaries/batch/${batchId}/download/error-log`,
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
      `payout/beneficiaries/batch/${id}/download/report`,
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
      entries: Array<{
        name: string;
        phone: string;
        iban: string;
        bankAccount: string;
        ifsc: string;
        vpa: string;
        addedOn: string;
        beneId: string;
        id: number;
        status: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/beneficiaries/batch/${batchId}?${queryStr}`,
    );

    return listingAdapter.from((response as Response).entries, queryObj);
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
      `payout/beneficiaries/batch/${batchId}/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchStats = async (id: number) => {
  try {
    type Response = Record<string, number>;

    const response: unknown = await http.get(
      `payout/beneficiaries/batch/${id}/stats`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const update = async (id: string, body: AnyObject) => {
  try {
    type Response = {
      message: string;
    };

    const response: unknown = await http.put(
      `payout/beneficiaries/updateBene/${id}`,
      beneficiaryAdapter.to(
        body as {
          bankAccount: string | number;
          ifsc: string;
          panCard: string;
          gstIn: string;
          cin: string;
          din: string;
        },
      ),
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const revalidateBeneficiaries = async (body: AnyObject) => {
  try {
    type Response = { status: string; beneStatus: string; message: string };

    const response: unknown = await http.post(
      'payout/beneficiaries/validate-amzn-readiness',
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const createIbanBatch = async (body: any) => {
  try {
    const response = await http.post('payout/iban/batch', body, {
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

export const getIbanBatches = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));
  try {
    type Response = {
      batches: Array<{
        name: string;
        id: number;
        status: string;
        total: number;
        addedOn: string;
        valid: number;
        invalid: number;
        uploadedBy: string;
      }>;
    };

    const response: unknown = await http.get(`payout/iban/batch?${queryStr}`);

    return listingAdapter.from((response as Response).batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getIbanBatchesCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(`payout/iban/batch/count?${queryStr}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const downloadIbanBatchReport = async (id: number) => {
  try {
    type Response = ReportFile;

    const response: unknown = await http.get(
      `payout/iban/batch/${id}/download`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
