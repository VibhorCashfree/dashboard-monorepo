import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

// Builders
import QueryObjBuilder from '../QueryObjBuilder';

describe('QueryObjBuilder', () => {
  let builder;

  beforeEach(() => {
    builder = new QueryObjBuilder();
  });

  test('should set startDate and endDate with withDateRange', () => {
    const dateValue = {
      range: ['2023-06-01', '2023-06-30'],
    };

    builder.withDateRange(dateValue);

    expect(builder.startDate).toBe(
      moment(dateValue.range[0]).format(FORMATS['START_DATE']),
    );
    expect(builder.endDate).toBe(
      moment(dateValue.range[1]).format(FORMATS['END_DATE']),
    );
  });

  test('should set filters with withFilters', () => {
    const filters = {
      search: 'test',
      status1: true,
      status2: false,
    };

    builder.withFilters(filters, 'searchBy');

    expect(builder.searchBy).toBe('test');
    expect(builder.status).toEqual(['status1', 'status2']);
  });

  test('should set pagination with withPagination', () => {
    const limit = 10;
    const cursor = ['nextCursor', 'abc123'];

    builder.withPagination(limit, cursor);

    expect(builder.size).toBe(limit);
    expect(builder.nextCursor).toBe('abc123');
  });

  test('should set custom properties with withCustom', () => {
    const customObj = {
      customKey: 'customValue',
      anotherCustomKey: 12345,
    };

    builder.withCustom(customObj);

    expect(builder.customKey).toBe('customValue');
    expect(builder.anotherCustomKey).toBe(12345);
  });

  test('should build the final object', () => {
    const dateValue = {
      range: ['2023-06-01', '2023-06-30'],
    };

    const filters = {
      search: 'test',
      status1: true,
      status2: false,
    };

    const limit = 10;
    const cursor = ['nextCursor', 'abc123'];
    const customObj = {
      customKey: 'customValue',
    };

    const result = builder
      .withDateRange(dateValue)
      .withFilters(filters, 'searchBy')
      .withPagination(limit, cursor)
      .withCustom(customObj)
      .build();

    expect(result).toEqual({
      startDate: moment(dateValue.range[0]).format(FORMATS['START_DATE']),
      endDate: moment(dateValue.range[1]).format(FORMATS['END_DATE']),
      searchBy: 'test',
      status: ['status1', 'status2'],
      size: limit,
      nextCursor: 'abc123',
      customKey: 'customValue',
    });
  });

  test('should handle empty date range in withDateRange', () => {
    const dateValue = {};

    builder.withDateRange(dateValue);

    expect(builder.startDate).toBeUndefined();
    expect(builder.endDate).toBeUndefined();
  });

  test('should handle no search filter in withFilters', () => {
    const filters = {
      status1: true,
      status2: false,
    };

    builder.withFilters(filters, 'searchBy');

    expect(builder.searchBy).toBeUndefined();
    expect(builder.status).toEqual(['status1', 'status2']);
  });

  test('should handle no status in withFilters', () => {
    const filters = {
      search: 'test',
    };

    builder.withFilters(filters, 'searchBy', false);

    expect(builder.searchBy).toBe('test');
    expect(builder.status).toBeUndefined();
  });

  test('should handle empty cursor in withPagination', () => {
    const limit = 10;
    const cursor = [];

    builder.withPagination(limit, cursor);

    expect(builder.size).toBe(limit);
    expect(builder[cursor[0]]).toBeUndefined();
  });
});
