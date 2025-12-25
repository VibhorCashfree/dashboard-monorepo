/**
 * Asynchronously loads the component for VideoKycDetails
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(
  () => import('./index'),
  module => module.default,
);
