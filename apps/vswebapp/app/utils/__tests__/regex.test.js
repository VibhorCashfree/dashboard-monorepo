// Utils
import Regex from '../regex';

describe('Regex checks', () => {
  test('only public ip and no alphabets', () => {
    expect(Regex.ip('127.0.0.1')).toBe(false);
    expect(Regex.ip('a.b.c.d')).toBe(false);
    expect(Regex.ip('172.16.0.1')).toBe(false);
    expect(Regex.ip('192.168.0.0')).toBe(false);
    expect(Regex.ip('1.2.3.4')).toBe(true);
  });

  test('only alphabets and digits', () => {
    expect(Regex.alphaNumeric('johndoe')).toBe(true);
    expect(Regex.alphaNumeric('john doe')).toBe(false);
    expect(Regex.alphaNumeric('johndoe1')).toBe(true);
    expect(Regex.alphaNumeric('john$doe1')).toBe(false);
  });

  test('only alphabets and whitespaces', () => {
    expect(Regex.alphabetsWithWhitespaces('johndoe')).toBe(true);
    expect(Regex.alphabetsWithWhitespaces('john doe')).toBe(true);
    expect(Regex.alphabetsWithWhitespaces('johndoe1')).toBe(false);
  });

  test('only alphabets, digits and underscores', () => {
    expect(Regex.alphaNumericWithUnderscores('johndoe')).toBe(true);
    expect(Regex.alphaNumericWithUnderscores('john doe')).toBe(false);
    expect(Regex.alphaNumericWithUnderscores('john_doe')).toBe(true);
    expect(Regex.alphaNumericWithUnderscores('johndoe1')).toBe(true);
    expect(Regex.alphaNumericWithUnderscores('john_doe1')).toBe(true);
  });

  test('only alphabets, digits, underscores and hyphnes', () => {
    expect(Regex.alphaNumericWithUnderscoresAndHyphnes('johndoe')).toBe(true);
    expect(Regex.alphaNumericWithUnderscoresAndHyphnes('john doe')).toBe(false);
    expect(Regex.alphaNumericWithUnderscoresAndHyphnes('john_doe-')).toBe(true);
    expect(Regex.alphaNumericWithUnderscoresAndHyphnes('johndoe1')).toBe(true);
    expect(Regex.alphaNumericWithUnderscoresAndHyphnes('john_doe1--')).toBe(
      true,
    );
  });

  test('only digits', () => {
    expect(Regex.digits('johndoe')).toBe(false);
    expect(Regex.digits('john doe')).toBe(false);
    expect(Regex.digits('1244')).toBe(true);
  });

  test('valid email should have both @ and . respectively', () => {
    expect(Regex.email('john@example.com')).toBe(true);
    expect(Regex.email('example.com')).toBe(false);
    expect(Regex.email('johnexample')).toBe(false);
    expect(Regex.email('john@example')).toBe(false);
  });

  test('valid url should starts from protocol', () => {
    expect(Regex.url('google.com')).toBe(false);
    expect(Regex.url('www.google.com')).toBe(false);
    expect(Regex.url('test.google.com')).toBe(false);
    expect(Regex.url('https://google.com')).toBe(true);
  });
});
