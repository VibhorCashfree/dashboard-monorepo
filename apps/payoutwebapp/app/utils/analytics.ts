import Analytics from '@cashfree-intl/analytics';
import _get from 'lodash/get';

const track = (eventName: string, eventProperties: any = null) => {
  if (process.env.APP_ENV === 'qa') {
    return;
  }

  if (!_get(eventProperties, 'actionType')) {
    if (eventProperties === null) {
      eventProperties = {};
    }

    eventProperties.actionType = 'click';
  }

  Analytics.track({
    isDebug: process.env.NODE_ENV === 'development',
    eventName,
    eventProperties,
  });
};

export default {
  track,
};
