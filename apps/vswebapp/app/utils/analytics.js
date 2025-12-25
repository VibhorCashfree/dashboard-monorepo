import Analytics from '@cashfree-intl/analytics';

const sendEvent = (eventName, eventProperties = null) => {
  console.log(eventName, eventProperties);
};

// Analytics.track({
//   eventName,
//   eventProperties,
//   isDebug: process.env.NODE_ENV !== 'prod',
// });

export default {
  sendEvent,
  track: sendEvent,
};
