import '@babel/polyfill';
import '@testing-library/jest-dom';
import 'jest-styled-components';

let clipboardData = '';
const localStorageMock = (function() {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true, // possibility to override
});
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(data => {
      clipboardData = data;
    }),
    readText: jest.fn(() => clipboardData),
  },
});

window.URL.createObjectURL = jest.fn();
