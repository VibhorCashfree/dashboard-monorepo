import {
  formatAmount,
  getQueryString,
  getSizeText,
  formatNumber,
  getBaseURL,
  formatFiltersFromQuery,
  arrayToObject,
  joinWithAnd,
  digitOnlyKeys,
  getFileName,
  triggerDownload,
  loginFormSubmit,
} from '../common';

describe('Common utils', () => {
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
    expect(getSizeText()).toBe('0 Byte');
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
    expect(getQueryString({ spacedQuery: '' })).toBe('');
  });

  test('formatNumber()', () => {
    expect(formatNumber(100)).toBe(100);
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(999)).toBe(999);
    expect(formatNumber(1001)).toBe('1.0K');
    expect(formatNumber(1100000)).toBe('1.1M');
  });

  test('getBaseURL()', () => {
    expect(getBaseURL()).toBe(process.env.API_URL);
  });

  test('formatFiltersFromQuery()', () => {
    expect(formatFiltersFromQuery()).toStrictEqual({});
  });

  test('arrayToObject()', () => {
    expect(
      arrayToObject(
        [{ name: 'John', age: 31 }, { name: 'Barry', age: 11 }],
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

  test('digitOnlyKeys()', () => {
    const fn1 = jest.fn();
    digitOnlyKeys({ keyCode: 11, preventDefault: fn1 });

    expect(fn1).toHaveBeenCalled();

    const fn2 = jest.fn();
    digitOnlyKeys({ keyCode: 38, preventDefault: fn2 });

    expect(fn2).toHaveBeenCalled();
  });

  test('getFileName()', () => {
    expect(getFileName('temp.txt', 1, 'PROCESSING')).toBe(
      'temp(1)_pending.txt',
    );

    expect(getFileName('temp.txt', 1, '')).toBe('temp(1).txt');
  });
});

describe('triggerDownload', () => {
  let createObjectURLMock;
  let createElementMock;
  let appendChildMock;
  let removeChildMock;
  let clickMock;
  let removeMock;

  beforeEach(() => {
    // Mock the necessary browser functions
    createObjectURLMock = jest.fn();
    createElementMock = jest.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      setAttribute: jest.fn(),
    });
    appendChildMock = jest
      .spyOn(document.body, 'appendChild')
      .mockReturnValue();
    removeChildMock = jest
      .spyOn(document.body, 'removeChild')
      .mockReturnValue();

    // Mock the window.URL.createObjectURL function
    window.URL.createObjectURL = createObjectURLMock;

    // Mock the click function
    clickMock = jest.fn();
    removeMock = jest.fn();
  });

  afterEach(() => {
    // Restore original functions after each test
    createElementMock.mockRestore();
    appendChildMock.mockRestore();
    removeChildMock.mockRestore();
    window.URL.createObjectURL.mockRestore();
  });

  test('it triggers a download with correct parameters', () => {
    const dataObj = {
      payload: 'mockPayload',
      type: 'URL',
    };
    const name = 'testFile.txt';

    // Create the link element
    const link = document.createElement('a');
    link.click = clickMock;
    link.remove = removeMock;

    triggerDownload(dataObj, name);

    // Check if window.URL.createObjectURL is called with the correct arguments
    expect(createObjectURLMock).toHaveBeenCalledWith(
      new Blob([dataObj.payload], { type: 'octet/stream' }),
    );

    // Check if document.createElement is called with the correct arguments
    expect(createElementMock).toHaveBeenCalledWith('a');

    // Check if the link attributes are set correctly
    expect(document.createElement().setAttribute).toHaveBeenCalledWith(
      'download',
      name,
    );
    expect(document.createElement().setAttribute).toHaveBeenCalledWith(
      'target',
      '_blank',
    );

    // Check if document.body.appendChild is called with the correct arguments
    expect(appendChildMock).toHaveBeenCalledWith(document.createElement());

    // Check if link.click() is called
    expect(clickMock).toHaveBeenCalled();
  });
});

describe('loginFormSubmit', () => {
  let createElementMock;
  let setAttributeMock;
  let appendChildMock;
  let submitMock;

  beforeEach(() => {
    // Mock the necessary browser functions
    createElementMock = jest.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: jest.fn(),
    });
    setAttributeMock = jest.fn();
    appendChildMock = jest
      .spyOn(document.body, 'appendChild')
      .mockReturnValue();
    submitMock = jest.fn();
  });

  afterEach(() => {
    // Restore original functions after each test
    jest.clearAllMocks();
  });

  test('it submits the login form with correct parameters', () => {
    // Mock the form creation and submit
    createElementMock.mockReturnValueOnce({
      setAttribute: setAttributeMock,
      appendChild: jest.fn(),
      submit: submitMock,
    });

    loginFormSubmit(true, 'testDashboard', {
      target: '_blank',
      iframe: 'someIframe',
    });

    // Check if document.createElement is called with the correct arguments
    expect(document.createElement).toHaveBeenCalledWith('form');
    expect(setAttributeMock).toHaveBeenCalledWith('method', 'post');
    expect(setAttributeMock).toHaveBeenCalledWith(
      'action',
      `${process.env.LEGACY_APP}/jwt-auth-v2`,
    );
    expect(setAttributeMock).toHaveBeenCalledWith('target', '_blank');

    // Check if the form is appended to the body
    expect(appendChildMock).toHaveBeenCalledWith(expect.any(Object));

    // Check if form.submit() is called
    expect(submitMock).toHaveBeenCalled();
  });
});
