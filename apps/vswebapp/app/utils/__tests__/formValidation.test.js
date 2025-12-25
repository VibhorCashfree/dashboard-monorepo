// Utils
import { formatAmount } from '../common';
import {
  requiredValidation,
  amountValidation,
  accountNumberValidation,
  ifscValidation,
  phoneNumberValidation,
  emailValidation,
  vpaValidation,
  emptyErrorMessage,
  panValidation,
  aadhaarValidation,
  gstInValidation,
} from '../formValidation';

describe('Form validation checks', () => {
  test('requiredValidation()', () => {
    expect(requiredValidation('')).toBe(emptyErrorMessage);
    expect(requiredValidation(false)).toBe(emptyErrorMessage);
    expect(requiredValidation(null)).toBe(emptyErrorMessage);
    expect(requiredValidation(0)).toBe(emptyErrorMessage);
    expect(requiredValidation(undefined)).toBe(emptyErrorMessage);
    expect(requiredValidation(100)).toBe(null);
  });

  test('amountValidation()', () => {
    expect(amountValidation('')).toBe(emptyErrorMessage);
    expect(amountValidation('sometext')).toBe('Enter valid amount.');
    expect(amountValidation('-23')).toBe(
      'Amount entered is less than 1 rupee.',
    );
    expect(amountValidation('2.28')).toBe(null);
    expect(amountValidation('100', '30')).toBe(
      `Amount should be equal to or lesser than ${formatAmount(
        30,
      )}. Write to care@cashfree.com to increase the limit.`,
    );
    expect(amountValidation('100')).toBe(null);
    expect(amountValidation('100', '300')).toBe(null);
  });

  test('accountNumberValidation()', () => {
    expect(accountNumberValidation('')).toBe(emptyErrorMessage);
    expect(accountNumberValidation('12397')).toBe(
      'Account number should include a minimum 6 characters.',
    );
    expect(
      accountNumberValidation(
        '424234234234234234234234234234234234232232323423',
      ),
    ).toBe('Account number can include a maximum of 40 characters.');
    expect(accountNumberValidation('123974 abc 5812397458')).toBe(
      'Bank account number can include numbers and alphabets only.',
    );
    expect(accountNumberValidation('123974abc5812397458')).toBe(null);
    expect(accountNumberValidation('1239745812397458')).toBe(null);
    expect(accountNumberValidation('', true)).toBe(null);
  });

  test('ifscValidation()', () => {
    expect(ifscValidation('')).toBe(emptyErrorMessage);
    expect(ifscValidation('12397458')).toBe(
      'IFSC should include 11 characters.',
    );
    expect(ifscValidation('HSBC1400002')).toBe(
      'The 5th character of IFSC should always be 0.',
    );
    expect(ifscValidation('PUNB0112000')).toBe(null);
    expect(ifscValidation('HSBC0400002')).toBe(null);
    expect(ifscValidation('', true)).toBe(null);
    expect(ifscValidation('HSBC0400%02')).toBe(
      'Special characters are not allowed in IFSC.',
    );
  });

  test('phoneNumberValidation()', () => {
    expect(phoneNumberValidation('')).toBe(emptyErrorMessage);
    expect(phoneNumberValidation('+911234567890')).toBe(
      'Phone number should include 10 digits.',
    );
    expect(phoneNumberValidation('+912345678')).toBe(
      'Only numbers are allowed.',
    );
    expect(phoneNumberValidation('1234567890')).toBe(null);
    expect(phoneNumberValidation('', true)).toBe(null);
  });

  test('emailValidation()', () => {
    expect(emailValidation('')).toBe(emptyErrorMessage);
    expect(emailValidation('john.doe@example')).toBe('Enter valid email ID.');
    expect(emailValidation('john_doe@example.com')).toBe(null);
    expect(emailValidation('johndoe@example.com')).toBe(null);
    expect(emailValidation('', true)).toBe(null);
  });

  test('vpaValidation()', () => {
    expect(vpaValidation('')).toBe(emptyErrorMessage);
    expect(vpaValidation('success')).toBe(null);
    expect(vpaValidation('john-doe@ybl')).toBe(null);
    expect(vpaValidation('jo')).toBe(
      'UPI VPA should include a minimum of 3 characters.',
    );
    expect(
      vpaValidation(
        'Hippopotomonstrosesquippedalio · Supercalifragilisticexpialidocious · Honorificabilitudinitatibus · Juxtaposition.',
      ),
    ).toBe('UPI VPA can include a maximum of 100 characters.');
    expect(vpaValidation('john-doe@ybl-com')).toBe(
      'Invalid UPI VPA. Hyphen (-) is not allowed after @ symbol.',
    );
    expect(vpaValidation('john_doe@ybl')).toBe(null);
    expect(vpaValidation('success@ybl')).toBe(null);
    expect(vpaValidation('', true)).toBe(null);
  });

  test('panValidation()', () => {
    expect(panValidation('1111111111')).toBe(null);
    expect(panValidation('123123123123')).toBe(
      'PAN should include 10 characters.',
    );
    expect(panValidation('12345adasd')).toBe(null);
    expect(panValidation('12345-adas')).toBe(
      'Special characters are not allowed in PAN.',
    );
    expect(panValidation('', true)).toBe(null);
    expect(panValidation('')).toBe('This field cannot be blank.');
  });

  test('aadhaarValidation()', () => {
    expect(aadhaarValidation('')).toBe('This field cannot be blank.');
    expect(aadhaarValidation('3443345')).toBe(
      'Aadhaar number should include 12 digits.',
    );
    expect(aadhaarValidation('1234567^&012')).toBe('Only numbers are allowed.');
    expect(aadhaarValidation('123456789012')).toBe(null);
  });

  test('gstInValidation()', () => {
    expect(gstInValidation('')).toBe('This field cannot be blank.');
    expect(gstInValidation('AGGAGAG')).toBe('Please provide a valid GSTIN.');
    expect(gstInValidation('56^&%GAG7890152')).toBe(
      'Special characters are not allowed in GSTIN.',
    );
    expect(gstInValidation('12AG34567890152')).toBe(null);
  });
});
