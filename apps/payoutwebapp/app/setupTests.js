// import '@babel/polyfill';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import 'jest-canvas-mock';

// Mock window.location with all needed properties
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    href: '',
    reload: jest.fn(),
  },
  writable: true,
});

let clipboardData = '';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn((data) => {
      clipboardData = data;
    }),
    readText: jest.fn(() => clipboardData),
  },
});

window.URL.createObjectURL = jest.fn();
