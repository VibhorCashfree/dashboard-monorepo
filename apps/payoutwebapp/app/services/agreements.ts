// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getAll = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = AnyObject[];

    const response: unknown = await http.get(
      `payout/escrow/agreement?${queryStr}`,
    );

    return listingAdapter.from(response as Response, queryObj);
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
      `payout/escrow/agreement/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const create = async (body: {
  purpose: any;
  total_amount: any;
  start_date: string;
  expiry_date: string;
  parties: any[];
}) => {
  try {
    type Response = {
      agreement_id: string;
    };

    const response: unknown = await http.post('payout/escrow/agreement', body);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async (agreementId: number) => {
  try {
    type Response = AnyObject;

    const response: unknown = await http.get(
      `payout/escrow/agreement/${agreementId}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getStatement = async (
  id: number,
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));
  try {
    type Response = {
      batches: AnyObject[];
    };

    const response: unknown = await http.get(
      `payout/escrow/agreement/${id}/statement?${queryStr}`,
    );

    return listingAdapter.from((response as Response).batches || [], queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getStatementCount = async (
  id: number,
  queryObj: PaginationQueryObj,
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/escrow/agreement/${id}/statement/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBalance = async (id: number) => {
  try {
    type Response = {
      bank_account_number: string;
      ifsc: string;
      available_balance: string;
    };

    const response: unknown = await http.get(
      `payout/escrow/agreement/${id}/bank-account`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const markTerminalStatus = async (body: {
  agreement_id: string;
  status: string;
}) => {
  try {
    const response = await http.patch('payout/escrow/agreement', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const download = async (agreementId: string) => {
  try {
    type Response = { name: string; file: string; file_url: string };

    const response: Response = await http.get(
      `payout/escrow/agreement/${agreementId}/signed-agreement`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
