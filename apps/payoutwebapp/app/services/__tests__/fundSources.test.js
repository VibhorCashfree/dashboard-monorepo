import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as FundSourcesService from 'services/fundSources';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('fundSources services', () => {
  test('[SUCCESS] upload()', async () => {
    const mockResponse = { fileKey: { foo: 'bar' } };

    httpMock
      .onPost('payout/paymentInstruments/statement')
      .reply(200, mockResponse);

    const response = await FundSourcesService.upload();

    expect(response).toEqual(mockResponse.fileKey);
  });

  test('[ERROR] upload()', async () => {
    httpMock.onPost('payout/paymentInstruments/statement').reply(404);

    const response = await FundSourcesService.upload();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] create()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/paymentInstruments').reply(200, mockResponse);

    const response = await FundSourcesService.create();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] create()', async () => {
    httpMock.onPost('payout/paymentInstruments').reply(404);

    const response = await FundSourcesService.create();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] createVirtualAccount()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost('payout/connected-virtual-account')
      .reply(200, mockResponse);

    const response = await FundSourcesService.createVirtualAccount();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] createVirtualAccount()', async () => {
    httpMock.onPost('payout/connected-virtual-account').reply(404);

    const response = await FundSourcesService.createVirtualAccount();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] connect()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost('payout/paymentInstruments/123/connect')
      .reply(200, mockResponse);

    const response = await FundSourcesService.connect(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] connect()', async () => {
    httpMock.onPost('payout/paymentInstruments/123/connect').reply(404);

    const response = await FundSourcesService.connect(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] recharge()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost('payout/paymentInstruments/credit-card/recharge')
      .reply(200, mockResponse);

    const response = await FundSourcesService.recharge();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] recharge()', async () => {
    httpMock
      .onPost('payout/paymentInstruments/credit-card/recharge')
      .reply(404);

    const response = await FundSourcesService.recharge();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] addBalance()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost('payout/connected-wallet/123/recharge')
      .reply(200, mockResponse);

    const response = await FundSourcesService.addBalance(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] addBalance()', async () => {
    httpMock.onPost('payout/connected-wallet/123/recharge').reply(404);

    const response = await FundSourcesService.addBalance(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPut('payout/paymentInstruments/123').reply(200, mockResponse);

    const response = await FundSourcesService.updateDetails(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateDetails()', async () => {
    httpMock.onPut('payout/paymentInstruments/123').reply(404);

    const response = await FundSourcesService.updateDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAll()', async () => {
    const mockResponse = [];

    httpMock
      .onGet(
        'payout/paymentInstruments?source=DASHBOARD&showAll=true&product=CSP,ONE_ESCROW',
      )
      .reply(200, mockResponse);

    const response = await FundSourcesService.getAll();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAll()', async () => {
    httpMock
      .onGet(
        'payout/paymentInstruments?source=DASHBOARD&showAll=true&product=CSP,ONE_ESCROW',
      )
      .reply(404);

    const response = await FundSourcesService.getAll();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllFS()', async () => {
    const mockResponse = { batches: [] };

    httpMock
      .onGet('payout/paymentInstruments?source=DASHBOARD&size=2&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getAllFS({ size: 1 });

    expect(response).toEqual({ data: mockResponse, hasNext: false });
  });

  test('[ERROR] getAllFS()', async () => {
    httpMock
      .onGet('payout/paymentInstruments?source=DASHBOARD&size=2&')
      .reply(404);

    const response = await FundSourcesService.getAllFS({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllFSCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/paymentInstruments/count?source=DASHBOARD&size=1&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getAllFSCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAllFSCount()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/count?source=DASHBOARD&size=1&')
      .reply(404);

    const response = await FundSourcesService.getAllFSCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/paymentInstruments/123').reply(200, mockResponse);

    const response = await FundSourcesService.getDetails(123);

    expect(response).toEqual({
      cfBankName: undefined,
      foo: 'bar',
      fsBalance: {
        availableBalance: undefined,
        balance: undefined,
        fundsOnHold: undefined,
        lastUpdated: undefined,
        overdraft: undefined,
      },
      fundSourceId: undefined,
      paymentInstrumentId: undefined,
    });
  });

  test('[ERROR] getDetails()', async () => {
    httpMock.onGet('payout/paymentInstruments/123').reply(404);

    const response = await FundSourcesService.getDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getYesBusinessType()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/paymentInstruments/eligibility/yesbank')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getYesBusinessType();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getYesBusinessType()', async () => {
    httpMock.onGet('payout/paymentInstruments/eligibility/yesbank').reply(404);

    const response = await FundSourcesService.getYesBusinessType();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] remove()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payout/paymentInstruments/123').reply(200, mockResponse);

    const response = await FundSourcesService.remove(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] remove()', async () => {
    httpMock.onDelete('payout/paymentInstruments/123').reply(404);

    const response = await FundSourcesService.remove(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getStatements()', async () => {
    const mockResponse = { batches: [] };

    httpMock.onGet('payout/accountStatement?size=2&').reply(200, mockResponse);

    const response = await FundSourcesService.getStatements({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getStatements()', async () => {
    httpMock.onGet('payout/accountStatement?size=2&').reply(404);

    const response = await FundSourcesService.getStatements({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getStatementsCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/accountStatement/count?size=1&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getStatementsCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getStatementsCount()', async () => {
    httpMock.onGet('payout/accountStatement/count?size=1&').reply(404);

    const response = await FundSourcesService.getStatementsCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getPendingRecharges()', async () => {
    const mockResponse = [];

    httpMock.onGet('payout/recharges/pendingApproval').reply(200, mockResponse);

    const response = await FundSourcesService.getPendingRecharges(123);

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getPendingRecharges()', async () => {
    httpMock.onGet('payout/recharges/pendingApproval').reply(404);

    const response = await FundSourcesService.getPendingRecharges(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getRechargeHistory()', async () => {
    const mockResponse = { batches: [] };

    httpMock
      .onGet('payout/paymentInstruments/123/recharges?size=1&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getRechargeHistory(123, {
      size: 1,
    });

    expect(response).toEqual({ batches: [] });
  });

  test('[ERROR] getRechargeHistory()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/recharges?size=2&')
      .reply(404);

    const response = await FundSourcesService.getRechargeHistory(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getRechargeHistoryCount()', async () => {
    const mockResponse = { result: 0 };

    httpMock
      .onGet('payout/paymentInstruments/123/recharges/count?size=1&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getRechargeHistoryCount(123, {
      size: 1,
    });

    expect(response).toEqual({ count: mockResponse.result });
  });

  test('[ERROR] getRechargeHistoryCount()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/recharges/count?size=1&')
      .reply(404);

    const response = await FundSourcesService.getRechargeHistoryCount(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getWeightage({ source: "DASHBOARD" })', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/weightage?source=DASHBOARD&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getWeightage({
      source: 'DASHBOARD',
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getWeightage({ source: "DASHBOARD" })', async () => {
    httpMock
      .onGet('payout/paymentInstruments/weightage?source=DASHBOARD&')
      .reply(404);

    const response = await FundSourcesService.getWeightage({
      source: 'DASHBOARD',
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateWeightage()', async () => {
    const mockResponse = {};

    httpMock
      .onPost('payout/paymentInstruments/weightage')
      .reply(200, mockResponse);

    const response = await FundSourcesService.updateWeightage();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateWeightage()', async () => {
    httpMock.onPost('payout/paymentInstruments/weightage').reply(404);

    const response = await FundSourcesService.updateWeightage();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBalance()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/123/balance')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getBalance(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBalance()', async () => {
    httpMock.onGet('payout/paymentInstruments/123/balance').reply(404);

    const response = await FundSourcesService.getBalance(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBalance()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/123/recharge?foo=bar&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getEvent(123, { foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getEvent()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/recharge?foo=bar&')
      .reply(404);

    const response = await FundSourcesService.getEvent(123, { foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] deactivate()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payout/paymentInstruments/123').reply(200, mockResponse);

    const response = await FundSourcesService.deactivate(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] deactivate()', async () => {
    httpMock.onDelete('payout/paymentInstruments/123').reply(404);

    const response = await FundSourcesService.deactivate(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getServiceCharges()', async () => {
    const mockResponse = { batches: [] };

    httpMock
      .onGet('payout/paymentInstruments/123/chargesCollected?size=2&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getServiceCharges(123, {
      size: 1,
    });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getServiceCharges()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/chargesCollected?size=2&')
      .reply(404);

    const response = await FundSourcesService.getServiceCharges(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getServiceChargesCount()', async () => {
    const mockResponse = { result: 0 };

    httpMock
      .onGet('payout/paymentInstruments/123/chargesCollected/summary?size=1&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getServiceChargesCount(123, {
      size: 1,
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getServiceChargesCount()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/chargesCollected/summary?size=1&')
      .reply(404);

    const response = await FundSourcesService.getServiceChargesCount(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getRechargeBankAccounts()', async () => {
    const mockResponse = { entries: [] };

    httpMock
      .onGet('payout/paymentInstruments/123/rechargeBankAccountDetails')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getRechargeBankAccounts(123);

    expect(response).toEqual(mockResponse.entries);
  });

  test('[ERROR] getRechargeBankAccounts()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/rechargeBankAccountDetails')
      .reply(404);

    const response = await FundSourcesService.getRechargeBankAccounts(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getInternalTransfer()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/123/lastInternalFundTransfer')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getInternalTransfer(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getInternalTransfer()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/lastInternalFundTransfer')
      .reply(404);

    const response = await FundSourcesService.getInternalTransfer(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getLastRechargeDetails()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/123/lastRechargeDetails')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getLastRechargeDetails(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getLastRechargeDetails()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/lastRechargeDetails')
      .reply(404);

    const response = await FundSourcesService.getLastRechargeDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getSelfWithdrawals()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/123/recentSelfWithdrawals')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getSelfWithdrawals(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getSelfWithdrawals()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/recentSelfWithdrawals')
      .reply(404);

    const response = await FundSourcesService.getSelfWithdrawals(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getLowBalanceThreshold()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/lowBalanceThreshold?foo=bar&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getLowBalanceThreshold({
      foo: 'bar',
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getLowBalanceThreshold()', async () => {
    httpMock.onGet('payout/lowBalanceThreshold?foo=bar&').reply(404);

    const response = await FundSourcesService.getLowBalanceThreshold({
      foo: 'bar',
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] setLowBalanceThreshold()', async () => {
    const mockResponse = {};

    httpMock
      .onPost('payout/lowBalanceThreshold?foo=bar&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.setLowBalanceThreshold({
      foo: 'bar',
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] setLowBalanceThreshold()', async () => {
    httpMock.onPost('payout/lowBalanceThreshold?foo=bar&').reply(404);

    const response = await FundSourcesService.setLowBalanceThreshold({
      foo: 'bar',
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getDowntimes()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/downtime?foo=bar&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getDowntimes({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getDowntimes()', async () => {
    httpMock.onGet('payout/paymentInstruments/downtime?foo=bar&').reply(404);

    const response = await FundSourcesService.getDowntimes({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBreakup()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/123/chargeableAmount?foo=bar&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getBreakup(123, { foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBreakup()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/chargeableAmount?foo=bar&')
      .reply(404);

    const response = await FundSourcesService.getBreakup(123, { foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateCreds()', async () => {
    const mockResponse = {};

    httpMock
      .onPost('payout/paymentInstruments/123/connect?foo=bar&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.updateCreds(123, { foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateCreds()', async () => {
    httpMock
      .onPost('payout/paymentInstruments/123/connect?foo=bar&')
      .reply(404);

    const response = await FundSourcesService.updateCreds(123, { foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getCreds()', async () => {
    const mockResponse = {};

    httpMock
      .onGet('payout/paymentInstruments/123/connect/creds?foo=bar&')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getCreds(123, { foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getCreds()', async () => {
    httpMock
      .onGet('payout/paymentInstruments/123/connect/creds?foo=bar&')
      .reply(404);

    const response = await FundSourcesService.getCreds(123, { foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getReport()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/paymentInstruments/123/connect/report')
      .reply(200, mockResponse);

    const response = await FundSourcesService.getReport(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getReport()', async () => {
    httpMock.onGet('payout/paymentInstruments/123/connect/report').reply(404);

    const response = await FundSourcesService.getReport(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] selectInvoicingModel()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost('payout/payoutInstruments/123/defaultInvoicing')
      .reply(200, mockResponse);

    const response = await FundSourcesService.selectInvoicingModel(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] selectInvoicingModel()', async () => {
    httpMock.onPost('payout/payoutInstruments/123/defaultInvoicing').reply(404);

    const response = await FundSourcesService.selectInvoicingModel(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
