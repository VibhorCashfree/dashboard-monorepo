// Utils
import {
  emptyErrorMessage,
  requiredValidation,
  amountValidation,
  nameValidation,
  panNameValidation,
  accountNameValidation,
  accountNumberValidation,
  ifscValidation,
  panValidation,
  phoneNumberValidation,
  transferIdValidation,
  beneIdValidation,
  cashgramIdValidation,
  emailValidation,
  vpaValidation,
  cardNumberValidation,
  remarksValidation,
  lengthValidation,
  expiryValidation,
  cvvValidation,
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
    expect(amountValidation('sometext')).toBe('enter_valid_amount');
    expect(amountValidation('-23')).toBe('amount_entered_is_less_than_1_rupee');
    expect(amountValidation('2.28')).toBe(null);
    expect(amountValidation('100', '30')).toBe(
      'amount_should_be_equal_to_or_lesser_than_formatted_amt_write_to_care_cashfree_com_to_increase_the_limit',
    );
    expect(amountValidation('100')).toBe(null);
    expect(amountValidation('100', '300')).toBe(null);
  });

  test('nameValidation()', () => {
    expect(nameValidation('')).toBe(emptyErrorMessage);
    expect(nameValidation('', '')).toBe(emptyErrorMessage);
    expect(nameValidation('Bank name', 'john-doe')).toBe(
      'type_can_include_alphabets_and_whitespaces_only',
    );
    expect(nameValidation('Bank name', 'john doe')).toBe(null);
    expect(nameValidation('', '', true)).toBe(null);
  });

  test('accountNameValidation()', () => {
    expect(accountNameValidation('')).toBe(emptyErrorMessage);
    expect(accountNameValidation('john_doe')).toBe(
      'account_holder_name_can_include_alphabets_numbers_and_characters_and_space_only',
    );
    expect(accountNameValidation('john doe')).toBe(null);
    expect(accountNameValidation('', true)).toBe(null);
  });

  test('accountNumberValidation()', () => {
    expect(accountNumberValidation('')).toBe(emptyErrorMessage);
    expect(accountNumberValidation('12397458')).toBe(
      'account_number_should_include_a_minimum_9_characters',
    );
    expect(accountNumberValidation('123974 abc 5812397458')).toBe(
      'bank_account_number_can_include_numbers_and_alphabets_only',
    );
    expect(accountNumberValidation('123974abc5812397458')).toBe(null);
    expect(accountNumberValidation('1239745812397458')).toBe(null);
    expect(accountNumberValidation('', true)).toBe(null);
  });

  test('ifscValidation()', () => {
    expect(ifscValidation('')).toBe(emptyErrorMessage);
    expect(ifscValidation('12397458')).toBe(
      'ifsc_should_include_11_characters',
    );
    expect(ifscValidation('PUNB0112000')).toBe(null);
    expect(ifscValidation('HSBC0400002')).toBe(null);
    expect(ifscValidation('', true)).toBe(null);
  });

  test('phoneNumberValidation()', () => {
    expect(phoneNumberValidation('')).toBe(emptyErrorMessage);
    expect(phoneNumberValidation('+911234567890')).toBe(
      'phone_number_should_include_specified_digits_in_CFRN101',
    );
    expect(phoneNumberValidation('+912345678')).toBe(
      'only_numbers_are_allowed',
    );
    expect(phoneNumberValidation('1234567890')).toBe(null);
    expect(phoneNumberValidation('', true)).toBe(null);
  });

  test('emailValidation()', () => {
    expect(emailValidation('')).toBe(emptyErrorMessage);
    expect(emailValidation('john.doe@example')).toBe('enter_valid_email_id');
    expect(emailValidation('john_doe@example.com')).toBe(null);
    expect(emailValidation('johndoe@example.com')).toBe(null);
    expect(emailValidation('', true)).toBe(null);
  });

  test('vpaValidation()', () => {
    expect(vpaValidation('')).toBe(emptyErrorMessage);
    expect(vpaValidation('success')).toBe('invalid_upi_vpa');
    expect(vpaValidation('john-doe@ybl')).toBe(null);
    expect(vpaValidation('john-doe@ybl-com')).toBe('invalid_upi_vpa');
    expect(vpaValidation('john_doe@ybl')).toBe('invalid_upi_vpa');
    expect(vpaValidation('success@ybl')).toBe(null);
    expect(vpaValidation('', true)).toBe(null);
  });

  test('cardNumberValidation()', () => {
    expect(cardNumberValidation('')).toBe(emptyErrorMessage);
    expect(cardNumberValidation('1234567890')).toBe(
      'card_number_should_include_a_minimum_12_digits',
    );
    expect(cardNumberValidation('6250941006528599')).toBe(
      'invalid_card_number',
    );
    expect(cardNumberValidation('', true)).toBe(null);
  });

  test('cashgramIdValidation()', () => {
    expect(
      cashgramIdValidation('12312312312312312312312323123131232123123123'),
    ).toBe('cashgram_id_can_include_a_maximum_of_36_characters');
    expect(cashgramIdValidation('123-adasd_123')).toBe(null);
    expect(cashgramIdValidation('123-adasd*123')).toBe(
      'cashgram_id_can_include_alphabets_numbers_hyphens_and_underscores_only',
    );
    expect(cashgramIdValidation('', true)).toBe(null);
  });

  test('beneIdValidation()', () => {
    expect(
      beneIdValidation(
        '12312312312312312312312323123131232123123123123123123123231123123123',
      ),
    ).toBe('beneficiary_id_can_include_a_maximum_of_50_characters');
    expect(beneIdValidation('123_adasd_123')).toBe(null);
    expect(beneIdValidation('123-adasd_123')).toBe(
      'please_provide_a_valid_beneficiary_id',
    );
    expect(beneIdValidation('', true)).toBe(null);
  });

  test('transferIdValidation()', () => {
    expect(
      transferIdValidation(
        '1231231231231231231231232312313123212312312312312312312323112',
      ),
    ).toBe('transfer_id_can_include_a_maximum_of_40_characters');
    expect(transferIdValidation('123-adasd_123')).toBe(null);
    expect(transferIdValidation('123-adasd*123')).toBe(
      'transfer_id_can_include_alphabets_numbers_hyphens_and_underscores_only',
    );
    expect(transferIdValidation('', true)).toBe(null);
  });

  test('panValidation()', () => {
    expect(panValidation('AIMPG2221M')).toBe(null);
    expect(panValidation('123123123123')).toBe('invalid_pan_number');
    expect(panValidation('XXXXX2221X')).toBe(null);
    expect(panValidation('12345-adas')).toBe('invalid_pan_number');
    expect(panValidation('', true)).toBe(null);
  });

  test('panNameValidation()', () => {
    expect(panNameValidation('X'.repeat(200))).toBe(
      'name_can_include_a_maximum_of_100_characters',
    );
    expect(panNameValidation('john doe')).toBe(null);
    expect(panNameValidation('john-doe')).toBe(
      'pan_name_cannot_include_special_characters',
    );
    expect(panNameValidation('', true)).toBe(null);
  });

  test('remarksValidation()', () => {
    expect(remarksValidation('Remarks', 'X'.repeat(200))).toBe(
      'type_can_include_a_maximum_of_max_length_characters',
    );
    expect(remarksValidation('Remarks', '', 100, true)).toBe(null);
    expect(remarksValidation('Remarks', 'john-doe')).toBe(
      'type_cannot_include_special_characters',
    );
    expect(remarksValidation('Remarks', '', 100, true)).toBe(null);
  });

  test('lengthValidation()', () => {
    expect(lengthValidation('Beneficiary Name', 'john doe', 2)).toBe(
      'type_can_include_a_maximum_of_max_length_characters',
    );
    expect(lengthValidation('Beneficiary Name', '     ')).toBe('invalid_type');
    expect(lengthValidation('XYZ', '', 10, true)).toBe(null);
  });

  test('expiryValidation()', () => {
    expect(expiryValidation('0223')).toBe('invalid_expiry');
    expect(expiryValidation('2/23')).toBe(
      'expiry_month_should_include_2_digits',
    );
    expect(expiryValidation('02/2022')).toBe(
      'expiry_year_should_include_2_digits',
    );
    expect(expiryValidation('23/23')).toBe('invalid_expiry');
    expect(expiryValidation('', true)).toBe(null);
  });

  test('cvvValidation()', () => {
    expect(cvvValidation('1234')).toBe('cvv_should_include_3_digits');
    expect(cvvValidation('abc')).toBe('cvv_should_include_3_digits');
    expect(cvvValidation('123')).toBe(null);
    expect(cvvValidation('', true)).toBe(null);
  });
});
