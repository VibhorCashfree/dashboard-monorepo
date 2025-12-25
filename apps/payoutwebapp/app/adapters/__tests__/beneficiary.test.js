// Adapters
import beneficiary from '../beneficiary';

const { to } = beneficiary;

describe('beneficiary adapters', () => {
  test('should correctly transform the input object', () => {
    expect(
      to({
        bankAccount: '1234567890',
        ifsc: 'ABC123456',
        panCard: 'ABCDE1234F',
        gstIn: '22AAAAA0000A1Z5',
        cin: 'L12345MH2010PLC123456',
        din: '01234567',
      }),
    ).toEqual({
      bankAccount: '1234567890',
      ifsc: 'ABC123456',
      source: 'DASHBOARD',
      kycDocuments: {
        PAN: 'ABCDE1234F',
        GST: '22AAAAA0000A1Z5',
        CIN: 'L12345MH2010PLC123456',
        DIN: '01234567',
      },
    });
  });

  test('should handle missing optional fields gracefully', () => {
    expect(
      to({
        bankAccount: '1234567890',
        ifsc: 'ABC123456',
        panCard: 'ABCDE1234F',
      }),
    ).toEqual({
      bankAccount: '1234567890',
      ifsc: 'ABC123456',
      source: 'DASHBOARD',
      kycDocuments: {
        PAN: 'ABCDE1234F',
        GST: undefined,
        CIN: undefined,
        DIN: undefined,
      },
    });
  });

  test('should handle an empty input object', () => {
    expect(to({})).toEqual({
      bankAccount: undefined,
      ifsc: undefined,
      source: 'DASHBOARD',
      kycDocuments: {
        PAN: undefined,
        GST: undefined,
        CIN: undefined,
        DIN: undefined,
      },
    });
  });
});
