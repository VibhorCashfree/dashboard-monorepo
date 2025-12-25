// Mocks
import { mockFundSources } from '__mocks__/common.mock';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';

// Utils
import FundSourcesUtil from '../fundSources';

describe('FundSourcesUtil checks', () => {
  test('FundSourcesUtil module', () => {
    expect(FundSourcesUtil).toHaveProperty('getActives');
    expect(FundSourcesUtil).toHaveProperty('getByTypes');

    expect(FundSourcesUtil.getActives([])).toStrictEqual([]);
    expect(FundSourcesUtil.getActives(mockFundSources)).toStrictEqual(
      mockFundSources,
    );

    expect(FundSourcesUtil.getByTypes([])).toStrictEqual([]);
    expect(FundSourcesUtil.getByTypes(mockFundSources, [])).toStrictEqual([]);
    expect(
      FundSourcesUtil.getByTypes(mockFundSources, ['CREDIT_CARD']),
    ).toStrictEqual([mockFundSources[1]]);

    expect(
      FundSourcesUtil.getPreferences(mockFundSources, 14576),
    ).toStrictEqual(mockFundSources[0].preferences);

    expect(FundSourcesUtil.getDowntime('', [])).toStrictEqual();
    expect(
      FundSourcesUtil.getDowntime('y', [
        {
          id: 1,
          cfGateway: 'x',
          startTime: '12-12-1992',
          endTime: '12-12-2030',
        },
        {
          id: 2,
          cfGateway: 'y',
          startTime: '12-12-1992',
          endTime: '12-12-2030',
        },
        {
          id: 3,
          cfGateway: 'z',
          startTime: '12-12-1992',
          endTime: '12-12-2030',
        },
      ]),
    ).toStrictEqual({
      id: 2,
      cfGateway: 'y',
      startTime: '12-12-1992',
      endTime: '12-12-2030',
    });

    expect(
      FundSourcesUtil.getMainAccountBalance(mockFundSources),
    ).toStrictEqual({
      availableBalance: '0',
      balance: '0',
      fundsOnHold: '0',
      lastUpdated: '',
      overdraft: '0',
    });

    expect(
      FundSourcesUtil.getOneEscrow([
        { product: 'ONE_ESCROW', fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT },
        {
          product: 'ONE_ESCROW',
          fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
        },
        {
          product: 'OTHER_PRODUCT',
          fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
        },
      ]),
    ).toEqual({
      product: 'ONE_ESCROW',
      fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
    });

    expect(
      FundSourcesUtil.getOneEscrow([
        {
          product: 'OTHER_PRODUCT',
          fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
        },
        {
          product: 'OTHER_PRODUCT',
          fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
        },
      ]),
    ).toBeUndefined();

    expect(
      FundSourcesUtil.getVirtualAccounts([
        {
          product: 'ONE_ESCROW',
          fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
          status: 'ACTIVE',
        },
        {
          product: 'ONE_ESCROW',
          fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
          status: 'ACTIVE',
        },
        {
          product: 'ONE_ESCROW',
          fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
          status: 'DEACTIVATED',
        },
        {
          product: 'ONE_ESCROW',
          fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
          status: 'ACTIVE',
        },
      ]),
    ).toEqual([
      {
        product: 'ONE_ESCROW',
        fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
        status: 'ACTIVE',
      },
      {
        product: 'ONE_ESCROW',
        fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
        status: 'ACTIVE',
      },
    ]);

    expect(
      FundSourcesUtil.getVirtualAccounts([
        {
          product: 'ONE_ESCROW',
          fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
          status: 'ACTIVE',
        },
        {
          product: 'ONE_ESCROW',
          fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
          status: 'DEACTIVATED',
        },
        {
          product: 'OTHER_PRODUCT',
          fsDisplayType: FS_DISPLAY_TYPE.VIRTUAL_ACCOUNT,
          status: 'ACTIVE',
        },
      ]),
    ).toEqual([]);
  });
});
