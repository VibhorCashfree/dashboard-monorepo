export * as Regex from './utils/regex';
export * from './utils/common';
export * as Banks from './utils/banks';

export * from './hooks';
export * from './adapters';
export * from './constants';
export * from './components';



export const sayHello = (name: string) => {
  return `Hello from shared package, ${name}!`;
};
