// More: https://jestjs.io/docs/configuration

module.exports = {
  verbose: true,
  bail: 1,
  collectCoverageFrom: [
    'app/**/*.{js,ts,jsx,tsx}',
    '!**/app/**/Loadable.{js,ts,jsx,tsx}',
    '!**/app/**/constants.{js,ts,jsx,tsx}',
    '!**/app/*.{js,ts,jsx,tsx}',
    '!**/app/constants/**',
    '!**/app/components/CustomIcons/index.{js,ts,jsx,tsx}',
    '!**/app/components/SidebarIcons/index.{js,ts,jsx,tsx}',
    '!**/app/components/NotificationBar/*',
    '!**/app/components/NotificationPopover/*',
    '!**/app/containers/TransferDetails/components/ApproveAndWhiteList.{js,ts,jsx,tsx}',
    '!**/app/**/helpers.{js,ts,jsx,tsx}',
    '!**/app/containers/**/styled.{js,ts,jsx,tsx}',
    '!**/app/containers/**/utils.{js,ts,jsx,tsx}',
    '!**/app/containers/App/**',
    '!**/app/containers/BaseLayout/**',
    '!**/app/containers/ERP/**',
    '!**/app/redux/actions/**',
    '!**/app/pages/RiskShield/**',
    '!**/app/pages/Reports/**',
    '!**/app/utils/formValidation.{js,ts,jsx,tsx}',
    '!**/*.d.ts',
  ],
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'json-summary'],
  moduleDirectories: ['app', 'node_modules'],
  moduleNameMapper: {
    '.*\\.(css)$': '<rootDir>/webpack/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/webpack/mocks/image.js',
  },
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).js'],
};
