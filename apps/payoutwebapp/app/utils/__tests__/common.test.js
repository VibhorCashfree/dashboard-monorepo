// Utils
import {
  arrayToCsv,
  formatAmount,
  getQueryString,
  getSizeText,
  formatNumber,
  getBaseURL,
  extractFiltersFromQuery,
  arrayToObject,
  joinWithAnd,
  getCardCompany,
  digitOnlyKeys,
  getFileName,
} from '../common';

describe('Common module', () => {
  test('formatAmount()', () => {
    expect(formatAmount('123')).toBe('₹ 123.00');
    expect(formatAmount(123)).toBe('₹ 123.00');
    expect(formatAmount('1.23')).toBe('₹ 1.23');
    expect(formatAmount('0')).toBe('₹ 0.00');
    expect(formatAmount(0)).toBe('₹ 0.00');
  });

  test('getSizeText()', () => {
    expect(getSizeText('10000000')).toBe('9.5 MB');
    expect(getSizeText('10000')).toBe('9.8 KB');
    expect(getSizeText('200')).toBe('200 Bytes');
    expect(getSizeText(10)).toBe('10 Bytes');
  });

  test('getQueryString()', () => {
    expect(getQueryString({ pageLimit: 10, pageNo: 3 })).toBe(
      'pageLimit=10&pageNo=3&',
    );
    expect(getQueryString({ filters: ['A', 'B', 'C'] })).toBe(
      'filters=A&filters=B&filters=C&',
    );
    expect(getQueryString({ spacedQuery: 'Hey there!' })).not.toBe(
      'spacedQuery=Hey there!',
    );
    expect(getQueryString({ spacedQuery: 'Hey there!' })).toBe(
      'spacedQuery=Hey%20there!&',
    );
  });

  test('arrayToCsv()', () => {
    const array = [
      {
        first: 'a',
        second: 1,
        third: 'x',
      },
      {
        first: 'b',
        second: 2,
        third: 'y',
      },
      {
        first: 'c',
        second: 3,
        third: 'z',
      },
    ];

    expect(arrayToCsv(array)).toBe('first,second,third\na,1,x\nb,2,y\nc,3,z');
  });

  test('formatNumber()', () => {
    expect(formatNumber(100)).toBe(100);
    expect(formatNumber(1001)).toBe('1.0K');
    expect(formatNumber(1100000)).toBe('1.1M');
  });

  test('getBaseURL()', () => {
    expect(getBaseURL()).toBe(process.env.API_URL);
    expect(getBaseURL(true)).toBe(process.env.OLD_API_URL);
  });

  test('extractFiltersFromQuery()', () => {
    expect(extractFiltersFromQuery()).toStrictEqual({});
  });

  test('arrayToObject()', () => {
    expect(
      arrayToObject(
        [
          { name: 'John', age: 31 },
          { name: 'Barry', age: 11 },
        ],
        'age',
        'name',
      ),
    ).toStrictEqual({
      31: 'John',
      11: 'Barry',
    });
  });

  test('joinWithAnd()', () => {
    expect(joinWithAnd(['John'])).toBe('John');
    expect(joinWithAnd(['John', 'Barry'])).toBe('John and Barry');
    expect(joinWithAnd(['John', 'Barry', 'Holmes'])).toBe(
      'John, Barry and Holmes',
    );
  });

  test('getCardCompany()', () => {
    expect(getCardCompany('378282246310005')).toBe('amex');
    expect(getCardCompany('6011111111111117')).toBe('discover');
    expect(getCardCompany('5555555555554444')).toBe('master');
    expect(getCardCompany('6759649826438453')).toBe('maestro');
    expect(getCardCompany('30569309025904')).toBe('diners');
    expect(getCardCompany('3530111333300000')).toBe('jcb');
    expect(getCardCompany('6074825972083818')).toBe('rupay');
    expect(getCardCompany('4111111111111111')).toBe('visa');
    expect(getCardCompany('12345678')).toBe('');
    expect(getCardCompany('12345')).toBe('');
  });

  test('digitOnlyKeys()', () => {
    const fn1 = jest.fn();
    digitOnlyKeys({ key: 'Enter', preventDefault: fn1 });

    expect(fn1).toHaveBeenCalled();

    const fn2 = jest.fn();
    digitOnlyKeys({ key: 'ArrowUp', preventDefault: fn2 });

    expect(fn2).not.toHaveBeenCalled();
  });

  test('getFileName()', () => {
    expect(getFileName('temp.txt', 1, 'PROCESSING')).toBe(
      'temp(1)_pending.txt',
    );

    expect(getFileName('temp.txt', 1, '')).toBe('temp(1).txt');
  });
});
