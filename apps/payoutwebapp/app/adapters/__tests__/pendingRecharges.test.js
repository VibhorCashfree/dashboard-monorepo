// Adapters
import pendingRecharges from '../pendingRecharges';

const { from } = pendingRecharges;

describe('pendingRecharges adapters', () => {
  describe('from()', () => {
    test('should transform response data to the expected format', () => {
      expect(
        from(
          [
            {
              fundSourceId: 1,
              Utr: '123456',
              Amount: 1000,
              RemitterName: 'John Doe',
              RemitterAccount: '111111',
              RemitterIfsc: 'IFSC0001',
              AddedOn: '2023-01-01',
              ProcessedOn: '2023-01-02',
            },
            {
              fundSourceId: 2,
              Utr: '654321',
              Amount: 2000,
              RemitterName: 'Jane Doe',
              RemitterAccount: '222222',
              RemitterIfsc: 'IFSC0002',
              AddedOn: '2023-02-01',
              ProcessedOn: '2023-02-02',
            },
          ],
          1,
        ),
      ).toEqual({
        data: [
          {
            addedOn: '2023-01-01',
            updatedOn: '2023-01-02',
            utr: '123456',
            amount: 1000,
            status: 'PENDING_APPROVAL',
          },
        ],
        hasNext: false,
      });
    });

    test('should return an empty data array if no matching fundSourceId is found', () => {
      expect(
        from(
          [
            {
              fundSourceId: 2,
              Utr: '654321',
              Amount: 2000,
              RemitterName: 'Jane Doe',
              RemitterAccount: '222222',
              RemitterIfsc: 'IFSC0002',
              AddedOn: '2023-02-01',
              ProcessedOn: '2023-02-02',
            },
          ],
          1,
        ),
      ).toEqual({
        data: [],
        hasNext: false,
      });
    });
  });
});
